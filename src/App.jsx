import { useState } from "react";

const TEAL = "#0D9488";
const DARK = "#0F172A";
const SIDEBAR_W = 220;

const initPatients = [
  { id: 1, firstName: "Anan", lastName: "Chaiyadej", dob: "1988-01-15", phone: "0811111111", allergic: "Penicillin" },
  { id: 2, firstName: "Mali", lastName: "Srisuwan", dob: "1995-05-22", phone: "0822222222", allergic: "None" },
  { id: 3, firstName: "Krit", lastName: "Pongpat", dob: "1979-09-10", phone: "0833333333", allergic: "Aspirin" },
  { id: 4, firstName: "Suda", lastName: "Thongchai", dob: "1992-12-03", phone: "0844444444", allergic: "None" },
  { id: 5, firstName: "Napat", lastName: "Narongchai", dob: "1985-07-18", phone: "0855555555", allergic: "Sulfa" },
  { id: 6, firstName: "Lalita", lastName: "Wongchai", dob: "1998-03-25", phone: "0866666666", allergic: "None" },
  { id: 7, firstName: "Chaiwat", lastName: "Moonkham", dob: "1970-11-30", phone: "0877777777", allergic: "Ibuprofen" },
  { id: 8, firstName: "Pimchanok", lastName: "Jaidee", dob: "2000-08-14", phone: "0888888888", allergic: "None" },
  { id: 9, firstName: "Thanawat", lastName: "Srisuk", dob: "1983-04-05", phone: "0899999999", allergic: "None" },
  { id: 10, firstName: "Oranicha", lastName: "Thongsuk", dob: "1993-10-19", phone: "0810000000", allergic: "Penicillin" },
  { id: 11, firstName: "Saran", lastName: "Apirak", dob: "1987-06-12", phone: "0821111111", allergic: "None" },
  { id: 12, firstName: "Nicha", lastName: "Prasert", dob: "1996-02-28", phone: "0832222222", allergic: "Latex" },
  { id: 13, firstName: "Tawan", lastName: "Kritsana", dob: "1991-09-07", phone: "0843333333", allergic: "None" },
  { id: 14, firstName: "Jira", lastName: "Siriwan", dob: "1978-12-15", phone: "0854444444", allergic: "Codeine" },
  { id: 15, firstName: "Ploy", lastName: "Chutima", dob: "2002-05-03", phone: "0865555555", allergic: "None" },
];
const initDoctors = [
  { id: 1, firstName: "Wanchai", lastName: "Pongpat", specialty: "Cardiology", phone: "0821111111" },
  { id: 2, firstName: "Siriya", lastName: "Thongsuk", specialty: "General Medicine", phone: "0822222222" },
  { id: 3, firstName: "Apirak", lastName: "Narongchai", specialty: "Orthopedics", phone: "0823333333" },
];
const initAppointments = [
  { id: 1, date: "2025-04-20", time: "09:00", status: "Scheduled", patientId: 1, doctorId: 2 },
  { id: 2, date: "2025-04-18", time: "14:00", status: "Completed", patientId: 2, doctorId: 1 },
  { id: 3, date: "2025-04-15", time: "11:00", status: "Cancelled", patientId: 3, doctorId: 3 },
];
const initMedicines = [
  { id: 1, name: "Amoxicillin 500mg", description: "Broad-spectrum antibiotic", price: 45.00, stock: 200 },
  { id: 2, name: "Ibuprofen 400mg", description: "Anti-inflammatory / pain relief", price: 15.00, stock: 500 },
  { id: 3, name: "Metformin 500mg", description: "Type 2 diabetes management", price: 30.00, stock: 350 },
  { id: 4, name: "Amlodipine 5mg", description: "Calcium channel blocker for hypertension", price: 55.00, stock: 150 },
];
const initRecords = [
  { id: 1, visitDate: "2025-04-18", diagnosis: "Hypertension", treatment: "Lifestyle modification, medication", patientId: 2, doctorId: 1 },
  { id: 2, visitDate: "2025-04-15", diagnosis: "Osteoarthritis", treatment: "Physical therapy, NSAIDs", patientId: 3, doctorId: 3 },
];

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: "⬛" },
  { key: "patients", label: "Patients", icon: "👤" },
  { key: "doctors", label: "Doctors", icon: "🩺" },
  { key: "appointments", label: "Appointments", icon: "📅" },
  { key: "records", label: "Medical Records", icon: "📋" },
  { key: "medicines", label: "Medicines", icon: "💊" },
];

const statusColor = { Scheduled: "#0D9488", Completed: "#16A34A", Cancelled: "#DC2626" };

const fieldStyle = {
  width: "100%", padding: "8px 12px", border: "1px solid #CBD5E1",
  borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box",
  background: "#F8FAFC", color: "#1E293B"
};
const labelStyle = { fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 4, display: "block" };

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: 460, maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: DARK }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#94A3B8" }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Btn({ onClick, children, variant = "primary", style = {} }) {
  const base = { padding: "8px 18px", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer", border: "none", transition: "opacity .15s" };
  const variants = {
    primary: { background: TEAL, color: "#fff" },
    danger: { background: "#EF4444", color: "#fff" },
    ghost: { background: "#F1F5F9", color: "#334155", border: "1px solid #CBD5E1" },
  };
  return <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>{children}</button>;
}

function StatCard({ label, value, sub, color = TEAL }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", border: "1px solid #E2E8F0", flex: 1, minWidth: 140 }}>
      <div style={{ fontSize: 28, fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#1E293B", marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function SectionHeader({ title, onAdd }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: DARK }}>{title}</h2>
      {onAdd && <Btn onClick={onAdd}>+ Add New</Btn>}
    </div>
  );
}

function CypherBox({ query }) {
  if (!query) return null;
  return (
    <div style={{ marginTop: 16, background: "#0F172A", borderRadius: 12, padding: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#0D9488", letterSpacing: 1, marginBottom: 8 }}>NEO4J CYPHER QUERY</div>
      <pre style={{ margin: 0, fontFamily: "monospace", fontSize: 13, color: "#7DD3FC", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{query}</pre>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
function Dashboard({ patients, doctors, appointments, medicines, records }) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = appointments.filter(a => a.date >= today && a.status === "Scheduled").length;
  return (
    <div>
      <SectionHeader title="Dashboard" />
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
        <StatCard label="Total Patients" value={patients.length} sub="Registered" color="#0D9488" />
        <StatCard label="Doctors" value={doctors.length} sub="Active staff" color="#7C3AED" />
        <StatCard label="Upcoming Appts" value={upcoming} sub="Scheduled" color="#EA580C" />
        <StatCard label="Medicines" value={medicines.length} sub="In inventory" color="#16A34A" />
        <StatCard label="Medical Records" value={records.length} sub="Total visits" color="#0369A1" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #E2E8F0" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: DARK }}>Recent Appointments</h3>
          {appointments.slice(0, 3).map(a => {
            const p = patients.find(x => x.id === a.patientId);
            const d = doctors.find(x => x.id === a.doctorId);
            return (
              <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F1F5F9" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{p ? `${p.firstName} ${p.lastName}` : "—"}</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>Dr. {d ? d.lastName : "—"} · {a.date} {a.time}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: statusColor[a.status] + "20", color: statusColor[a.status] }}>{a.status}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Patients ─────────────────────────────────────────────────────────────────
function Patients({ patients, setPatients }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [lastQuery, setLastQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const openAdd = () => { setForm({ firstName:"", lastName:"", dob:"", phone:"", allergic:"" }); setModal("add"); };
  const openEdit = (p) => { setForm({ ...p }); setModal("edit"); };

  const save = () => {
    if (modal === "add") {
      const newP = { ...form, id: Date.now() };
      setPatients(prev => [...prev, newP]);
      setLastQuery(`CREATE (p:Patient {\n  patientId: ${newP.id},\n  firstName: '${form.firstName}',\n  lastName: '${form.lastName}',\n  dob: date('${form.dob}'),\n  phone: '${form.phone}',\n  allergic: '${form.allergic || "None"}'\n})\nRETURN p`);
    } else {
      setPatients(prev => prev.map(p => p.id === form.id ? form : p));
      setLastQuery(`MATCH (p:Patient {patientId: ${form.id}})\nSET p.firstName = '${form.firstName}',\n    p.lastName = '${form.lastName}',\n    p.phone = '${form.phone}',\n    p.allergic = '${form.allergic}'\nRETURN p`);
    }
    setModal(null);
  };

  const del = (id, name) => {
    if (!window.confirm(`Delete patient ${name}?`)) return;
    setPatients(prev => prev.filter(p => p.id !== id));
    setLastQuery(`MATCH (p:Patient {patientId: ${id}})\nDETACH DELETE p`);
  };

  const viewAll = () => setLastQuery(`MATCH (p:Patient)\nRETURN p.patientId, p.firstName, p.lastName,\n       p.dob, p.phone, p.allergic\nORDER BY p.lastName`);

  const filteredPatients = patients.filter(p => {
    const term = searchTerm.toLowerCase();
    return (
      p.firstName.toLowerCase().includes(term) ||
      p.lastName.toLowerCase().includes(term) ||
      p.phone.includes(term)
    );
  });

  return (
    <div>
      <SectionHeader title="Patient Management" onAdd={openAdd} />
      <Btn variant="ghost" onClick={viewAll} style={{ marginBottom: 16, fontSize: 12 }}>Show READ Query</Btn>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search patients by name or phone..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ ...fieldStyle, width: 320 }}
        />
      </div>
      {filteredPatients.length === 0 ? (
        <div style={{ padding: 24, textAlign: "center", color: "#64748B", fontSize: 14, background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0" }}>
          No patients found
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: "#F8FAFC" }}>
              {["ID","Name","DOB","Phone","Allergic","Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#64748B", borderBottom: "1px solid #E2E8F0" }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{filteredPatients.map(p => (
              <tr key={p.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                <td style={{ padding: "12px 16px", fontSize: 13, color: "#64748B" }}>#{p.id}</td>
                <td style={{ padding: "12px 16px", fontWeight: 600, fontSize: 14 }}>{p.firstName} {p.lastName}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: "#64748B" }}>{p.dob}</td>
                <td style={{ padding: "12px 16px", fontSize: 13 }}>{p.phone}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ fontSize: 12, padding: "3px 8px", borderRadius: 20, background: p.allergic === "None" ? "#DCFCE7" : "#FEF2F2", color: p.allergic === "None" ? "#16A34A" : "#DC2626" }}>{p.allergic}</span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Btn onClick={() => openEdit(p)} variant="ghost" style={{ padding: "4px 12px", fontSize: 12 }}>Edit</Btn>
                    <Btn onClick={() => del(p.id, `${p.firstName} ${p.lastName}`)} variant="danger" style={{ padding: "4px 12px", fontSize: 12 }}>Delete</Btn>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      <CypherBox query={lastQuery} />
      {modal && (
        <Modal title={modal === "add" ? "Add New Patient" : "Edit Patient"} onClose={() => setModal(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[["firstName","First Name"],["lastName","Last Name"],["dob","Date of Birth"],["phone","Phone"],["allergic","Allergic To"]].map(([k,l]) => (
              <div key={k} style={k === "allergic" ? { gridColumn: "span 2" } : {}}>
                <label style={labelStyle}>{l}</label>
                <input type={k==="dob"?"date":"text"} style={fieldStyle} value={form[k]||""} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setModal(null)}>Cancel</Btn>
            <Btn onClick={save}>{modal === "add" ? "Create Patient" : "Save Changes"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Doctors ──────────────────────────────────────────────────────────────────
function Doctors({ doctors }) {
  const [searchTerm, setSearchTerm] = useState('');
  const colors = ["#0D9488","#7C3AED","#EA580C","#0369A1","#16A34A"];

  const filteredDoctors = doctors.filter(d => {
    const term = searchTerm.toLowerCase();
    return (
      d.firstName.toLowerCase().includes(term) ||
      d.lastName.toLowerCase().includes(term) ||
      d.specialty.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <SectionHeader title="Doctor Directory" />
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search doctors by name or specialty..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ ...fieldStyle, width: 320 }}
        />
      </div>
      {filteredDoctors.length === 0 ? (
        <div style={{ padding: 24, textAlign: "center", color: "#64748B", fontSize: 14, background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0" }}>
          No doctors found
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 16 }}>
          {filteredDoctors.map((d, i) => (
            <div key={d.id} style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #E2E8F0", textAlign: "center" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: colors[i%5], display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 22, color: "#fff", fontWeight: 700 }}>
                {d.firstName[0]}{d.lastName[0]}
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, color: DARK }}>Dr. {d.firstName} {d.lastName}</div>
              <div style={{ fontSize: 13, color: colors[i%5], fontWeight: 600, marginTop: 4 }}>{d.specialty}</div>
              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 8 }}>{d.phone}</div>
            </div>
          ))}
        </div>
      )}
      <CypherBox query={`MATCH (d:Doctor)\nRETURN d.doctorId, d.firstName, d.lastName,\n       d.specialty, d.phone\nORDER BY d.specialty`} />
    </div>
  );
}

// ─── Appointments ─────────────────────────────────────────────────────────────
function Appointments({ appointments, setAppointments, patients, doctors }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [lastQuery, setLastQuery] = useState('');

  const openAdd = () => { setForm({ date:"", time:"", status:"Scheduled", patientId: patients[0]?.id||"", doctorId: doctors[0]?.id||"" }); setModal("add"); };
  const openEdit = a => { setForm({ ...a }); setModal("edit"); };

  const save = () => {
    const pid = Number(form.patientId), did = Number(form.doctorId);
    if (modal === "add") {
      const newA = { ...form, id: Date.now(), patientId: pid, doctorId: did };
      setAppointments(prev => [...prev, newA]);
      setLastQuery(`MATCH (p:Patient {patientId: ${pid}}), (d:Doctor {doctorId: ${did}})\nCREATE (a:Appointment {\n  appointmentId: ${newA.id},\n  appntDate: date('${form.date}'),\n  appntTime: time('${form.time}'),\n  status: '${form.status}'\n})\nCREATE (p)-[:HAS_APPOINTMENT]->(a)\nCREATE (a)-[:ATTENDED_BY]->(d)\nRETURN a`);
    } else {
      setAppointments(prev => prev.map(a => a.id === form.id ? { ...form, patientId: pid, doctorId: did } : a));
      setLastQuery(`MATCH (a:Appointment {appointmentId: ${form.id}})\nSET a.appntDate = date('${form.date}'),\n    a.appntTime = time('${form.time}'),\n    a.status = '${form.status}'\nRETURN a`);
    }
    setModal(null);
  };

  const del = (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    setAppointments(prev => prev.filter(a => a.id !== id));
    setLastQuery(`MATCH (a:Appointment {appointmentId: ${id}})\nDETACH DELETE a`);
  };

  return (
    <div>
      <SectionHeader title="Appointments" onAdd={openAdd} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {appointments.map(a => {
          const p = patients.find(x => x.id === a.patientId);
          const d = doctors.find(x => x.id === a.doctorId);
          return (
            <div key={a.id} style={{ background: "#fff", borderRadius: 14, padding: 18, border: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: statusColor[a.status] + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📅</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{p ? `${p.firstName} ${p.lastName}` : "Unknown Patient"}</div>
                  <div style={{ fontSize: 13, color: "#64748B" }}>Dr. {d ? `${d.firstName} ${d.lastName}` : "—"} · {d?.specialty}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>{a.date} at {a.time}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20, background: statusColor[a.status] + "20", color: statusColor[a.status] }}>{a.status}</span>
                <Btn onClick={() => openEdit(a)} variant="ghost" style={{ padding: "4px 12px", fontSize: 12 }}>Edit</Btn>
                <Btn onClick={() => del(a.id)} variant="danger" style={{ padding: "4px 12px", fontSize: 12 }}>Delete</Btn>
              </div>
            </div>
          );
        })}
      </div>
      <CypherBox query={lastQuery || `MATCH (p:Patient)-[:HAS_APPOINTMENT]->(a:Appointment)-[:ATTENDED_BY]->(d:Doctor)\nRETURN p.firstName, p.lastName, a.appntDate,\n       a.appntTime, a.status, d.firstName, d.lastName\nORDER BY a.appntDate`} />
      {modal && (
        <Modal title={modal === "add" ? "Schedule Appointment" : "Edit Appointment"} onClose={() => setModal(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div><label style={labelStyle}>Patient</label>
              <select style={fieldStyle} value={form.patientId} onChange={e=>setForm(f=>({...f,patientId:e.target.value}))}>
                {patients.map(p=><option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>Doctor</label>
              <select style={fieldStyle} value={form.doctorId} onChange={e=>setForm(f=>({...f,doctorId:e.target.value}))}>
                {doctors.map(d=><option key={d.id} value={d.id}>Dr. {d.lastName} ({d.specialty})</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>Date</label><input type="date" style={fieldStyle} value={form.date||""} onChange={e=>setForm(f=>({...f,date:e.target.value}))} /></div>
            <div><label style={labelStyle}>Time</label><input type="time" style={fieldStyle} value={form.time||""} onChange={e=>setForm(f=>({...f,time:e.target.value}))} /></div>
            <div style={{ gridColumn:"span 2" }}><label style={labelStyle}>Status</label>
              <select style={fieldStyle} value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
                {["Scheduled","Completed","Cancelled"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, marginTop:20, justifyContent:"flex-end" }}>
            <Btn variant="ghost" onClick={()=>setModal(null)}>Cancel</Btn>
            <Btn onClick={save}>{modal==="add"?"Book Appointment":"Save Changes"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Medical Records ──────────────────────────────────────────────────────────
function Records({ records, setRecords, patients, doctors }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [lastQuery, setLastQuery] = useState('');

  const openAdd = () => {
    setForm({ visitDate:"", diagnosis:"", treatment:"", patientId: patients[0]?.id||"", doctorId: doctors[0]?.id||"" });
    setModal("add");
  };
  const openEdit = (r) => { setForm({ ...r }); setModal("edit"); };

  const save = () => {
    const pid = Number(form.patientId), did = Number(form.doctorId);
    if (modal === "add") {
      const newR = { ...form, id: Date.now(), patientId: pid, doctorId: did };
      setRecords(prev => [...prev, newR]);
      setLastQuery(`MATCH (p:Patient {patientId: ${pid}}), (d:Doctor {doctorId: ${did}})\nCREATE (r:MedicalRecord {\n  recordId: ${newR.id},\n  visitDate: date('${form.visitDate}'),\n  diagnosis: '${form.diagnosis}',\n  treatment: '${form.treatment}'\n})\nCREATE (p)-[:HAS_RECORD]->(r)\nCREATE (d)-[:DIAGNOSED_IN]->(r)\nRETURN r`);
    } else {
      setRecords(prev => prev.map(r => r.id === form.id ? { ...form, patientId: pid, doctorId: did } : r));
      setLastQuery(`MATCH (r:MedicalRecord {recordId: ${form.id}})\nSET r.visitDate = date('${form.visitDate}'),\n    r.diagnosis = '${form.diagnosis}',\n    r.treatment = '${form.treatment}'\nRETURN r`);
    }
    setModal(null);
  };

  const del = (id) => {
    if (!window.confirm("Delete this medical record?")) return;
    setRecords(prev => prev.filter(r => r.id !== id));
    setLastQuery(`MATCH (r:MedicalRecord {recordId: ${id}})\nDETACH DELETE r`);
  };

  return (
    <div>
      <SectionHeader title="Medical Records" onAdd={openAdd} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {records.map(r => {
          const p = patients.find(x => x.id === r.patientId);
          const d = doctors.find(x => x.id === r.doctorId);
          return (
            <div key={r.id} style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #E2E8F0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Record #{r.id} — {r.visitDate}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Btn onClick={() => openEdit(r)} variant="ghost" style={{ padding: "4px 10px", fontSize: 11 }}>Edit</Btn>
                  <Btn onClick={() => del(r.id)} variant="danger" style={{ padding: "4px 10px", fontSize: 11 }}>Delete</Btn>
                </div>
              </div>
              <div style={{ fontSize: 13, color: "#64748B", marginBottom: 6 }}>Patient: <strong>{p ? `${p.firstName} ${p.lastName}` : "—"}</strong> · Dr. {d ? `${d.firstName} ${d.lastName}` : "—"}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: "#F0FDF4", borderRadius: 8, padding: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#16A34A", marginBottom: 4 }}>DIAGNOSIS</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{r.diagnosis}</div>
                </div>
                <div style={{ background: "#EFF6FF", borderRadius: 8, padding: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#0369A1", marginBottom: 4 }}>TREATMENT</div>
                  <div style={{ fontSize: 14 }}>{r.treatment}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <CypherBox query={lastQuery || `MATCH (p:Patient)-[:HAS_RECORD]->(r:MedicalRecord)<-[:DIAGNOSED_IN]-(d:Doctor)\nRETURN p.firstName + ' ' + p.lastName AS patient,\n       r.visitDate, r.diagnosis, r.treatment,\n       d.firstName + ' ' + d.lastName AS doctor\nORDER BY r.visitDate DESC`} />
      {modal && (
        <Modal title={modal === "add" ? "Add Medical Record" : "Edit Medical Record"} onClose={() => setModal(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div><label style={labelStyle}>Patient</label>
              <select style={fieldStyle} value={form.patientId} onChange={e=>setForm(f=>({...f,patientId:+e.target.value}))}>
                {patients.map(p=><option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>Doctor</label>
              <select style={fieldStyle} value={form.doctorId} onChange={e=>setForm(f=>({...f,doctorId:+e.target.value}))}>
                {doctors.map(d=><option key={d.id} value={d.id}>Dr. {d.lastName} ({d.specialty})</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>Visit Date</label><input type="date" style={fieldStyle} value={form.visitDate||""} onChange={e=>setForm(f=>({...f,visitDate:e.target.value}))} /></div>
            <div style={{ gridColumn:"span 2" }}><label style={labelStyle}>Diagnosis</label><input type="text" style={fieldStyle} value={form.diagnosis||""} onChange={e=>setForm(f=>({...f,diagnosis:e.target.value}))} /></div>
            <div style={{ gridColumn:"span 2" }}><label style={labelStyle}>Treatment</label><input type="text" style={fieldStyle} value={form.treatment||""} onChange={e=>setForm(f=>({...f,treatment:e.target.value}))} /></div>
          </div>
          <div style={{ display:"flex", gap:10, marginTop:20, justifyContent:"flex-end" }}>
            <Btn variant="ghost" onClick={()=>setModal(null)}>Cancel</Btn>
            <Btn onClick={save}>{modal==="add"?"Add Record":"Save Changes"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Medicines ────────────────────────────────────────────────────────────────
function Medicines({ medicines, setMedicines }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [lastQuery, setLastQuery] = useState('');

  const openAdd = () => { setForm({ name:"", description:"", price:"", stock:"" }); setModal("add"); };
  const openEdit = (m) => { setForm({ ...m }); setModal("edit"); };

  const save = () => {
    if (modal === "add") {
      const newM = { ...form, id: Date.now(), price: parseFloat(form.price), stock: parseInt(form.stock) };
      setMedicines(prev => [...prev, newM]);
      setLastQuery(`CREATE (m:Medicine {\n  medicineId: ${newM.id},\n  medName: '${form.name}',\n  description: '${form.description}',\n  price: ${form.price},\n  stockQty: ${form.stock}\n})\nRETURN m`);
    } else {
      setMedicines(prev => prev.map(m => m.id === form.id ? { ...m, name: form.name, description: form.description, price: parseFloat(form.price), stock: parseInt(form.stock) } : m));
      setLastQuery(`MATCH (m:Medicine {medicineId: ${form.id}})\nSET m.medName = '${form.name}',\n    m.description = '${form.description}',\n    m.price = ${form.price},\n    m.stockQty = ${form.stock}\nRETURN m`);
    }
    setModal(null);
  };

  const del = (id, name) => {
    if (!window.confirm(`Delete medicine ${name}?`)) return;
    setMedicines(prev => prev.filter(m => m.id !== id));
    setLastQuery(`MATCH (m:Medicine {medicineId: ${id}})\nDETACH DELETE m`);
  };

  return (
    <div>
      <SectionHeader title="Medicine Inventory" onAdd={openAdd} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 16 }}>
        {medicines.map(m => (
          <div key={m.id} style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #E2E8F0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ fontSize: 24 }}>💊</div>
              <div style={{ display: "flex", gap: 6 }}>
                <Btn onClick={() => openEdit(m)} variant="ghost" style={{ padding: "4px 10px", fontSize: 11 }}>Edit</Btn>
                <Btn onClick={() => del(m.id, m.name)} variant="danger" style={{ padding: "4px 10px", fontSize: 11 }}>Delete</Btn>
              </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, color: DARK }}>{m.name}</div>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 4, minHeight: 36 }}>{m.description}</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600 }}>PRICE</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: TEAL }}>฿{m.price.toFixed(2)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600 }}>STOCK</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: m.stock < 100 ? "#DC2626" : "#16A34A" }}>{m.stock} units</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CypherBox query={lastQuery || `MATCH (m:Medicine)\nRETURN m.medName, m.description, m.price, m.stockQty\nORDER BY m.medName`} />
      {modal && (
        <Modal title={modal === "add" ? "Add Medicine" : "Edit Medicine"} onClose={() => setModal(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[["name","Medicine Name"],["description","Description"],["price","Price (฿)"],["stock","Stock Qty"]].map(([k,l])=>(
              <div key={k} style={k==="description"?{gridColumn:"span 2"}:{}}>
                <label style={labelStyle}>{l}</label>
                <input type={["price","stock"].includes(k)?"number":"text"} style={fieldStyle} value={form[k]||""} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} />
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, marginTop:20, justifyContent:"flex-end" }}>
            <Btn variant="ghost" onClick={()=>setModal(null)}>Cancel</Btn>
            <Btn onClick={save}>{modal==="add"?"Add Medicine":"Save Changes"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}


// ─── Main App ─────────────────────────────────────────────────────────────────
export default function ClinicApp() {
  const [page, setPage] = useState("dashboard");
  const [patients, setPatients] = useState(initPatients);
  const [doctors] = useState(initDoctors);
  const [appointments, setAppointments] = useState(initAppointments);
  const [medicines, setMedicines] = useState(initMedicines);
  const [records, setRecords] = useState(initRecords);

  const pageIcons = { dashboard:"⬛", patients:"👤", doctors:"🩺", appointments:"📅", records:"📋", medicines:"💊" };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#F1F5F9" }}>
      {/* Sidebar */}
      <div style={{ width: SIDEBAR_W, background: DARK, minHeight: "100vh", display: "flex", flexDirection: "column", padding: "24px 0", position: "sticky", top: 0, flexShrink: 0 }}>
        <div style={{ padding: "0 20px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: TEAL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏥</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 15, lineHeight: 1.2 }}>MediGraph</div>
              <div style={{ color: "#64748B", fontSize: 11 }}>Neo4j Clinic System</div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          {NAV.map(n => (
            <button key={n.key} onClick={() => setPage(n.key)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "11px 20px",
              background: page === n.key ? TEAL + "30" : "none", border: "none", cursor: "pointer",
              borderLeft: page === n.key ? `3px solid ${TEAL}` : "3px solid transparent",
              color: page === n.key ? "#fff" : "#94A3B8", fontWeight: page === n.key ? 700 : 500, fontSize: 14, transition: "all .15s"
            }}>
              <span style={{ fontSize: 14 }}>{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </div>
        <div style={{ padding: "16px 20px", borderTop: "1px solid #1E293B" }}>
          <div style={{ fontSize: 11, color: "#334155", fontWeight: 600, marginBottom: 8 }}>DATABASE</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E" }} />
            <span style={{ fontSize: 12, color: "#64748B" }}>Neo4j · localhost:7687</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "32px 36px", maxWidth: 1000 }}>
        {page === "dashboard" && <Dashboard patients={patients} doctors={doctors} appointments={appointments} medicines={medicines} records={records} />}
        {page === "patients" && <Patients patients={patients} setPatients={setPatients} />}
        {page === "doctors" && <Doctors doctors={doctors} />}
        {page === "appointments" && <Appointments appointments={appointments} setAppointments={setAppointments} patients={patients} doctors={doctors} />}
        {page === "records" && <Records records={records} setRecords={setRecords} patients={patients} doctors={doctors} />}
        {page === "medicines" && <Medicines medicines={medicines} setMedicines={setMedicines} />}
      </div>
    </div>
  );
}
