# รายงานโครงงาน Capstone Project 2: NoSQL and Advanced Database Systems

## หัวข้อโครงงาน: MediGraph Clinic System (Neo4j)

---

## 1. บทนำและเหตุผลที่เลือกใช้ Neo4j

### 1.1 ความเป็นมา
ในปัจจุบันคลินิกและสถานพยาบาลมีความต้องการจัดการข้อมูลที่มีความเชื่อมโยงซับซ้อนระหว่างผู้ป่วย แพทย์ นัดหมาย บันทึกการรักษา และยา เป็นอย่างมาก ฐานข้อมูลเชิงสัมพันธ์ (Relational Database) แม้จะใช้กันอย่างแพร่หลาย แต่เมื่อต้องการวิเคราะห์ความสัมพันธ์ที่เชื่อมโยงกันหลายระดับ (Multi-hop Relationships) จะพบปัญหาเรื่องประสิทธิภาพเนื่องจากการ JOIN ตารางจำนวนมาก

### 1.2 เหตุผลที่เลือกใช้ Neo4j
Neo4j คือฐานข้อมูลแบบกราฟ (Graph Database) ที่ออกแบบมาเพื่อจัดการกับข้อมูลที่มีความเชื่อมโยงสูง โดยมีข้อได้เปรียบดังนี้:

- **โครงสร้างแบบธรรมชาติ**: ข้อมูลในคลินิกมีความสัมพันธ์เชิงกราฟอยู่แล้ว (ผู้ป่วย → นัดหมาย → แพทย์ → บันทึกการรักษา) Neo4j จัดเก็บข้อมูลในรูปแบบ Node (จุด) และ Relationship (เส้นเชื่อม) ซึ่งสะท้อนความเป็นจริงได้ดีกว่า
- **ภาษา Cypher**: เป็นภาษาสำหรับสืบค้นข้อมูลที่อ่านง่ายและมีประสิทธิภาพสูง สามารถ traverse ความสัมพันธ์ได้รวดเร็วไม่ว่าจะมีข้อมูลปริมาณมากเพียงใด
- **ประสิทธิภาพในการวิเคราะห์ความสัมพันธ์**: การค้นหาว่า "ผู้ป่วยคนนี้เคยพบแพทย์คนใดบ้าง" หรือ "ยาตัวนี้ถูกสั่งให้ผู้ป่วยที่แพ้ยาอะไร" สามารถทำได้ในเวลา O(1) ต่อความสัมพันธ์ ไม่ต้อง scan ตารางทั้งหมด
- **รองรับการเปลี่ยนแปลงโครงสร้างได้ง่าย**: สามารถเพิ่มประเภทข้อมูลใหม่หรือความสัมพันธ์ใหม่ได้โดยไม่กระทบต่อข้อมูลเดิม

---

## 2. วิธีการติดตั้งบน Docker

การติดตั้ง Neo4j ผ่าน Docker เป็นวิธีที่แนะนำเนื่องจากไม่ต้องติดตั้งซอฟต์แวร์ลงบนเครื่องโดยตรง และสามารถจัดการเวอร์ชันได้ง่าย

### 2.1 ขั้นตอนการติดตั้ง

**ขั้นที่ 1: ดึง Neo4j Image**
```bash
docker pull neo4j:latest
```

**ขั้นที่ 2: รัน Neo4j Container**
```bash
docker run -d \
  --name neo4j-clinic \
  -p 7474:7474 \
  -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/clinic123 \
  neo4j:latest
```

**คำอธิบายพารามิเตอร์:**
- `-d`: รันในโหมดแยกกระบวนการ (detached mode)
- `--name neo4j-clinic`: ตั้งชื่อ container
- `-p 7474:7474`: แมปพอร์ตสำหรับ Neo4j Browser (Web Interface)
- `-p 7687:7687`: แมปพอร์ตสำหรับ Bolt Protocol (การเชื่อมต่อจากแอปพลิเคชัน)
- `-e NEO4J_AUTH=neo4j/clinic123`: ตั้งค่าผู้ใช้และรหัสผ่าน

**ขั้นที่ 3: ตรวจสอบสถานะ**
```bash
docker ps -f name=neo4j-clinic
```

**ขั้นที่ 4: เข้าใช้งาน Neo4j Browser**
เปิดเว็บเบราว์เซอร์แล้วไปที่: `http://localhost:7474`
- Username: `neo4j`
- Password: `clinic123`

---

## 3. โครงสร้างฐานข้อมูลแบบกราฟ

MediGraph Clinic System ใช้โครงสร้างกราฟที่ประกอบด้วย 6 Node Labels และ 6 Relationship Types ดังนี้:

### 3.1 Node Labels (6 ประเภท)

| ลำดับ | Node Label | คำอธิบาย | คุณสมบัติหลัก |
|-------|-----------|------------|---------------|
| 1 | **Patient** | ข้อมูลผู้ป่วย | patientId, firstName, lastName, dob, phone, allergic |
| 2 | **Doctor** | ข้อมูลแพทย์ | doctorId, firstName, lastName, specialty, phone |
| 3 | **Appointment** | ข้อมูลการนัดหมาย | appointmentId, appntDate, appntTime, status |
| 4 | **MedicalRecord** | บันทึกการรักษา | recordId, visitDate, diagnosis, treatment |
| 5 | **Medicine** | ข้อมูลยา | medicineId, medName, description, price, stockQty |
| 6 | **Symptom** | อาการของผู้ป่วย | symptomId, symptomName, severity |

### 3.2 Relationship Types (6 ประเภท)

| ลำดับ | Relationship Type | การเชื่อมโยง | คำอธิบาย |
|-------|-------------------|--------------|------------|
| 1 | **HAS_APPOINTMENT** | Patient → Appointment | ผู้ป่วยมีการนัดหมาย |
| 2 | **ATTENDED_BY** | Appointment → Doctor | นัดหมายที่แพทย์คนนั้นเป็นผู้รักษา |
| 3 | **HAS_RECORD** | Patient → MedicalRecord | ผู้ป่วยมีบันทึกการรักษา |
| 4 | **DIAGNOSED_IN** | Doctor → MedicalRecord | แพทย์เป็นผู้วินิจฉัยในบันทึก |
| 5 | **PRESCRIBED** | MedicalRecord → Medicine | สั่งยาในบันทึกการรักษา |
| 6 | **HAS_SYMPTOM** | Patient → Symptom | ผู้ป่วยมีอาการ |

### 3.3 แผนภาพโครงสร้างกราฟ

```
(Patient) --[HAS_APPOINTMENT]--> (Appointment) --[ATTENDED_BY]--> (Doctor)
   |                                              |
   |--[HAS_RECORD]--> (MedicalRecord)             |
                           |                      |
                           |--[PRESCRIBED]--> (Medicine)
                           |
                           ^--[DIAGNOSED_IN]-- (Doctor)
```

---

## 4. การใช้งาน CRUD Operations ด้วยภาษา Cypher

### 4.1 CREATE (การสร้างข้อมูลใหม่)

**สร้างผู้ป่วยใหม่:**
```cypher
CREATE (p:Patient {
  patientId: 4,
  firstName: 'Malee',
  lastName: 'Wongchai',
  dob: date('1998-06-15'),
  phone: '0856789012',
  allergic: 'None'
})
RETURN p
```

**สร้างนัดหมายพร้อมเชื่อมโยงกับผู้ป่วยและแพทย์:**
```cypher
MATCH (p:Patient {patientId: 1})
MATCH (d:Doctor {doctorId: 2})
CREATE (p)-[:HAS_APPOINTMENT]->(a:Appointment {
  appointmentId: 4,
  appntDate: date('2025-04-25'),
  appntTime: time('10:30'),
  status: 'Scheduled'
})-[:ATTENDED_BY]->(d)
RETURN a
```

### 4.2 READ (การอ่านข้อมูล)

**อ่านข้อมูลผู้ป่วยทั้งหมด:**
```cypher
MATCH (p:Patient)
RETURN p.patientId, p.firstName, p.lastName,
       p.dob, p.phone, p.allergic
ORDER BY p.lastName
```

**ค้นหานัดหมายของผู้ป่วยรายบุคคลพร้อมข้อมูลแพทย์:**
```cypher
MATCH (p:Patient {patientId: 1})-[:HAS_APPOINTMENT]->(a:Appointment)-[:ATTENDED_BY]->(d:Doctor)
RETURN p.firstName, a.appntDate, a.appntTime, a.status,
       d.firstName + ' ' + d.lastName AS doctor
```

### 4.3 UPDATE (การแก้ไขข้อมูล)

**แก้ไขเบอร์โทรศัพท์ของผู้ป่วย:**
```cypher
MATCH (p:Patient {patientId: 1})
SET p.phone = '0899991111'
RETURN p.firstName, p.phone
```

**แก้ไขสถานะนัดหมาย:**
```cypher
MATCH (a:Appointment {appointmentId: 3})
SET a.status = 'Completed'
RETURN a
```

### 4.4 DELETE และ DETACH DELETE (การลบข้อมูล)

**ความแตกต่างระหว่าง DELETE และ DETACH DELETE:**

- **DELETE**: ลบเฉพาะ Node หรือ Relationship ที่ระบุ จะเกิด Error หาก Node นั้นยังมี Relationship เชื่อมอยู่
- **DETACH DELETE**: ลบ Node พร้อมกับตัด Relationship ทั้งหมดที่เชื่อมอยู่กับ Node นั้น (ทำความสะอาดให้เสร็จสิ้น)

**ตัวอย่างการใช้ DETACH DELETE (ลบผู้ป่วยและข้อมูลที่เกี่ยวข้อง):**
```cypher
MATCH (p:Patient {patientId: 4})
DETACH DELETE p
```
*คำสั่งนี้จะลบ Patient Node และ Relationship ทั้งหมดที่เชื่อมกับผู้ป่วยคนนี้ (เช่น HAS_APPOINTMENT, HAS_RECORD) แต่จะไม่ลบ Appointment หรือ MedicalRecord ที่แยกออกได้ (เนื่องจากอาจเชื่อมกับ Doctor อยู่)*

**ลบเฉพาะ Appointment ที่ถูกยกเลิก:**
```cypher
MATCH (a:Appointment {status: 'Cancelled'})
DETACH DELETE a
```

---

## 5. สถาปัตยกรรมแอปพลิเคชันและ Use-Case

### 5.1 สถาปัตยกรรมระบบ (3-Tier Architecture)

```
┌─────────────────────────────────────────────────────┐
│              Frontend (React.js)                     │
│  - Sidebar Navigation                              │
│  - Patient/Doctor Management                       │
│  - Appointment Booking                             │
│  - Medical Records Viewer                          │
│  - Medicine Inventory                              │
│  - Cypher Query Explorer                           │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP / REST API
┌──────────────────────▼──────────────────────────────┐
│            Backend API Layer (Node.js)               │
│  - Express.js Routes                               │
│  - Neo4j Driver (Bolt Protocol)                    │
│  - Query Builder & Business Logic                   │
└──────────────────────┬──────────────────────────────┘
                       │ Bolt Protocol (bolt://)
┌──────────────────────▼──────────────────────────────┐
│          Neo4j Database (Docker Container)           │
│  - Node: Patient, Doctor, Appointment...            │
│  - Relationship: HAS_APPOINTMENT, ATTENDED_BY...   │
│  - Indexes & Constraints                            │
└─────────────────────────────────────────────────────┘
```

### 5.2 Use-Case หลักของระบบ

| Use-Case | ผู้ใช้ | คำอธิบาย |
|----------|--------|------------|
| จัดการข้อมูลผู้ป่วย | เจ้าหน้าที่ | เพิ่ม แก้ไข ลบ ข้อมูลผู้ป่วย พร้อมแสดง Cypher Query |
| ดูไดเรกทอรีแพทย์ | เจ้าหน้าที่ | ค้นหาและดูข้อมูลแพทย์ตามความเชี่ยวชาญ |
| จองนัดหมาย | เจ้าหน้าที่ | สร้างนัดหมายเชื่อมโยงผู้ป่วยกับแพทย์ |
| บันทึกการรักษา | แพทย์ | บันทึกการวินิจฉัยและการรักษา |
| จัดการคลังยา | เภสัชกร | เพิ่มและอัปเดตข้อมูลยาในคลัง |
| สำรวจ Cypher Query | นักพัฒนา | ทดลองรันคำสั่ง Cypher ต่างๆ ผ่าน Web Interface |

---

## 6. บทสรุปความสำเร็จของโปรเจกต์

### 6.1 ผลลัพธ์ที่ได้รับ
โครงการ MediGraph Clinic System สำเร็จลุล่วงตามวัตถุประสงค์ที่ตั้งไว้ โดยสามารถพัฒนาระบบจัดการคลินิกที่ใช้ Neo4j เป็นฐานข้อมูลหลักได้สำเร็จ มีฟังก์ชันการทำงานครบถ้วนทั้ง:

1. **การจัดการข้อมูลผู้ป่วย** - สามารถเพิ่ม แก้ไข ลบข้อมูลผู้ป่วยได้อย่างมีประสิทธิภาพ
2. **การจัดการนัดหมาย** - ระบบจองนัดที่เชื่อมโยงผู้ป่วยและแพทย์ในกราฟเดียวกัน
3. **บันทึกการรักษา** - จัดเก็บประวัติการรักษาพร้อมความสัมพันธ์กับผู้ป่วยและแพทย์
4. **คลังยา** - จัดการข้อมูลยาและสต็อก
5. **Cypher Explorer** - เครื่องมือสำหรับเรียนรู้และทดลองคำสั่ง Cypher

### 6.2 ความรู้ที่ได้รับ
- เข้าใจโครงสร้างและการทำงานของ Graph Database (Neo4j)
- สามารถออกแบบ Node และ Relationship ให้สะท้อนความสัมพันธ์ในโลกความจริง
- ใช้งานภาษา Cypher ในการ CRUD ได้อย่างคล่องแคล่ว
- เข้าใจความแตกต่างและการประยุกต์ใช้ DETACH DELETE
- สามารถพัฒนา Web Application (React.js) ที่เชื่อมต่อกับ Neo4j ได้

### 6.3 ข้อเสนอแนะสำหรับการพัฒนาต่อ
- เพิ่มระบบ Authentication และ Authorization สำหรับผู้ใช้แต่ละบทบาท
- เพิ่มการแสดงผลกราฟแบบ Visual Graph Visualization
- เพิ่มระบบค้นหาขั้นสูงด้วย Full-Text Search
- รองรับการ Export ข้อมูลเป็น PDF และ Excel
- เพิ่มระบบแจ้งเตือนนัดหมายผ่าน Email หรือ SMS

---

## บรรณานุกรม
- Neo4j Documentation. (2025). *The Neo4j Cypher Manual*. สืบค้นจาก https://neo4j.com/docs/cypher-manual/
- Webber, J. (2012). *A Programmer's Introduction to Neo4j*. Neo4j, Inc.
- Robinson, I., Webber, J., & Eifrem, E. (2015). *Graph Databases* (2nd ed.). O'Reilly Media.
