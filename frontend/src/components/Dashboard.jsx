import { useEffect, useState } from "react";
import API from "../api/axios";
import "../clean.css";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import useUI from "../components/useUI";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const { loading, setLoading, error, setError } = useUI();
  const [form, setForm] = useState({ title: "", description: "", status: "active" });
  const [editId, setEditId] = useState(null);

  const username =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user") ||
    "User";

  const load = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  useEffect(() => { load(); }, []);

  const saveItem = async () => {
    if (!form.title.trim()) return;

    if (editId) {
      await API.put(`/items/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/items", form);
    }

    setForm({ title: "", description: "", status: "active" });
    load();
  };

  const deleteItem = async (id) => {
    if (window.confirm("Delete this task?")) {
      await API.delete(`/items/${id}`);
      load();
    }
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setForm(item);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/mern-application/#/login";
  };

  const stats = {
    total: items.length,
    active: items.filter(i => i.status === "active").length,
    pending: items.filter(i => i.status === "pending").length,
    completed: items.filter(i => i.status === "completed").length,
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>👋 Welcome back, {username}</h2>
          <p style={styles.subtitle}>Here’s what’s happening today</p>
        </div>

        <button style={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <Stat title="Total Tasks" value={stats.total} color="#6366f1" />
        <Stat title="Active" value={stats.active} color="#22c55e" />
        <Stat title="Pending" value={stats.pending} color="#f59e0b" />
        <Stat title="Completed" value={stats.completed} color="#3b82f6" />
      </div>

      {/* FORM */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>
          {editId ? "✏ Edit Task" : "➕ Add New Task"}
        </h3>

        <div style={styles.formRow}>
          <input
            style={styles.input}
            placeholder="Task title..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            style={styles.input}
            placeholder="Description..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <select
            style={styles.input}
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button style={styles.primary} onClick={saveItem}>
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* TASK LIST */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>📋 Your Tasks</h3>

        {items.length === 0 ? (
          <p style={{ color: "#888" }}>No tasks yet</p>
        ) : (
          <div style={styles.grid}>
            {items.map(item => (
              <div key={item.id} style={styles.taskCard}>
                <div style={styles.taskTop}>
                  <h4>{item.title}</h4>
                  <span style={styles.badge(item.status)}>
                    {item.status}
                  </span>
                </div>

                <p style={styles.desc}>{item.description}</p>

                <div style={styles.actions}>
                  <button style={styles.edit} onClick={() => startEdit(item)}>Edit</button>
                  <button style={styles.delete} onClick={() => deleteItem(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

/* COMPONENT */
const Stat = ({ title, value, color }) => (
  <div style={{ ...styles.stat, borderTop: `3px solid ${color}` }}>
    <h2 style={{ color }}>{value}</h2>
    <p>{title}</p>
  </div>
);

/* STYLES */
const styles = {
  page: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "30px",
    fontFamily: "Inter, sans-serif",
    background: "#f9fafb",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  title: {
    fontSize: "24px",
    fontWeight: "600",
  },

  subtitle: {
    color: "#777",
    fontSize: "14px",
  },

  logout: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "15px",
    marginBottom: "25px",
  },

  stat: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    textAlign: "center",
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
  },

  cardTitle: {
    marginBottom: "15px",
    fontSize: "18px",
  },

  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr auto",
    gap: "10px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
  },

  primary: {
    background: "linear-gradient(135deg,#6366f1,#4f46e5)",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
    gap: "15px",
  },

  taskCard: {
    padding: "18px",
    borderRadius: "12px",
    background: "#f9fafb",
    border: "1px solid #eee",
    transition: "0.2s",
  },

  taskTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },

  desc: {
    fontSize: "14px",
    color: "#555",
  },

  badge: (status) => ({
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    background:
      status === "active"
        ? "#dcfce7"
        : status === "pending"
        ? "#fef3c7"
        : "#dbeafe",
  }),

  actions: {
    marginTop: "12px",
    display: "flex",
    gap: "10px",
  },

  edit: {
    background: "#e0e7ff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  delete: {
    background: "#fee2e2",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};