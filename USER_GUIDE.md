# MediGraph - คู่มือการใช้งานระบบคลินิก (Neo4j)

## ขั้นตอนที่ 1: เริ่มต้น Neo4j ด้วย Docker

เปิด **PowerShell** แล้วรันคำสั่ง:

```powershell
# ดึง Neo4j image
docker pull neo4j:latest

# รัน Neo4j container
docker run -d --name neo4j-clinic `
  -p 7474:7474 `
  -p 7687:7687 `
  -e NEO4J_AUTH=neo4j/clinic123 `
  neo4j:latest

# ตรวจสอบสถานะ container
docker ps
```

### เข้าใช้งาน Neo4j Browser
เปิดเบราว์เซอร์ที่: **http://localhost:7474**
- **Username:** `neo4j`
- **Password:** `clinic123`

---

## ขั้นตอนที่ 2: รัน React App

เปิด **PowerShell** ใหม่ แล้วรัน:

```powershell
cd D:\NoSQL
npm run dev
```

แล้วเปิดเบราว์เซอร์ที่: **http://localhost:5173** (หรือพอร์ตที่แสดงใน log)

---

## ขั้นตอนที่ 3: เมนูและการใช้งาน

### 3.1 Dashboard (หน้าหลัก)
- ดูสรุปข้อมูลทั้งหมดของคลินิก
- แสดงจำนวนผู้ป่วย, แพทย์, นัดหมายที่จะมาถึง, ยาในคลัง, และบันทึกการรักษา
- แสดงนัดหมายล่าสุด 3 รายการ
- แสดงโมเดลกราฟ Neo4j (Node และ Relationship)

### 3.2 Patients (จัดการผู้ป่วย)
- **ดูรายชื่อผู้ป่วย:** แสดง ID, ชื่อ-นามสกุล, วันเกิด, เบอร์โทรศัพท์, ประวัติแพ้ยา
- **เพิ่มผู้ป่วย:** กดปุ่ม `+ Add New` → กรอกข้อมูล → กด `Create Patient`
- **แก้ไขผู้ป่วย:** กดปุ่ม `Edit` → แก้ไขข้อมูล → กด `Save Changes`
- **ลบผู้ป่วย:** กดปุ่ม `Delete` → ยืนยันการลบ
- **ดู Cypher Query:** กดปุ่ม `Show READ Query` เพื่อดูคำสั่ง Cypher ที่ใช้ดึงข้อมูล

### 3.3 Doctors (รายชื่อแพทย์)
- ดูข้อมูลแพทย์ทั้งหมดในรูปแบบการ์ด
- แสดงชื่อ, สาขาเฉพาะทาง (Specialty), และเบอร์โทรศัพท์
- ดู Cypher Query สำหรับดึงข้อมูลแพทย์

### 3.4 Appointments (นัดหมาย)
- **ดูนัดหมาย:** แสดงรายการนัดหมายทั้งหมดพร้อมสถานะ (Scheduled/Completed/Cancelled)
- **จองนัดหมาย:** กด `+ Schedule Appointment` → เลือกผู้ป่วย, แพทย์, วันที่, เวลา, สถานะ → กด `Book Appointment`
- **แก้ไข:** กด `Edit` → เปลี่ยนข้อมูล → กด `Save Changes`
- **ยกเลิก:** กด `Delete` → ยืนยันการลบ
- ดู Cypher Query สำหรับสร้าง/อัปเดต/ลบการนัดหมาย

### 3.5 Medical Records (บันทึกการรักษา)
- ดูประวัติการรักษาทั้งหมด
- แสดงวันที่เข้ารับการรักษา, การวินิจฉัย (Diagnosis), การรักษา (Treatment)
- แสดงชื่อผู้ป่วยและแพทย์ผู้รักษา
- ดู Cypher Query สำหรับดึงข้อมูลประวัติการรักษา

### 3.6 Medicines (คลังยา)
- **ดูยา:** แสดงรายการยาทั้งหมดพร้อมราคาและจำนวนสต็อก
- **เพิ่มยา:** กด `+ Add Medicine` → กรอกชื่อยา, รายละเอียด, ราคา, จำนวนสต็อก → กด `Add Medicine`
- ยาที่สต็อกต่ำกว่า 100 จะขึ้นสีแดง
- ดู Cypher Query สำหรับเพิ่มข้อมูลยา

### 3.7 Cypher Explorer (สำรวจคำสั่ง Cypher)
- เลือกตัวอย่างคำสั่ง Cypher จากเมนูด้านซ้าย
- ดูคำสั่ง Cypher ที่ใช้ใน Neo4j 5.x
- คัดลอกคำสั่งไปรันใน Neo4j Browser (http://localhost:7474)
- ตัวอย่างคำสั่งที่มีให้:
  - Create Patient (สร้างผู้ป่วย)
  - Read All Patients (ดึงข้อมูลผู้ป่วยทั้งหมด)
  - Patient Appointments (ดูนัดหมายของผู้ป่วย)
  - Update Patient Phone (อัปเดตเบอร์โทร)
  - Delete Cancelled Appts (ลบนัดหมายที่ยกเลิก)
  - Doctor Work Summary (สรุปงานของแพทย์)
  - Low Stock Medicines (ยาที่สต็อกต่ำ)
  - Graph Traversal (การท่องไปในกราฟ)

---

## ขั้นตอนที่ 4: ทดสอบระบบ

1. ไปที่เมนู **Patients** → กด `+ Add New`
   - First Name: `สมชาย`
   - Last Name: `ใจดี`
   - Date of Birth: `1990-01-15`
   - Phone: `0812345678`
   - Allergic To: `None`
   - กด `Create Patient`

2. ไปที่เมนู **Appointments** → กด `+ Schedule Appointment`
   - เลือกผู้ป่วย: `สมชาย ใจดี`
   - เลือกแพทย์: `Dr. Wanchai Pongpat (Cardiology)`
   - Date: `2026-05-10`
   - Time: `09:00`
   - Status: `Scheduled`
   - กด `Book Appointment`

3. ไปที่เมนู **Cypher Explorer** → เลือก `Create Patient`
   - คัดลอกคำสั่ง Cypher
   - นำไปรันใน Neo4j Browser (http://localhost:7474)

---

## หมายเหตุสำคัญ

- **ข้อมูลปัจจุบัน:** ระบบใช้ข้อมูลจำลอง (Mock Data) ยังไม่ได้เชื่อมต่อ Neo4j จริง
- **การเชื่อมต่อ Neo4j:** หากต้องการเชื่อมต่อฐานข้อมูลจริง ต้องติดตั้ง Neo4j Driver:
  ```powershell
  npm install neo4j-driver
  ```
  จากนั้นแก้ไฟล์ `src/App.jsx` เพื่อเพิ่มการเชื่อมต่อฐานข้อมูล

- **หยุด Docker Neo4j:**
  ```powershell
  docker stop neo4j-clinic
  ```

- **ลบ Docker Neo4j:**
  ```powershell
  docker stop neo4j-clinic
  docker rm neo4j-clinic
  ```

---

## โครงสร้างไฟล์

```
D:\NoSQL\
├── index.html          # หน้า HTML หลัก
├── package.json        # รายชื่อ dependencies
├── vite.config.js      # ตั้งค่า Vite
├── src\
│   ├── main.jsx       # จุดเริ่มต้น React App
│   └── App.jsx        # ตัวแอปพลิเคชันหลัก
├── setup-docker.sh     # คำสั่งตั้งค่า Docker (สำหรับ Linux/Mac)
└── USER_GUIDE.md       # คู่มือการใช้งานนี้
```

---

## การแก้ไขปัญหา (Troubleshooting)

| ปัญหา | วิธีแก้ไข |
|--------|-----------|
| พอร์ต 5173 ถูกใช้งานแล้ว | Vite จะเลือกพอร์ตอื่นให้อัตโนมัติ (เช่น 5174) |
| ไม่เจอไฟล์ App.jsx | ตรวจสอบว่าไฟล์อยู่ใน `D:\NoSQL\src\App.jsx` |
| Docker ไม่ทำงาน | ตรวจสอบว่า Docker Desktop เปิดอยู่ |
| Neo4j Browser ไม่เข้า | รอสักครู่ให้ Neo4j เริ่มต้นเสร็จ (ดูจาก `docker logs neo4j-clinic`) |
