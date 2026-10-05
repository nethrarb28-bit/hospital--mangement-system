import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import { AppointmentProvider, useAppointmentContext } from "./Component/AppointmentContext";
import Navbar from "./Component/NavBar";
import Home from "./Component/Home";
import DoctorList from "./Component/DoctorList";
import DoctorProfile from "./Component/DoctorProfile";
import AppointmentBooking from "./Component/AppointmentBooking";
import AppointmentHistory from "./Component/AppointmentHistory";
import PatientProfile from "./Component/PatientProfile";
import Footer from "./Component/Footer"; 
function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const targetDoctorId = location.state?.doctorId;
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    localStorage.setItem("mediPulse_user", JSON.stringify(formData));
    alert("Account created successfully! Please log in.");
    navigate("/login", { state: { doctorId: targetDoctorId } });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#fff" }}>
      <h2>Create Patient Account</h2>
      {error && <p style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#008080", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
          Register Account
        </button>
      </form>
      <p style={{ fontSize: "0.85rem", marginTop: "15px", textAlign: "center" }}>
        Already have an account? <Link to="/login" state={{ doctorId: targetDoctorId }} style={{ color: "#008080" }}>Login here</Link>
      </p>
    </div>
  );
}

// --- LOGIN COMPONENT ---
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const targetDoctorId = location.state?.doctorId;

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("mediPulse_user"));

    if (!savedUser) {
      setError("No account found. Please register first!");
      return;
    }

    if (savedUser.username === credentials.username && savedUser.password === credentials.password) {
      localStorage.setItem("mediPulse_isLoggedIn", "true");
      alert("Login successful!");

      if (targetDoctorId) {
        navigate("/book-appointment", { state: { doctorId: targetDoctorId } });
      } else {
        navigate("/patient");
      }
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#fff" }}>
      <h2>Patient Login</h2>
      {targetDoctorId && (
        <p style={{ backgroundColor: "#e6f2f2", color: "#008080", padding: "8px", borderRadius: "4px", fontSize: "0.85rem" }}>
          Please log in to proceed with your doctor appointment booking.
        </p>
      )}
      {error && <p style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#008080", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
          Login to Continue
        </button>
      </form>
      <p style={{ fontSize: "0.85rem", marginTop: "15px", textAlign: "center" }}>
        Don't have an account? <Link to="/register" state={{ doctorId: targetDoctorId }} style={{ color: "#008080" }}>Create one here</Link>
      </p>
    </div>
  );
}

// --- NESTED DASHBOARD TABS ---
function PatientAppointmentsTab() {
  const { appointments = [] } = useAppointmentContext();
  return (
    <div>
      <h3>All Patient Appointments</h3>
      <p>Total Records: {appointments.length}</p>
    </div>
  );
}

function PatientUpcomingTab() {
  const { appointments = [] } = useAppointmentContext();
  const upcoming = appointments.filter((a) => a.status === "Confirmed");
  return (
    <div>
      <h3>Upcoming Appointments</h3>
      {upcoming.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <ul>
          {upcoming.map((u) => (
            <li key={u.id}>{u.doctorName} on {u.date} at {u.slot}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PatientHistoryTab() {
  const { appointments = [] } = useAppointmentContext();
  return (
    <div>
      <h3>Appointment History</h3>
      {appointments.map((a) => (
        <p key={a.id}>{a.date} - {a.doctorName} ({a.status})</p>
      ))}
    </div>
  );
}

function PatientOverviewTab() {
  const user = JSON.parse(localStorage.getItem("mediPulse_user")) || { username: "Guest", email: "N/A" };
  return (
    <div>
      <h3>Patient Profile Overview</h3>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default function App() {
  return (
    <AppointmentProvider>
      <BrowserRouter>
        <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f6f8", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Navbar />
          <div style={{ maxWidth: "1000px", margin: "0 auto", width: "100%", flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<DoctorList />} />
              <Route path="/doctor/:id" element={<DoctorProfile />} />
              <Route path="/appointments" element={<AppointmentHistory />} />
              <Route path="/book-appointment" element={<AppointmentBooking />} />
              <Route path="/appointment/:id" element={<AppointmentHistory />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/patient" element={<PatientProfile />}>
                <Route index element={<Navigate to="appointments" replace />} />
                <Route path="appointments" element={<PatientAppointmentsTab />} />
                <Route path="upcoming" element={<PatientUpcomingTab />} />
                <Route path="history" element={<PatientHistoryTab />} />
                <Route path="profile" element={<PatientOverviewTab />} />
              </Route>
            </Routes>
          </div>
          {/* 2. Render Footer component here */}
          <Footer />
        </div>
      </BrowserRouter>
    </AppointmentProvider>
  );
}