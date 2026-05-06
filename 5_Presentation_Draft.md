# MediGraph Clinic System - Presentation Slides (9 หน้า)

สร้างสไลด์นำเสนอตามโครงสร้างต่อไปนี้ใน Microsoft PowerPoint

---

## Slide 1: Project Overview

**หัวข้อ:** MediGraph Clinic System: จัดการคลินิกด้วย Neo4j Graph Database

**เนื้อหา (Bullet Points):**
- โครงงาน Capstone Project 2: NoSQL and Advanced Database Systems
- ระบบจัดการคลินิกที่ใช้ Neo4j เป็นฐานข้อมูลแบบกราฟ
- พัฒนาโดยใช้เทคโนโลยี: React.js + Neo4j + Docker
- วัตถุประสงค์: แก้ปัญหาการจัดการข้อมูลที่มีความเชื่อมโยงซับซ้อนในคลินิก
- เป้าหมาย: แสดงความเข้าใจในการออกแบบและใช้งาน Graph Database

**ภาพประกอบ:**
- [ ] โลโก้โปรเจกต์ (MediGraph)
- [ ] ภาพหน้าจอ Dashboard ของแอป

---

## Slide 2: Why Neo4j?

**หัวข้อ:** เหตุผลที่เลือกใช้ Neo4j Graph Database

**เนื้อหา (Bullet Points):**
- **ข้อมูลคลินิกเป็นกราฟโดยธรรมชาติ**: ผู้ป่วย → นัดหมาย → แพทย์ → บันทึกการรักษา
- **ประสิทธิภาพสูงในการทราฟเวอร์สความสัมพันธ์**: Multi-hop relationships ในเวลา O(1) ต่อ edge
- **ภาษา Cypher**: อ่านง่าย เขียนง่าย `MATCH (p:Patient)-[:HAS_APPOINTMENT]->(a) RETURN p`
- **ยืดหยุ่นต่อการเปลี่ยนแปลง**: เพิ่ม Node หรือ Relationship ใหม่โดยไม่กระทบข้อมูลเดิม
- **เหมาะกับข้อมูลที่มีความเชื่อมโยงสูง**: Social networks, Recommendation systems, Clinic management

**ภาพประกอบ:**
- [ ] เปรียบเทียบ Relational DB vs Graph DB
- [ ] ภาพจริงของ Neo4j Graph Visualization

---

## Slide 3: Docker Installation

**หัวข้อ:** การติดตั้ง Neo4j ด้วย Docker

**เนื้อหา (Bullet Points):**
- **ขั้นตอนที่ 1**: ดึง Neo4j Image
  ```bash
  docker pull neo4j:latest
  ```
- **ขั้นตอนที่ 2**: รัน Container
  ```bash
  docker run -d --name neo4j-clinic \
    -p 7474:7474 -p 7687:7687 \
    -e NEO4J_AUTH=neo4j/clinic123 \
    neo4j:latest
  ```
- **การเข้าใช้งาน**:
  - Neo4j Browser: http://localhost:7474
  - Bolt Protocol: bolt://localhost:7687
  - Username: neo4j / Password: clinic123

**ภาพประกอบ:**
- [ ] Screenshot: คำสั่ง docker pull และ docker run ใน PowerShell
- [ ] Screenshot: หน้า Neo4j Browser Login
- [ ] Screenshot: หน้า Neo4j Browser พร้อมใช้งาน

---

## Slide 4: Graph Data Model

**หัวข้อ:** โครงสร้างฐานข้อมูลแบบกราฟ (6 Nodes, 6 Relationships)

**เนื้อหา (Bullet Points):**
- **6 Node Labels**:
  - Patient (ข้อมูลผู้ป่วย)
  - Doctor (ข้อมูลแพทย์)
  - Appointment (นัดหมาย)
  - MedicalRecord (บันทึกการรักษา)
  - Medicine (ยา)
  - Symptom (อาการ)

- **6 Relationship Types**:
  - HAS_APPOINTMENT, ATTENDED_BY
  - HAS_RECORD, DIAGNOSED_IN
  - PRESCRIBED, HAS_SYMPTOM

- **แผนภาพ**: `(Patient)→(Appointment)→(Doctor)` และ `(Patient)→(MedicalRecord)→(Medicine)`

**ภาพประกอบ:**
- [ ] ภาพแผนภาพกราฟ (Graph Model) ที่สวยงาม
- [ ] ตารางแสดง Node Labels และ Properties
- [ ] ตารางแสดง Relationship Types

---

## Slide 5: CREATE Operations

**หัวข้อ:** การสร้างข้อมูลด้วย Cypher (CREATE)

**เนื้อหา (Bullet Points):**
- **สร้าง Patient ใหม่**:
  ```cypher
  CREATE (p:Patient {
    patientId: 4,
    firstName: 'Malee',
    lastName: 'Wongchai',
    dob: date('1998-06-15'),
    phone: '0856789012',
    allergic: 'None'
  }) RETURN p
  ```
- **สร้าง Appointment พร้อมเชื่อมโยง**:
  ```cypher
  MATCH (p:Patient {patientId: 1}), (d:Doctor {doctorId: 2})
  CREATE (p)-[:HAS_APPOINTMENT]->(a:Appointment {...})-[:ATTENDED_BY]->(d)
  RETURN a
  ```
- **จุดเด่น**: สร้าง Node และ Relationship พร้อมกันในคำสั่งเดียว

**ภาพประกอบ:**
- [ ] Screenshot: CREATE Patient Query ใน Neo4j Browser
- [ ] Screenshot: ผลลัพธ์แสดง Node Graph ที่สร้างขึ้น

---

## Slide 6: READ Operations

**หัวข้อ:** การอ่านข้อมูลด้วย Cypher (MATCH/RETURN)

**เนื้อหา (Bullet Points):**
- **อ่านข้อมูลผู้ป่วยทั้งหมด**:
  ```cypher
  MATCH (p:Patient)
  RETURN p.patientId, p.firstName, p.lastName
  ORDER BY p.lastName
  ```
- **ค้นหานัดหมายพร้อมข้อมูลแพทย์**:
  ```cypher
  MATCH (p:Patient {patientId: 1})-[:HAS_APPOINTMENT]->(a)-[:ATTENDED_BY]->(d)
  RETURN p.firstName, a.appntDate, d.lastName
  ```
- **Graph Traversal**: เดินทางตามความสัมพันธ์ได้หลายระดับในคำสั่งเดียว

**ภาพประกอบ:**
- [ ] Screenshot: READ Query แสดงตารางข้อมูล
- [ ] Screenshot: Graph Visualization ของความสัมพันธ์

---

## Slide 7: UPDATE และ DELETE Operations

**หัวข้อ:** การแก้ไขและลบข้อมูล (SET, DETACH DELETE)

**เนื้อหา (Bullet Points):**
- **UPDATE ด้วย SET**:
  ```cypher
  MATCH (p:Patient {patientId: 1})
  SET p.phone = '0899991111'
  RETURN p
  ```
- **DELETE vs DETACH DELETE**:
  - `DELETE`: ลบ Node เฉพาะ (ต้องลบ Relationship ก่อน ไม่งั้น Error)
  - `DETACH DELETE`: ลบ Node + ตัด Relationship ทั้งหมดอัตโนมัติ

- **ตัวอย่าง DETACH DELETE**:
  ```cypher
  MATCH (a:Appointment {status: 'Cancelled'})
  DETACH DELETE a
  ```

**ภาพประกอบ:**
- [ ] Screenshot: UPDATE Query และผลลัพธ์
- [ ] Screenshot: DELETE Query และผลลัพธ์
- [ ] ตารางเปรียบเทียบ DELETE vs DETACH DELETE

---

## Slide 8: Web Application Demo

**หัวข้อ:** สาธิตการใช้งาน MediGraph Clinic System (React.js)

**เนื้อหา (Bullet Points):**
- **Dashboard**: แสดงสถิติสรุป (ผู้ป่วย, แพทย์, นัดหมาย, ยา)
- **Patient Management**: CRUD ผู้ป่วยพร้อมแสดง Cypher Query จริง
- **Doctor Directory**: แสดงข้อมูลแพทย์แยกตามความเชี่ยวชาญ
- **Appointment Booking**: จองนัดเชื่อมโยงผู้ป่วย-แพทย์
- **Medical Records**: บันทึกการวินิจฉัยและการรักษา
- **Medicine Inventory**: จัดการคลังยา
- **Cypher Explorer**: ทดลองรันคำสั่ง Cypher 8 แบบพร้อมคำอธิบาย

**ภาพประกอบ:**
- [ ] Screenshot: หน้า Dashboard
- [ ] Screenshot: หน้า Patients (กำลังเพิ่มข้อมูล)
- [ ] Screenshot: หน้า Appointments
- [ ] Screenshot: หน้า Cypher Explorer
- [ ] GIF Demo: การใช้งานระบบ (แนะนำ)

---

## Slide 9: Conclusion

**หัวข้อ:** บทสรุปและผลลัพธ์ของโปรเจกต์

**เนื้อหา (Bullet Points):**
- ✅ **สำเร็จ**: พัฒนาระบบจัดการคลินิกครบถ้วนบน Neo4j
- ✅ **ครบถ้วน**: มี CRUD Operations ทั้ง 4 รูปแบบ (CREATE, READ, UPDATE, DELETE)
- ✅ **ออกแบบดี**: โครงสร้างกราฟ 6 Nodes + 6 Relationships
- ✅ **ใช้งานง่าย**: Web Interface ที่เชื่อมต่อกับ Neo4j Real-time
- ✅ **การเรียนรู้**: เข้าใจ Deep Relationship Traversal และ Cypher Query Language

**ข้อเสนอแนะสำหรับอนาคต:**
- เพิ่มระบบ Authentication, Visual Graph, Full-Text Search
- ขยายไปสู่ Mobile Application

**Thank You! คำถามและคำแนะนำยินดีรับฟังครับ/คะ**

**ภาพประกอบ:**
- [ ] Checklist ครบถ้วน 5 เกณฑ์การให้คะแนน
- [ ] QR Code ลิงก์ไปยัง Source Code (GitHub)
- [ ] ภาพหน้าจอแอปพลิเคชันรวมกัน

---

## หมายเหตุสำหรับการสร้างสไลด์
1. ใช้ธีมสี Teal (#0D9488) ให้สอดคล้องกับ Web App
2. ใช้ฟอนต์ที่อ่านง่าย เช่น TH Sarabun New หรือ TH Mali
3. แต่ละหน้าไม่ควรมีข้อความเกิน 5-6 บรรทัด (ยกเว้นโค้ด)
4. ใช้รูปภาพและ Screenshot ประกอบให้มากที่สุด
5. ทดลองนำเสนอให้เพื่อนฟังก่อนเพื่อเช็คเวลา (แนะนำ 8-10 นาที)

---

**สิ้นสุด Presentation Slides (9 หน้า)**
