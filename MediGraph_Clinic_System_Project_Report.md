# ชื่อโครงงาน: MediGraph Clinic System: NoSQL Database with Neo4j Graph Database
**รายวิชา:** Capstone Project 2: NoSQL and Advanced Database Systems  
**ผู้จัดทำ:** นัชชพล (ตามข้อมูล Git User: natchapol)  
**วันที่:** 6 พฤษภาคม 2026

---

## ขอบเขตของโครงงาน
โครงงานนี้พัฒนาระบบจัดการคลินิก (Clinic Management System) ชื่อ MediGraph Clinic System โดยใช้ฐานข้อมูล NoSQL ประเภท Graph Database คือ Neo4j เป็นแกนหลักในการจัดเก็บข้อมูล ขอบเขตการทำงานครอบคลุม:
1. **ระบบคลินิก:** จัดการข้อมูลผู้ป่วย (Patient) แพทย์ (Doctor) นัดหมาย (Appointment) ประวัติการรักษา (MedicalRecord) ใบสั่งยา (Prescription) และคลังยา (Medicine)
2. **การใช้งาน Neo4j:** ออกแบบโครงสร้างข้อมูลแบบกราฟ (Node และ Relationship) ใช้ภาษา Cypher ในการจัดการข้อมูล CRUD และรัน Neo4j บน Docker Container เพื่อความสะดวกในการจำลองสภาพแวดล้อม
3. **การพัฒนา Web Application:** พัฒนา Frontend ด้วย React.js เชื่อมต่อตรงถึง Neo4j ผ่านโปรโตคอล Bolt (พอร์ต 7687) ด้วยไลบรารี neo4j-driver รองรับการทำงานบนเว็บเบราว์เซอร์

---

## ประโยชน์ที่คาดว่าจะได้รับ
1. **จัดการข้อมูลที่มีความสัมพันธ์ซับซ้อน:** Graph Database มีข้อได้เปรียบเหนือ Relational Database ในการจัดการข้อมูลที่เชื่อมโยงกัน เช่น ความสัมพันธ์ระหว่างผู้ป่วย-นัดหมาย-แพทย์-ประวัติการรักษา สามารถ Query หาความสัมพันธ์ได้รวดเร็วโดยไม่ต้องใช้ JOIN หลายตาราง
2. **ลดความซ้ำซ้อนของข้อมูล:** การใช้ Node และ Relationship ที่ชัดเจน ลดการทำซ้ำของข้อมูล เช่น ข้อมูลแพทย์เก็บเพียงครั้งเดียวและเชื่อมโยงไปยังนัดหมายต่างๆ ผ่าน Relationship
3. **การนำ Graph DB มาใช้ในคลินิก:** เปิดประสบการณ์ใช้งานฐานข้อมูลสมัยใหม่สำหรับระบบสาธารณสุข สามารถต่อยอดไปสู่การวิเคราะห์ข้อมูลเชิงลึก เช่น ค้นหาความสัมพันธ์ระหว่างอาการและยา ด้วย Graph Traversal Algorithm

---

# บทที่ 2: ทฤษฎีและเทคโนโลยีที่เกี่ยวข้อง

## 2.1 ฐานข้อมูล NoSQL และ Neo4j
ฐานข้อมูล NoSQL (Not Only SQL) เป็นกลุ่มฐานข้อมูลที่ไม่ใช้โครงสร้างตารางแบบ Relational (Rows/Columns) แบ่งออกเป็น 4 ประเภทหลัก: Key-Value, Document, Column-Family และ Graph Database

**Neo4j** เป็นฐานข้อมูล Graph แบบ Native ที่เก็บข้อมูลในรูปแบบ:
- **Node (โหนด):** เปรียบเสมือน Entity เช่น ผู้ป่วย, แพทย์ มี Property เป็นข้อมูลคุณลักษณะ (เช่น ชื่อ, รหัส)
- **Relationship (ความสัมพันธ์):** เชื่อมโยงระหว่าง Node มีทิศทาง (Directed) และประเภท (Type) เช่น HAS_APPOINTMENT, ATTENDED_BY
- **Property:** ข้อมูลค่าคุณลักษณะที่เก็บใน Node หรือ Relationship

Neo4j ใช้ภาษา **Cypher Query Language** สำหรับจัดการข้อมูล มีโครงสร้างคำสั่งคล้าย SQL แต่ออกแบบมาเพื่อทำงานกับกราฟโดยเฉพาะ เช่น `MATCH` สำหรับค้นหาโหนด/ความสัมพันธ์, `CREATE` สำหรับสร้างข้อมูล, `SET` สำหรับอัปเดต, `DETACH DELETE` สำหรับลบข้อมูลพร้อมตัดความสัมพันธ์

## 2.2 เทคโนโลยี Containerization ด้วย Docker
**Containerization** คือเทคโนโลยีที่ห่อหุ้มแอปพลิเคชันและส่วนประกอบที่เกี่ยวข้อง (Dependencies, Runtime) ไว้ใน Container ที่สามารถรันได้ทุกสภาพแวดล้อมที่มี Docker Engine

**Docker** เป็นแพลตฟอร์มหลักสำหรับจัดการ Container มีข้อดีคือ:
- จำลองสภาพแวดล้อมได้เหมือนกันทุกเครื่อง ไม่เกิดปัญหา "รันในเครื่องฉันได้ แต่รันในเครื่องเธอไม่ได้"
- ติดตั้ง Neo4j ได้ง่ายผ่าน Official Image `neo4j:latest` ไม่ต้องติดตั้งโปรแกรมลงบน Host OS โดยตรง
- สามารถลบ/สร้าง Container ใหม่ได้รวดเร็ว เหมาะสำหรับการพัฒนาและทดสอบ

## 2.3 การพัฒนาแอปพลิเคชันด้วย React.js และไลบรารี neo4j-driver
**React.js** เป็น JavaScript Library สำหรับสร้าง User Interface แบบ Component-Based เหมาะสำหรับพัฒนา Single Page Application (SPA) ที่มีการตอบสนองรวดเร็ว

**neo4j-driver** คือไลบรารีทางการจาก Neo4j สำหรับเชื่อมต่อระหว่าง JavaScript Application กับ Neo4j Database รองรับโปรโตคอล Bolt ซึ่งเป็น Binary Protocol ที่ออกแบบมาเพื่อการสื่อสารระหว่าง Neo4j กับ Client อย่างมีประสิทธิภาพ

## 2.4 สถาปัตยกรรมแอปพลิเคชัน (Frontend & Bolt Protocol)
ระบบมีสถาปัตยกรรม 3 ชั้นหลัก:
1. **Presentation Layer (React.js):** จัดการส่วนติดต่อผู้ใช้ (UI) รับข้อมูลจากผู้ใช้และแสดงผลลัพธ์
2. **Data Access Layer (neo4j-driver):** สร้าง Session เชื่อมต่อไปยัง Neo4j ผ่านพอร์ต 7687 (Bolt Protocol) ส่งคำสั่ง Cypher และรับผลลัพธ์กลับมา
3. **Database Layer (Neo4j Container):** เก็บข้อมูลกราฟ รันอยู่บน Docker Container พอร์ต 7474 (Neo4j Browser) และ 7687 (Bolt)

*หมายเหตุ: โปรเจกต์นี้ไม่ใช้ Backend Middleware (เช่น Node.js/Express) โดย Frontend เชื่อมต่อ Neo4j ตรงผ่าน neo4j-driver ซึ่งเหมาะสำหรับต้นแบบ แต่ในการใช้งานจริงควรมี Backend เพื่อความปลอดภัย*

---

# บทที่ 3: วิธีการดำเนินงานและการออกแบบระบบ

## 3.1 การออกแบบสถาปัตยกรรมแอปพลิเคชัน (Application Architecture)
```
[React Frontend] ←→ [neo4j-driver] ←─Bolt Protocol (7687)─→ [Neo4j Container on Docker]
```
- Frontend ส่งคำขอ (Request) พร้อมคำสั่ง Cypher ผ่าน neo4j-driver
- Neo4j ประมวลผลคำสั่งและส่งผลลัพธ์กลับมาเป็น JSON
- Frontend นำผลลัพธ์ไปแสดงบน UI หรือจัดการสถานะ (State) ด้วย React Hooks (useState, useEffect)

## 3.2 การตั้งค่าและการติดตั้ง Docker (Docker Implementation)

### 3.2.1 การติดตั้งโปรแกรม Docker Desktop
1. ดาวน์โหลด Docker Desktop จาก https://www.docker.com/products/docker-desktop
2. ติดตั้งตามขั้นตอนสำหรับ Windows 11 เปิดโปรแกรมหลังติดตั้งเสร็จ
3. ตรวจสอบการติดตั้งด้วยคำสั่งใน Terminal: `docker --version`

### 3.2.2 คำสั่งการรัน Neo4j Container
ใช้คำสั่งต่อไปนี้ใน Terminal:
```bash
docker run -d `
  -p 7474:7474 `
  -p 7687:7687 `
  -e NEO4J_AUTH=neo4j/clinic123 `
  --name medigraph-neo4j `
  neo4j:latest
```
**คำอธิบาย flags:**
- `-d`: รัน Container ในโหมด Detached (ทำงานเบื้องหลัง)
- `-p 7474:7474`: แมปพอร์ต 7474 ของ Host ไปยัง Container สำหรับเข้า Neo4j Browser
- `-p 7687:7687`: แมปพอร์ต 7687 สำหรับ Bolt Protocol
- `-e NEO4J_AUTH=neo4j/clinic123`: ตั้งค่ารหัสผ่านเริ่มต้น (Username: neo4j, Password: clinic123)
- `--name medigraph-neo4j`: ตั้งชื่อ Container เพื่อให้เรียกใช้งานง่าย
- `neo4j:latest`: ดึง Neo4j Image เวอร์ชันล่าสุดจาก Docker Hub

### 3.2.3 การตรวจสอบการทำงานและรหัสผ่าน
1. ตรวจสอบสถานะ Container: `docker ps` จะเห็น Container ชื่อ `medigraph-neo4j` กำลังทำงาน
2. เปิดเว็บเบราว์เซอร์ไปที่ `http://localhost:7474` จะเข้าสู่หน้า Neo4j Browser
3. ใส่ข้อมูลเข้าสู่ระบบ: Username `neo4j`, Password `clinic123` จากนั้นเปลี่ยนรหัสผ่านหากระบบต้องการ (ในโปรเจกต์นี้ใช้รหัสเดิม)

## 3.3 รายละเอียด Use-Case ของแอปพลิเคชัน
ระบบรองรับ Use-Case หลัก 6 กลุ่ม:
1. **Patient Management:** เพิ่ม/แก้ไข/ลบข้อมูลผู้ป่วย ค้นหาประวัติการรักษาย้อนหลัง
2. **Appointment Scheduling:** จองนัดหมายระหว่างผู้ป่วยกับแพทย์ เปลี่ยนสถานะนัดหมาย (Scheduled/Completed/Cancelled)
3. **Doctor Management:** จัดการข้อมูลแพทย์ แผนกความเชี่ยวชาญ ตารางเวร
4. **Medical Record Management:** บันทึกประวัติการรักษา วินิจฉัย โรค หลังการนัดหมายเสร็จสิ้น
5. **Prescription Management:** สร้างใบสั่งยาเลื่อมโยงกับประวัติการรักษา ระบุขนาดยาและคำแนะนำ
6. **Medicine Inventory:** จัดการคลังยา เพิ่ม/ลดสต็อก ตรวจสอบยาที่ใกล้หมด

## 3.4 การออกแบบโครงสร้างฐานข้อมูล NoSQL (Graph Data Model)
ออกแบบโครงสร้างด้วย 6 Node Labels (โหนด) และ Relationship (ความสัมพันธ์) ดังนี้:

| Node Label | Properties (ตัวอย่าง) | คำอธิบาย |
|------------|------------------------|-----------|
| Patient | patientId, name, dob (date of birth), phone, email | ข้อมูลผู้ป่วย |
| Doctor | doctorId, name, specialty, phone | ข้อมูลแพทย์ |
| Appointment | appointmentId, date, time, status, notes | ข้อมูลนัดหมาย |
| MedicalRecord | recordId, date, diagnosis, treatment | ประวัติการรักษา |
| Prescription | prescriptionId, date, dosage, instructions | ใบสั่งยา |
| Medicine | medicineId, name, stock, price | ข้อมูลยาในคลัง |

**Relationships (ความสัมพันธ์):**
- `(Patient)-[:HAS_APPOINTMENT]->(Appointment)`: ผู้ป่วยมีนัดหมายหลายครั้ง
- `(Appointment)-[:ATTENDED_BY]->(Doctor)`: นัดหมายหนึ่งครั้งมีแพทย์หนึ่งคนรักษา
- `(Appointment)-[:HAS_MEDICAL_RECORD]->(MedicalRecord)`: นัดหมายหนึ่งครั้งมีประวัติการรักษาหนึ่งรายการ
- `(MedicalRecord)-[:PRESCRIBED]->(Prescription)`: ประวัติการรักษามีใบสั่งยา
- `(Prescription)-[:CONTAINS_MEDICINE]->(Medicine)`: ใบสั่งยาประกอบด้วยยาหลายรายการ
- `(Doctor)-[:TREATS]->(Patient)`: แพทย์รักษาผู้ป่วย (ทางเลือกเพิ่มเติม)

## 3.5 การออกแบบคำสั่ง CRUD (CRUD Operations Design ในภาษา Cypher)
### Create (เพิ่มข้อมูล)
```cypher
// สร้าง Patient ใหม่
CREATE (p:Patient {
  patientId: 'P001',
  name: 'สมชาย ใจดี',
  dob: '1990-05-15',
  phone: '0812345678',
  email: 'somchai@example.com'
})
RETURN p
```

### Read (อ่านข้อมูล)
```cypher
// ค้นหาผู้ป่วยรายหนึ่ง
MATCH (p:Patient {patientId: 'P001'})
RETURN p.name, p.phone
```

### Update (แก้ไขข้อมูล)
```cypher
// แก้ไขเบอร์โทรศัพท์ผู้ป่วย
MATCH (p:Patient {patientId: 'P001'})
SET p.phone = '0898765432'
RETURN p
```

### Delete (ลบข้อมูล)
```cypher
// ลบผู้ป่วยและความสัมพันธ์ทั้งหมด (DETACH DELETE ตัดความสัมพันธ์ก่อนลบโหนด)
MATCH (p:Patient {patientId: 'P001'})
DETACH DELETE p
```

## 3.6 คำอธิบายการทำงานของแอปพลิเคชัน
1. **การดึงข้อมูล:** หน้า Dashboard แสดงจำนวนผู้ป่วย นัดหมายวันนี้ และยาที่สต็อกต่ำ โดย Query ข้อมูลจาก Neo4j ผ่าน `MATCH` หน้าประวัติผู้ป่วยแสดงนัดหมายทั้งหมดที่เชื่อมโยงกับ Patient ผ่าน Relationship `HAS_APPOINTMENT`
2. **การจองนัดหมาย:** ผู้ใช้เลือกผู้ป่วยจาก Dropdown เลือกแพทย์ วันที่และเวลา ระบบจะสร้าง Node `Appointment` ใหม่ แล้วสร้าง Relationship `HAS_APPOINTMENT` จาก Patient ไปยัง Appointment และ `ATTENDED_BY` จาก Appointment ไปยัง Doctor
3. **การจัดการข้อมูล:** ฟอร์มแก้ไขจะดึงข้อมูลเดิมมาแสดงด้วย `MATCH` แล้วอัปเดตด้วย `SET` สำหรับลบข้อมูล ระบบจะแจ้งเตือนก่อนลบ แล้วใช้ `DETACH DELETE` เพื่อลบโหนดและตัดความสัมพันธ์ทั้งหมดป้องกันการเกิดโหนดกำมะลอ (Orphaned Nodes)

---

# บทที่ 4: ผลการดำเนินงานและการทดสอบ

## 4.1 ภาพรวมของแอปพลิเคชัน (Application Overview)
แอปพลิเคชันมีหน้าหลัก 5 หน้า:
- **Dashboard:** แสดงสรุปข้อมูลคลินิก จำนวนผู้ป่วย แพทย์ นัดหมายวันนี้
- **Patient List:** แสดงรายชื่อผู้ป่วยทั้งหมด พร้อมปุ่มแก้ไข/ลบ
- **Appointment Booking:** ฟอร์มจองนัดหมาย เลือกผู้ป่วยและแพทย์
- **Doctor Directory:** รายชื่อแพทย์ตามแผนกความเชี่ยวชาญ
- **Medicine Inventory:** จัดการคลังยา เพิ่ม/ลดสต็อก

ตัวอย่างการทดสอบแสดงผลบน Neo4j Browser ยืนยันว่าข้อมูลถูกสร้างและเชื่อมโยงถูกต้อง

## 4.2 การเพิ่มข้อมูล (Create)
### การเพิ่มผู้ป่วยใหม่ (Patient Creation)
ทดสอบเพิ่มผู้ป่วยใหม่ด้วยคำสั่ง Cypher Create ระบบบันทึกข้อมูลลง Neo4j สามารถค้นหาด้วย `MATCH (p:Patient) RETURN p` แล้วเห็น Node ใหม่ปรากฏในกราฟ

### การจองคิวนัดหมาย (Appointment Scheduling)
เลือกผู้ป่วย "สมชาย ใจดี" และแพทย์ "นพ. สมศรี รักษาดี" วันที่ 2026-05-10 เวลา 09:00 ระบบสร้าง Appointment Node และเชื่อม Relationship ครบถ้วน ตรวจสอบด้วยคำสั่ง:
```cypher
MATCH (p:Patient)-[:HAS_APPOINTMENT]->(a:Appointment)-[:ATTENDED_BY]->(d:Doctor)
WHERE p.patientId = 'P001'
RETURN p.name, a.date, d.name
```

## 4.3 การแก้ไขข้อมูล (Update)
### การแก้ไขรายละเอียดผู้ป่วยและสถานะการนัดหมาย
แก้ไขเบอร์โทรศัพท์ผู้ป่วยด้วย `SET p.phone = 'ใหม่'` ผลลัพธ์แสดงข้อมูลที่อัปเดตแล้ว  
เปลี่ยนสถานะนัดหมายจาก "Scheduled" เป็น "Completed" ด้วยคำสั่ง:
```cypher
MATCH (a:Appointment {appointmentId: 'A001'})
SET a.status = 'Completed'
RETURN a
```

## 4.4 การลบข้อมูล (Delete)
### การยกเลิกนัดหมายและการลบข้อมูล
ลบนัดหมายที่รหัส A001 ด้วยคำสั่ง `MATCH (a:Appointment {appointmentId: 'A001'}) DETACH DELETE a` ระบบจะลบ Appointment Node และตัด Relationship `HAS_APPOINTMENT` และ `ATTENDED_BY` อัตโนมัติ ไม่ทิ้งโหนดแพทย์หรือผู้ป่วยไว้ลอยๆ  
การลบผู้ป่วยจะลบนัดหมายทั้งหมดที่เกี่ยวข้องด้วย เพราะ DETACH DELETE ตัดความสัมพันธ์ทั้งหมดก่อนลบโหนด

---

# บทที่ 5: สรุปผลและข้อเสนอแนะ

## 5.1 สรุปผลการดำเนินงาน
### ด้านฐานข้อมูล
โครงงานสามารถนำ Neo4j Graph Database มาใช้งานได้สำเร็จ ออกแบบโครงสร้างกราฟที่สะท้อนความสัมพันธ์ของข้อมูลคลินิกได้ชัดเจน ใช้ภาษา Cypher จัดการ CRUD ได้ครบถ้วน การรันบน Docker ช่วยให้ติดตั้งและจัดการสภาพแวดล้อมได้ง่ายและสอดคล้องกันทุกเครื่อง

### ด้านแอปพลิเคชัน
พัฒนา React Web Application ที่เชื่อมต่อ Neo4j ผ่าน Bolt Protocol ด้วย neo4j-driver สำเร็จ ระบบรองรับการทำงานตาม Use-Case ทั้งหมดที่กำหนดไว้ สามารถเพิ่ม แก้ไข ลบ และค้นหาข้อมูลได้ถูกต้อง

## 5.2 ข้อจำกัดของระบบ
1. เป็นระบบต้นแบบ (Prototype) ยังไม่มีการรองรับการยืนยันตัวตน (Authentication) และการกำหนดสิทธิ์ผู้ใช้ (Authorization) ที่ซับซ้อน
2. ยังไม่มีการตรวจสอบความถูกต้องของข้อมูล (Validation) เช่น ห้ามจองนัดหมายในอดีต หรือเบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก
3. Frontend เชื่อมต่อ Neo4j ตรง ทำให้รหัสผ่านฐานข้อมูลต้องอยู่ในฝั่ง Client ซึ่งไม่ปลอดภัยสำหรับการใช้งานจริง
4. ไม่รองรับการทำงานพร้อมกันหลายผู้ใช้ (Concurrency Control) และการสำรองข้อมูลอัตโนมัติ

## 5.3 ข้อเสนอแนะเพื่อการพัฒนาต่อยอด
1. **ระบบ Real-time Updates:** เพิ่มการแจ้งเตือนคิวแพทย์แบบเรียลไทม์ด้วย WebSocket หรือ GraphQL Subscriptions เมื่อมีการจองนัดหมายใหม่
2. **การวิเคราะห์ข้อมูลด้วย Graph Traversal:** ใช้ความสามารถของ Graph Database วิเคราะห์ความสัมพันธ์ระหว่างอาการและยา ค้นหาโรคที่พบบ่อยในช่วงเวลาหนึ่ง หรือค้นหาผู้ป่วยที่แพ้ยาชนิดเดียวกัน
3. **ความปลอดภัยขั้นสูง:** เพิ่ม Backend Layer (เช่น Node.js + Express) เพื่อซ่อนข้อมูลลับ รองรับ JWT Authentication และ Role-Based Access Control (RBAC) แยกสิทธิ์แพทย์ พนักงานต้อนรับ และผู้ดูแลระบบ
4. **การสำรองข้อมูล:** ตั้งค่า Neo4j Backup อัตโนมัติไปยัง Cloud Storage (เช่น AWS S3) เพื่อป้องกันการสูญหายของข้อมูล
5. **Mobile Application:** พัฒนาแอปบนมือถือสำหรับผู้ป่วยจองนัดหมายและตรวจสอบประวัติการรักษาได้เอง

---

**เอกสารอ้างอิง**
1. Neo4j Official Documentation. (2026). Cypher Query Language. https://neo4j.com/docs/cypher-manual/
2. Docker Inc. (2026). Docker Desktop Documentation. https://docs.docker.com/desktop/
3. React Official Documentation. (2026). Getting Started. https://react.dev/
4. Neo4j Driver for JavaScript. (2026). neo4j-driver Documentation. https://neo4j.com/docs/javascript-manual/
