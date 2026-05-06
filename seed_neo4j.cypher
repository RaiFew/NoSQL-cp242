// ============================================
// MediGraph Clinic - Neo4j Seed Data
// Run this in Neo4j Browser at http://localhost:7474
// Username: neo4j / Password: clinic123
// ============================================

// Create Patients
CREATE (p1:Patient {id: 1, firstName: 'Anan', lastName: 'Chaiyadej', dob: '1988-01-15', phone: '0811111111', allergic: 'Penicillin'})
CREATE (p2:Patient {id: 2, firstName: 'Mali', lastName: 'Srisuwan', dob: '1995-05-22', phone: '0822222222', allergic: 'None'})
CREATE (p3:Patient {id: 3, firstName: 'Krit', lastName: 'Pongpat', dob: '1979-09-10', phone: '0833333333', allergic: 'Aspirin'})
CREATE (p4:Patient {id: 4, firstName: 'Suda', lastName: 'Thongchai', dob: '1992-12-03', phone: '0844444444', allergic: 'None'})
CREATE (p5:Patient {id: 5, firstName: 'Napat', lastName: 'Narongchai', dob: '1985-07-18', phone: '0855555555', allergic: 'Sulfa'})
CREATE (p6:Patient {id: 6, firstName: 'Lalita', lastName: 'Wongchai', dob: '1998-03-25', phone: '0866666666', allergic: 'None'})
CREATE (p7:Patient {id: 7, firstName: 'Chaiwat', lastName: 'Moonkham', dob: '1970-11-30', phone: '0877777777', allergic: 'Ibuprofen'})
CREATE (p8:Patient {id: 8, firstName: 'Pimchanok', lastName: 'Jaidee', dob: '2000-08-14', phone: '0888888888', allergic: 'None'})
CREATE (p9:Patient {id: 9, firstName: 'Thanawat', lastName: 'Srisuk', dob: '1983-04-05', phone: '0899999999', allergic: 'None'})
CREATE (p10:Patient {id: 10, firstName: 'Oranicha', lastName: 'Thongsuk', dob: '1993-10-19', phone: '0810000000', allergic: 'Penicillin'})
CREATE (p11:Patient {id: 11, firstName: 'Saran', lastName: 'Apirak', dob: '1987-06-12', phone: '0821111111', allergic: 'None'})
CREATE (p12:Patient {id: 12, firstName: 'Nicha', lastName: 'Prasert', dob: '1996-02-28', phone: '0832222222', allergic: 'Latex'})
CREATE (p13:Patient {id: 13, firstName: 'Tawan', lastName: 'Kritsana', dob: '1991-09-07', phone: '0843333333', allergic: 'None'})
CREATE (p14:Patient {id: 14, firstName: 'Jira', lastName: 'Siriwan', dob: '1978-12-15', phone: '0854444444', allergic: 'Codeine'})
CREATE (p15:Patient {id: 15, firstName: 'Ploy', lastName: 'Chutima', dob: '2002-05-03', phone: '0865555555', allergic: 'None'})

// Create Doctors
CREATE (d1:Doctor {id: 1, firstName: 'Wanchai', lastName: 'Pongpat', specialty: 'Cardiology', phone: '0821111111'})
CREATE (d2:Doctor {id: 2, firstName: 'Siriya', lastName: 'Thongsuk', specialty: 'General Medicine', phone: '0822222222'})
CREATE (d3:Doctor {id: 3, firstName: 'Apirak', lastName: 'Narongchai', specialty: 'Orthopedics', phone: '0823333333'})

// Create Medicines
CREATE (m1:Medicine {id: 1, name: 'Amoxicillin 500mg', description: 'Broad-spectrum antibiotic', price: 45.00, stock: 200})
CREATE (m2:Medicine {id: 2, name: 'Ibuprofen 400mg', description: 'Anti-inflammatory / pain relief', price: 15.00, stock: 500})
CREATE (m3:Medicine {id: 3, name: 'Metformin 500mg', description: 'Type 2 diabetes management', price: 30.00, stock: 350})
CREATE (m4:Medicine {id: 4, name: 'Amlodipine 5mg', description: 'Calcium channel blocker for hypertension', price: 55.00, stock: 150})

// Create Appointments
CREATE (a1:Appointment {id: 1, date: '2025-04-20', time: '09:00', status: 'Scheduled'})
CREATE (a2:Appointment {id: 2, date: '2025-04-18', time: '14:00', status: 'Completed'})
CREATE (a3:Appointment {id: 3, date: '2025-04-15', time: '11:00', status: 'Cancelled'})

// Create Medical Records
CREATE (r1:MedicalRecord {id: 1, visitDate: '2025-04-18', diagnosis: 'Hypertension', treatment: 'Lifestyle modification, medication'})
CREATE (r2:MedicalRecord {id: 2, visitDate: '2025-04-15', diagnosis: 'Osteoarthritis', treatment: 'Physical therapy, NSAIDs'})

// Create Relationships: Patient -> Appointment
MATCH (p:Patient {id: 1}), (a:Appointment {id: 1}) CREATE (p)-[:HAS_APPOINTMENT]->(a)
MATCH (p:Patient {id: 2}), (a:Appointment {id: 2}) CREATE (p)-[:HAS_APPOINTMENT]->(a)
MATCH (p:Patient {id: 3}), (a:Appointment {id: 3}) CREATE (p)-[:HAS_APPOINTMENT]->(a)

// Create Relationships: Doctor -> Appointment
MATCH (d:Doctor {id: 2}), (a:Appointment {id: 1}) CREATE (d)-[:ATTENDS]->(a)
MATCH (d:Doctor {id: 1}), (a:Appointment {id: 2}) CREATE (d)-[:ATTENDS]->(a)
MATCH (d:Doctor {id: 3}), (a:Appointment {id: 3}) CREATE (d)-[:ATTENDS]->(a)

// Create Relationships: Patient -> MedicalRecord
MATCH (p:Patient {id: 2}), (r:MedicalRecord {id: 1}) CREATE (p)-[:HAS_RECORD]->(r)
MATCH (p:Patient {id: 3}), (r:MedicalRecord {id: 2}) CREATE (p)-[:HAS_RECORD]->(r)

// Create Relationships: Doctor -> MedicalRecord
MATCH (d:Doctor {id: 1}), (r:MedicalRecord {id: 1}) CREATE (d)-[:TREATS]->(r)
MATCH (d:Doctor {id: 3}), (r:MedicalRecord {id: 2}) CREATE (d)-[:TREATS]->(r)

// Create Relationships: MedicalRecord -> Medicine
MATCH (r:MedicalRecord {id: 1}), (m:Medicine {id: 4}) CREATE (r)-[:PRESCRIBED]->(m)
MATCH (r:MedicalRecord {id: 2}), (m:Medicine {id: 2}) CREATE (r)-[:PRESCRIBED]->(m)

// Verify: Show all nodes
MATCH (n) RETURN labels(n) as Label, count(n) as Count
