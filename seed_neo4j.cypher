// ============================================
// MediGraph Clinic - Neo4j Seed Data
// Run this in Neo4j Browser at http://localhost:7474
// Username: neo4j / Password: clinic123
// ============================================

// Create Patients (using patientId as property name)
CREATE (p1:Patient {patientId: 1, firstName: 'Anan', lastName: 'Chaiyadej', dob: '1988-01-15', phone: '0811111111', allergic: 'Penicillin'})
CREATE (p2:Patient {patientId: 2, firstName: 'Mali', lastName: 'Srisuwan', dob: '1995-05-22', phone: '0822222222', allergic: 'None'})
CREATE (p3:Patient {patientId: 3, firstName: 'Krit', lastName: 'Pongpat', dob: '1979-09-10', phone: '0833333333', allergic: 'Aspirin'})
CREATE (p4:Patient {patientId: 4, firstName: 'Suda', lastName: 'Thongchai', dob: '1992-12-03', phone: '0844444444', allergic: 'None'})
CREATE (p5:Patient {patientId: 5, firstName: 'Napat', lastName: 'Narongchai', dob: '1985-07-18', phone: '0855555555', allergic: 'Sulfa'})
CREATE (p6:Patient {patientId: 6, firstName: 'Lalita', lastName: 'Wongchai', dob: '1998-03-25', phone: '0866666666', allergic: 'None'})
CREATE (p7:Patient {patientId: 7, firstName: 'Chaiwat', lastName: 'Moonkham', dob: '1970-11-30', phone: '0877777777', allergic: 'Ibuprofen'})
CREATE (p8:Patient {patientId: 8, firstName: 'Pimchanok', lastName: 'Jaidee', dob: '2000-08-14', phone: '0888888888', allergic: 'None'})
CREATE (p9:Patient {patientId: 9, firstName: 'Thanawat', lastName: 'Srisuk', dob: '1983-04-05', phone: '0899999999', allergic: 'None'})
CREATE (p10:Patient {patientId: 10, firstName: 'Oranicha', lastName: 'Thongsuk', dob: '1993-10-19', phone: '0810000000', allergic: 'Penicillin'})
CREATE (p11:Patient {patientId: 11, firstName: 'Saran', lastName: 'Apirak', dob: '1987-06-12', phone: '0821111111', allergic: 'None'})
CREATE (p12:Patient {patientId: 12, firstName: 'Nicha', lastName: 'Prasert', dob: '1996-02-28', phone: '0832222222', allergic: 'Latex'})
CREATE (p13:Patient {patientId: 13, firstName: 'Tawan', lastName: 'Kritsana', dob: '1991-09-07', phone: '0843333333', allergic: 'None'})
CREATE (p14:Patient {patientId: 14, firstName: 'Jira', lastName: 'Siriwan', dob: '1978-12-15', phone: '0854444444', allergic: 'Codeine'})
CREATE (p15:Patient {patientId: 15, firstName: 'Ploy', lastName: 'Chutima', dob: '2002-05-03', phone: '0865555555', allergic: 'None'})

// Create Doctors (using doctorId as property name)
CREATE (d1:Doctor {doctorId: 1, firstName: 'Wanchai', lastName: 'Pongpat', specialty: 'Cardiology', phone: '0821111111'})
CREATE (d2:Doctor {doctorId: 2, firstName: 'Siriya', lastName: 'Thongsuk', specialty: 'General Medicine', phone: '0822222222'})
CREATE (d3:Doctor {doctorId: 3, firstName: 'Apirak', lastName: 'Narongchai', specialty: 'Orthopedics', phone: '0823333333'})

// Create Medicines (using medicineId as property name)
CREATE (m1:Medicine {medicineId: 1, name: 'Amoxicillin 500mg', description: 'Broad-spectrum antibiotic', price: 45.00, stock: 200})
CREATE (m2:Medicine {medicineId: 2, name: 'Ibuprofen 400mg', description: 'Anti-inflammatory / pain relief', price: 15.00, stock: 500})
CREATE (m3:Medicine {medicineId: 3, name: 'Metformin 500mg', description: 'Type 2 diabetes management', price: 30.00, stock: 350})
CREATE (m4:Medicine {medicineId: 4, name: 'Amlodipine 5mg', description: 'Calcium channel blocker for hypertension', price: 55.00, stock: 150})

// Create Appointments (using appointmentId as property name, and storing patientId/doctorId as properties)
CREATE (a1:Appointment {appointmentId: 1, date: '2025-04-20', time: '09:00', status: 'Scheduled', patientId: 1, doctorId: 2})
CREATE (a2:Appointment {appointmentId: 2, date: '2025-04-18', time: '14:00', status: 'Completed', patientId: 2, doctorId: 1})
CREATE (a3:Appointment {appointmentId: 3, date: '2025-04-15', time: '11:00', status: 'Cancelled', patientId: 3, doctorId: 3})

// Create relationships for Appointments
MATCH (p:Patient {patientId: 1}), (a:Appointment {appointmentId: 1}) CREATE (p)-[:HAS_APPOINTMENT]->(a)
MATCH (d:Doctor {doctorId: 2}), (a:Appointment {appointmentId: 1}) CREATE (d)-[:ATTENDED_BY]->(a)
MATCH (p:Patient {patientId: 2}), (a:Appointment {appointmentId: 2}) CREATE (p)-[:HAS_APPOINTMENT]->(a)
MATCH (d:Doctor {doctorId: 1}), (a:Appointment {appointmentId: 2}) CREATE (d)-[:ATTENDED_BY]->(a)
MATCH (p:Patient {patientId: 3}), (a:Appointment {appointmentId: 3}) CREATE (p)-[:HAS_APPOINTMENT]->(a)
MATCH (d:Doctor {doctorId: 3}), (a:Appointment {appointmentId: 3}) CREATE (d)-[:ATTENDED_BY]->(a)

// Create Medical Records (using recordId as property name, storing patientId/doctorId as properties)
CREATE (r1:MedicalRecord {recordId: 1, visitDate: '2025-04-18', diagnosis: 'Hypertension', treatment: 'Lifestyle modification, medication', patientId: 2, doctorId: 1})
CREATE (r2:MedicalRecord {recordId: 2, visitDate: '2025-04-15', diagnosis: 'Osteoarthritis', treatment: 'Physical therapy, NSAIDs', patientId: 3, doctorId: 3})

// Create relationships for Medical Records
MATCH (p:Patient {patientId: 2}), (r:MedicalRecord {recordId: 1}) CREATE (p)-[:HAS_RECORD]->(r)
MATCH (d:Doctor {doctorId: 1}), (r:MedicalRecord {recordId: 1}) CREATE (d)-[:TREATS]->(r)
MATCH (p:Patient {patientId: 3}), (r:MedicalRecord {recordId: 2}) CREATE (p)-[:HAS_RECORD]->(r)
MATCH (d:Doctor {doctorId: 3}), (r:MedicalRecord {recordId: 2}) CREATE (d)-[:TREATS]->(r)

// Create relationships: MedicalRecord -> Medicine
MATCH (r:MedicalRecord {recordId: 1}), (m:Medicine {medicineId: 4}) CREATE (r)-[:PRESCRIBED]->(m)
MATCH (r:MedicalRecord {recordId: 2}), (m:Medicine {medicineId: 2}) CREATE (r)-[:PRESCRIBED]->(m)

// Verify: Show all nodes
MATCH (n) RETURN labels(n) as Label, count(n) as Count
