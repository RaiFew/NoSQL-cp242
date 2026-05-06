#!/bin/bash

# ============================================
# สคริปต์ติดตั้ง Neo4j ด้วย Docker
# สำหรับโปรเจกต์ Capstone Project 2: NoSQL
# ระบบจัดการคลินิก (MediGraph Clinic System)
# ============================================

# ขั้นตอนที่ 1: ดึง Neo4j Image เวอร์ชันล่าสุดจาก Docker Hub
# คำอธิบาย: docker pull จะดาวน์โหลด Image ของ Neo4j จาก Docker Hub
#             ซึ่งประกอบด้วย Neo4j Database พร้อมเครื่องมือทั้งหมดที่จำเป็น
echo "กำลังดึง Neo4j Image..."
docker pull neo4j:latest

# ขั้นตอนที่ 2: รัน Neo4j Container ด้วยการตั้งค่าต่อไปนี้
# คำอธิบายพารามิเตอร์:
#   -d              : รันในโหมด detached (แยกกระบวนการ) ทำให้สามารถใช้งาน terminal ต่อได้
#   --name neo4j-clinic : ตั้งชื่อ container ว่า "neo4j-clinic" เพื่อให้อ้างอิงได้ง่าย
#   -p 7474:7474   : แมปพอร์ต 7474 ของเครื่อง host ไปยังพอร์ต 7474 ใน container
#                     (ใช้สำหรับเข้า Neo4j Browser ผ่านเว็บ)
#   -p 7687:7687   : แมปพอร์ต 7687 ของเครื่อง host ไปยังพอร์ต 7687 ใน container
#                     (ใช้สำหรับการเชื่อมต่อผ่าน Bolt Protocol จากแอปพลิเคชัน)
#   -e NEO4J_AUTH=neo4j/clinic123 : ตั้งค่าสภาพแวดล้อมสำหรับการยืนยันตัวตน
#                                     กำหนด username = neo4j, password = clinic123
#   neo4j:latest    : ชื่อ Image ที่จะรัน (เวอร์ชันล่าสุด)
echo "กำลังรัน Neo4j Container..."
docker run -d --name neo4j-clinic \
  -p 7474:7474 \
  -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/clinic123 \
  neo4j:latest

# ขั้นตอนที่ 3: ตรวจสอบสถานะ Container
# คำอธิบาย: docker ps จะแสดงรายการ containers ที่กำลังทำงานอยู่
#            ใช้ -f name=neo4j-clinic เพื่อกรองเฉพาะ container ที่มีชื่อว่า neo4j-clinic
#            เพื่อยืนยันว่า Neo4j ทำงานปกติและพร้อมรับการเชื่อมต่อ
echo "ตรวจสอบสถานะ Neo4j Container..."
docker ps -f name=neo4j-clinic

# ขั้นตอนที่ 4: แสดงคำแนะนำการเข้าใช้งาน
# คำอธิบาย: แสดงข้อมูลที่จำเป็นสำหรับการเข้าใช้งาน Neo4j Browser
#            และการเชื่อมต่อจากแอปพลิเคชัน
echo ""
echo "============================================"
echo "Neo4j พร้อมใช้งานแล้ว!"
echo "============================================"
echo "Neo4j Browser: http://localhost:7474"
echo "Bolt Protocol: bolt://localhost:7687"
echo "Username: neo4j"
echo "Password: clinic123"
echo "============================================"
echo ""
echo "คำแนะนำเพิ่มเติม:"
echo "  - หยุด Neo4j: docker stop neo4j-clinic"
echo "  - เริ่ม Neo4j อีกครั้ง: docker start neo4j-clinic"
echo "  - ลบ container: docker rm -f neo4j-clinic"
echo "  - ดู logs: docker logs neo4j-clinic"
echo "============================================"
