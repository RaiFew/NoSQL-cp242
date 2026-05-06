#!/bin/bash

# ดึง Neo4j Image เวอร์ชันล่าสุดจาก Docker Hub
docker pull neo4j:latest

# รัน Neo4j Container ด้วยชื่อ neo4j-clinic
# แมปพอร์ต 7474 สำหรับ Neo4j Browser (HTTP UI ที่เข้าผ่านเว็บ)
# แมปพอร์ต 7687 สำหรับ Bolt Protocol (โปรโตคอลเชื่อมต่อแอปพลิเคชัน)
# ตั้งค่าสภาพแวดล้อมรหัสผ่านเข้าใช้งานเป็น neo4j/clinic123
docker run -d --name neo4j-clinic \
  -p 7474:7474 \
  -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/clinic123 \
  neo4j:latest

# ตรวจสอบสถานะ Container ที่กำลังรัน ยืนยันว่า Neo4j ทำงานปกติ
docker ps -f name=neo4j-clinic
