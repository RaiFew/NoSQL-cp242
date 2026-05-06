# ขั้นตอนการทำโปรเจกต์ Capstone Project 2: MediGraph Clinic System (Neo4j)

## เกณฑ์การให้คะแนน (เต็ม 5 คะแนน)
- ✅ ติดตั้ง Docker และ Neo4j (1 คะแนน)
- ✅ CRUD Operations ครบถ้วน (1 คะแนน)
- ✅ Use-Case Application ที่ชัดเจน (1 คะแนน)
- ✅ เอกสารรายงาน (DOCX/PDF) (1 คะแนน)
- ✅ สไลด์นำเสนอ (PPTX) (1 คะแนน)

---

## ขั้นตอนที่ 1: ติดตั้ง Neo4j ด้วย Docker

### 1.1 เปิด Docker Desktop
- ตรวจสอบว่า Docker Desktop เปิดทำงานแล้ว
- 📸 **Screenshot จุดที่ 1**: หน้าจอ Docker Desktop ที่แสดงสถานะ "Running"

### 1.2 ดึง Neo4j Image
เปิด PowerShell แล้วรัน:
```powershell
docker pull neo4j:latest
```
📸 **Screenshot จุดที่ 2**: ผลลัพธ์คำสั่ง `docker pull neo4j:latest` ใน PowerShell

### 1.3 รัน Neo4j Container
```powershell
docker run -d --name neo4j-clinic `
  -p 7474:7474 `
  -p 7687:7687 `
  -e NEO4J_AUTH=neo4j/clinic123 `
  neo4j:latest
```
📸 **Screenshot จุดที่ 3**: ผลลัพธ์คำสั่ง `docker run` และ `docker ps` ที่แสดง container กำลังทำงาน

### 1.4 เข้าใช้งาน Neo4j Browser
- เปิดเบราว์เซอร์ที่: **http://localhost:7474**
- Login: Username `neo4j`, Password `clinic123`
📸 **Screenshot จุดที่ 4**: หน้า Login ของ Neo4j Browser
📸 **Screenshot จุดที่ 5**: หน้า Neo4j Browser หลัง Login สำเร็จ (แสดงช่องพิมพ์ Cypher Query)

---

## ขั้นตอนที่ 2: ทดสอบ CRUD Operations ด้วย Cypher

### 2.1 CREATE Operation (การสร้างข้อมูล)
พิมพ์คำสั่งใน Neo4j Browser:
```cypher
CREATE (p:Patient {
  patientId: 1,
  firstName: 'Somchai',
  lastName: 'Jaidee',
  dob: date('1985-03-14'),
  phone: '0812345678',
  allergic: 'Penicillin'
})
RETURN p
```
📸 **Screenshot จุดที่ 6**: ผลลัพธ์ CREATE Patient ใน Neo4j Browser (แสดง Node Graph)

### 2.2 READ Operation (การอ่านข้อมูล)
```cypher
MATCH (p:Patient)
RETURN p.patientId, p.firstName, p.lastName, p.dob, p.phone, p.allergic
ORDER BY p.lastName
```
📸 **Screenshot จุดที่ 7**: ผลลัพธ์ READ Query แสดงตารางข้อมูลผู้ป่วย

### 2.3 UPDATE Operation (การแก้ไขข้อมูล)
```cypher
MATCH (p:Patient {patientId: 1})
SET p.phone = '0899991111'
RETURN p.firstName, p.phone
```
📸 **Screenshot จุดที่ 8**: ผลลัพธ์ UPDATE Query แสดงข้อมูลที่แก้ไขแล้ว

### 2.4 DELETE Operation (การลบข้อมูล)
```cypher
MATCH (p:Patient {patientId: 1})
DETACH DELETE p
```
📸 **Screenshot จุดที่ 9**: ผลลัพธ์ DELETE Query (แสดงผลลัพธ์ว่างเปล่า = ลบสำเร็จ)

---

## ขั้นตอนที่ 3: รัน Web Application (React.js)

### 3.1 ตรวจสอบไฟล์โปรเจกต์
ตรวจสอบว่าไฟล์เหล่านี้มีอยู่ใน `D:\NoSQL`:
- `package.json`
- `vite.config.js`
- `index.html`
- `src/main.jsx`
- `src/App.jsx`

### 3.2 ติดตั้ง Dependencies
```powershell
cd D:\NoSQL
npm install
```
📸 **Screenshot จุดที่ 10**: ผลลัพธ์คำสั่ง `npm install` ที่แสดง "added XX packages"

### 3.3 รัน Dev Server
```powershell
npm run dev
```
📸 **Screenshot จุดที่ 11**: ผลลัพธ์คำสั่ง `npm run dev` ที่แสดง "Local: http://localhost:5173/"

### 3.4 ทดสอบใช้งาน Web App
เปิดเบราว์เซอร์ที่: **http://localhost:5173**

#### 3.4.1 หน้า Dashboard
📸 **Screenshot จุดที่ 12**: หน้า Dashboard แสดงสถิติและกราฟโมเดล

#### 3.4.2 หน้า Patients (จัดการผู้ป่วย)
- กดปุ่ม `+ Add New`
- กรอกข้อมูล: First Name: `สมชาย`, Last Name: `ใจดี`, DOB: `1990-01-15`, Phone: `0812345678`, Allergic: `None`
- กด `Create Patient`
📸 **Screenshot จุดที่ 13**: Modal เพิ่มผู้ป่วย (กำลังกรอกข้อมูล)
📸 **Screenshot จุดที่ 14**: ตารางผู้ป่วยหลังเพิ่มข้อมูล + Cypher Query ด้านล่าง

#### 3.4.3 หน้า Appointments (นัดหมาย)
- กด `+ Schedule Appointment`
- เลือกผู้ป่วย, แพทย์, วันที่, เวลา
- กด `Book Appointment`
📸 **Screenshot จุดที่ 15**: รายการนัดหมายทั้งหมด

#### 3.4.4 หน้า Cypher Explorer
- เลือกคำสั่งจากเมนูซ้าย (เช่น "Create Patient")
📸 **Screenshot จุดที่ 16**: หน้า Cypher Explorer แสดงคำสั่ง Cypher พร้อม Docker Commands ด้านล่าง

---

## ขั้นตอนที่ 4: จัดทำรายงาน (DOCX/PDF)

### 4.1 นำเข้าเนื้อหา
1. เปิดไฟล์ `4_Report_Draft.md` (Markdown)
2. คัดลอกเนื้อหาทั้งหมด
3. เปิด Microsoft Word
4. Paste เนื้อหาและจัดรูปแบบให้สวยงาม

### 4.2 แทรกรูปภาพ (Screenshots)
แทรปรูปจากขั้นตอนที่ 1-3 ตามตำแหน่งที่เว้นไว้ในรายงาน:
- รูปที่ 1: ผลลัพธ์คำสั่ง Docker
- รูปที่ 2: หน้า Neo4j Browser
- รูปที่ 3-6: ผลลัพธ์ CRUD Operations
- รูปที่ 7-10: หน้าจอ Web Application

### 4.3 Export เป็น PDF
- ใน Word: File → Save As → เลือกประเภทไฟล์เป็น PDF
📸 **Screenshot จุดที่ 17**: ไฟล์รายงาน PDF ที่สร้างเสร็จแล้ว

---

## ขั้นตอนที่ 5: จัดทำสไลด์นำเสนอ (PPTX)

### 5.1 นำเข้าเนื้อหา
1. เปิดไฟล์ `5_Presentation_Draft.md`
2. อ่านโครงสร้าง Slide ทั้ง 9 หน้า
3. เปิด Microsoft PowerPoint
4. สร้างสไลด์ตามโครงสร้างที่กำหนด

### 5.2 แทรกรูปภาพและคำสั่ง
- แทรปรูป Screenshot จากการทดสอบ
- เพิ่มรูปภาพ Cypher Queries
- เพิ่มรูปหน้าจอ Web App

### 5.3 ตรวจสอบความครบถ้วน (Checklist)
- [ ] Slide 1: Project Overview
- [ ] Slide 2: Why Neo4j?
- [ ] Slide 3: Docker Installation
- [ ] Slide 4: Graph Data Model
- [ ] Slide 5: CREATE Operations
- [ ] Slide 6: READ Operations
- [ ] Slide 7: UPDATE และ DELETE Operations
- [ ] Slide 8: Web Application Demo
- [ ] Slide 9: Conclusion
📸 **Screenshot จุดที่ 18**: ไฟล์สไลด์ PPTX ที่สร้างเสร็จแล้ว (แสดงทั้ง 9 หน้าใน View → Slide Sorter)

---

## สรุป Checklist ก่อนส่งงาน

### Docker & Neo4j
- [ ] รัน Neo4j ผ่าน Docker สำเร็จ
- [ ] สามารถเข้า Neo4j Browser ได้ที่ http://localhost:7474
- [ ] มี Screenshot หน้าจอ Docker และ Neo4j Browser

### CRUD Operations
- [ ] ทดสอบ CREATE, READ, UPDATE, DELETE ใน Neo4j Browser
- [ ] มี Screenshot ผลลัพธ์แต่ละ Operation

### Web Application
- [ ] รัน React App ได้ที่ http://localhost:5173
- [ ] ทดสอบเมนูต่างๆ (Dashboard, Patients, Appointments, etc.)
- [ ] มี Screenshot หน้าจอแต่ละเมนู

### เอกสารรายงาน (DOCX/PDF)
- [ ] มีเนื้อหาครบตามโครงสร้าง (Docker, CRUD, Use-Case, Conclusion)
- [ ] แทรปรูป Screenshot ครบถ้วน
- [ ] Export เป็น PDF เรียบร้อย

### สไลด์นำเสนอ (PPTX)
- [ ] มีครบ 9 หน้า ตามโครงสร้าง
- [ ] แทรปรูปประกอบการนำเสนอ
- [ ] ตรวจสอบทานองเนื้อหาครบถ้วน

---

**หมายเหตุ**: เก็บ Screenshot ทั้งหมดไว้ในโฟลเดอร์ `D:\NoSQL\screenshots\` เพื่อความเป็นระเบียบ
