import { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Cake",
    tags: "",
  });
  const [image, setImage] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const res = await axios.get("https://hanna-s-kitchen-backend.onrender.com/api/orders");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  const handleAddItem = async () => {
    if (!form.name || !form.price) {
      alert("Please provide item name and price.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("tags", form.tags);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("https://hanna-s-kitchen-backend.onrender.com/api/items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Item added!");
      setForm({
        name: "",
        price: "",
        category: "Cake",
        tags: "",
      });
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add item.");
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  // Inline styles
  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#fff0f6", // pink-50
      padding: "24px",
      fontFamily: "'Inter', sans-serif", 
      color: "#374151", // gray-800
      boxSizing: "border-box",
    },
    header: {
      fontSize: "2rem",
      fontWeight: "800",
      textAlign: "center",
      color: "#be185d", // pink-700
      marginBottom: "32px",
      userSelect: "none",
    },
    section: {
      backgroundColor: "white",
      borderRadius: "1rem",
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      padding: "24px",
      maxWidth: "900px",
      margin: "0 auto 40px auto",
      boxSizing: "border-box",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      marginBottom: "24px",
      color: "#be185d",
      userSelect: "none",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "16px",
      borderRadius: "0.5rem",
      border: "1px solid #d1d5db", // gray-300
      fontSize: "1rem",
      boxSizing: "border-box",
      outlineColor: "#f43f5e", // pink-500
      transition: "outline-color 0.2s ease-in-out",
    },
    select: {
      width: "100%",
      padding: "12px",
      marginBottom: "16px",
      borderRadius: "0.5rem",
      border: "1px solid #d1d5db",
      fontSize: "1rem",
      boxSizing: "border-box",
      outlineColor: "#f43f5e",
      transition: "outline-color 0.2s ease-in-out",
      backgroundColor: "white",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      cursor: "pointer",
    },
    fileInput: {
      width: "100%",
      padding: "10px 12px",
      marginBottom: "24px",
      borderRadius: "0.5rem",
      border: "1px solid #d1d5db",
      fontSize: "1rem",
      boxSizing: "border-box",
      cursor: "pointer",
    },
    button: {
      width: "100%",
      backgroundColor: "#16a34a", // green-600
      color: "white",
      fontWeight: "700",
      fontSize: "1.1rem",
      padding: "14px",
      borderRadius: "0.75rem",
      border: "none",
      cursor: "pointer",
      userSelect: "none",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#15803d", // green-700
    },
    ordersContainer: {
      maxHeight: "600px",
      overflowY: "auto",
      paddingRight: "8px",
    },
    orderCard: {
      border: "1px solid #fbcfe8", // pink-200
      borderRadius: "1rem",
      padding: "20px",
      marginBottom: "24px",
      boxShadow: "0 4px 12px rgba(251, 207, 232, 0.3)",
      transition: "box-shadow 0.3s ease",
      userSelect: "none",
    },
    orderCardHover: {
      boxShadow: "0 8px 24px rgba(251, 207, 232, 0.5)",
    },
    orderHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
    },
    orderNumber: {
      fontWeight: "700",
      fontSize: "1.2rem",
      color: "#be185d",
    },
    orderDate: {
      fontSize: "0.875rem",
      color: "#6b7280", // gray-500
      fontStyle: "italic",
    },
    orderInfo: {
      marginBottom: "16px",
      lineHeight: "1.5",
      fontSize: "1rem",
      color: "#374151",
    },
    orderTotal: {
      fontWeight: "700",
      color: "#be185d",
      marginTop: "8px",
      fontSize: "1.1rem",
    },
    orderItemsList: {
      listStyleType: "disc",
      paddingLeft: "20px",
      marginTop: "8px",
      color: "#4b5563", // gray-600
      fontSize: "0.95rem",
      maxWidth: "400px",
    },
    noOrdersText: {
      textAlign: "center",
      color: "#6b7280",
      fontSize: "1rem",
      fontStyle: "italic",
      userSelect: "none",
    },
  };

  // Hover effect for order cards (optional)
  const [hoveredOrder, setHoveredOrder] = useState(null);

  return (
    <div style={styles.page}>
      <h1 style={styles.header}>👩‍🍳 Admin Panel – Hanna's Kitchen</h1>

      {/* Add New Item Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Add New Menu Item</h2>

        <input
          style={styles.input}
          placeholder="Item name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          type="text"
        />
        <input
          style={styles.input}
          placeholder="Price"
          type="number"
          min="0"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <select
          style={styles.select}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="Cake">Cake</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
        <input
          style={styles.input}
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          type="text"
        />
        <input
          type="file"
          accept="image/*"
          style={styles.fileInput}
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          style={styles.button}
          onClick={handleAddItem}
          type="button"
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#15803d")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#16a34a")}
        >
          ➕ Add Item
        </button>
      </section>

      {/* Orders Section */}
      <section style={styles.section}>
        <h2 style={{ ...styles.sectionTitle, marginBottom: "32px" }}>
          📦 Recent Orders ({orders.length})
        </h2>

        {loadingOrders ? (
          <p style={styles.noOrdersText}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p style={styles.noOrdersText}>No orders yet.</p>
        ) : (
          <div style={styles.ordersContainer}>
            {orders
              .slice()
              .sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt))
              .map((order, idx) => {
                const isHovered = hoveredOrder === order._id;
                return (
                  <div
                    key={order._id || idx}
                    style={{
                      ...styles.orderCard,
                      ...(isHovered ? styles.orderCardHover : {}),
                    }}
                    onMouseEnter={() => setHoveredOrder(order._id)}
                    onMouseLeave={() => setHoveredOrder(null)}
                  >
                    <div style={styles.orderHeader}>
                      <h3 style={styles.orderNumber}>Order #{orders.length - idx}</h3>
                      <time
                        style={styles.orderDate}
                        dateTime={order.placedAt}
                        title={new Date(order.placedAt).toLocaleString()}
                      >
                        {formatDate(order.placedAt)}
                      </time>
                    </div>

                    <div style={styles.orderInfo}>
                      <p>
                        <strong>Name:</strong> {order.customerName}
                      </p>
                      <p>
                        <strong>Phone:</strong> {order.phone}
                      </p>
                      <p>
                        <strong>Address:</strong> {order.address}
                      </p>
                      <p style={styles.orderTotal}>Total: ₹{order.totalAmount}</p>
                    </div>

                    <div>
                      <strong>Items:</strong>
                      <ul style={styles.orderItemsList}>
                        {order.items.map((i, id) => (
                          <li key={id}>
                            {(i.itemId && i.itemId.name) ? i.itemId.name : "Unknown Item"} × {i.quantity}
                          </li>
                        ))}
                      </ul>

                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminPanel;
