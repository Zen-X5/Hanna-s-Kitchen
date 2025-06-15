import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [menu, setMenu] = useState([]);
  const [filter, setFilter] = useState("Home");
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ customerName: "", phone: "", address: "" });
  const [toast, setToast] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/items")
      .then((res) => setMenu(res.data))
      .catch((err) => console.error("Failed to fetch menu:", err));
  }, []);

  const filteredMenu = menu.filter((item) => item.category === filter);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.itemId === item._id);
      if (existing) {
        return prev.map((i) =>
          i.itemId === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [
          ...prev,
          { itemId: item._id, name: item.name, price: item.price, quantity: 1 },
        ];
      }
    });
  };

  const incrementCartItem = (itemId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.itemId === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementCartItem = (itemId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.itemId === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        try {
          const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );
          const data = await response.json();
          if (data.status === "OK" && data.results && data.results[0]) {
            const address = data.results[0].formatted_address;
            setForm((f) => ({ ...f, address }));
          } else {
            alert("Could not fetch address from location.");
          }
        } catch (err) {
          alert("Failed to reverse geocode location.");
        }
        setLoadingLocation(false);
      },
      (error) => {
        alert("Failed to get your location.");
        setLoadingLocation(false);
      }
    );
  };

  const handleOrder = async () => {
    const totalAmount = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order = {
      items: cart.map((i) => ({ itemId: i.itemId, quantity: i.quantity })),
      totalAmount,
      ...form,
    };

    try {
      await axios.post("http://localhost:8080/api/orders", order);
      setToast("✅ Order placed successfully!");
      setTimeout(() => setToast(null), 3000);
      setCart([]);
      setShowModal(false);
      setFilter("Home");
      setForm({ customerName: "", phone: "", address: "" });
      setLocation({ lat: null, lng: null });
    } catch (err) {
      alert("Order failed!");
      console.error(err);
    }
  };

  const mapUrl =
    location.lat && location.lng
      ? `https://www.google.com/maps?q=${location.lat},${location.lng}&z=16&output=embed`
      : form.address
      ? `https://www.google.com/maps?q=${encodeURIComponent(form.address)}&z=16&output=embed`
      : null;

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f7f9f9",
      padding: "16px",
      position: "relative",
      fontFamily: "'Inter', sans-serif",
      color: "#333333",
    },
    header: {
      fontSize: "1.875rem",
      fontWeight: "700",
      textAlign: "center",
      color: "#7b9ea8",
      marginBottom: "16px",
    },
    buttonBase: {
      padding: "8px 16px",
      borderRadius: "9999px",
      cursor: "pointer",
      transition: "background-color 0.2s ease-in-out",
      border: "1px solid #a9c6ce",
      backgroundColor: "white",
      color: "#7b9ea8",
      fontWeight: "600",
      userSelect: "none",
    },
    buttonActive: {
      backgroundColor: "#ff8c42",
      color: "white",
      border: "none",
    },
    flexRow: {
      display: "flex",
      justifyContent: "center",
      gap: "16px",
      marginBottom: "24px",
      alignItems: "center",
    },
    buttonCart: {
      marginLeft: "auto",
      backgroundColor: "#ff8c42",
      color: "white",
      padding: "8px 16px",
      borderRadius: "9999px",
      cursor: "pointer",
      fontWeight: "600",
      border: "none",
      userSelect: "none",
    },
    cartContainer: {
      backgroundColor: "white",
      padding: "16px",
      borderRadius: "1rem",
      boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
      maxWidth: "400px",
      margin: "0 auto",
    },
    cartTitle: {
      fontSize: "1.25rem",
      fontWeight: "700",
      color: "#117a65",
      marginBottom: "8px",
    },
    cartItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #d1d5db",
      padding: "4px 0",
      gap: "8px",
    },
    totalText: {
      fontWeight: "600",
      marginBottom: "8px",
    },
    placeOrderBtn: {
      backgroundColor: "#ff8c42",
      color: "white",
      padding: "8px 16px",
      borderRadius: "9999px",
      cursor: "pointer",
      border: "none",
      fontWeight: "600",
      width: "100%",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "16px",
      maxWidth: "880px",
      margin: "0 auto",
      padding: "0 8px",
    },
    card: {
      backgroundColor: "white",
      padding: "16px",
      borderRadius: "1rem",
      boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    cardImage: {
      borderRadius: "1rem",
      width: "100%",
      height: "270px",
      objectFit: "cover",
      marginBottom: "8px",
    },
    cardTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#7b9ea8",
      marginBottom: "4px",
      textAlign: "center",
    },
    cardPrice: {
      color: "#4b5563",
      marginBottom: "8px",
    },
    addToCartBtn: {
      marginTop: "8px",
      backgroundColor: "#ff8c42",
      color: "white",
      padding: "8px 16px",
      borderRadius: "9999px",
      cursor: "pointer",
      border: "none",
      fontWeight: "600",
      width: "100%",
    },
    modalOverlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(4px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 50,
    },
    modalContent: {
      backgroundColor: "white",
      padding: "24px",
      borderRadius: "1rem",
      width: "90%",
      maxWidth: "400px",
      boxShadow: "0 20px 25px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
    },
    modalTitle: {
      fontSize: "1.25rem",
      fontWeight: "700",
      marginBottom: "16px",
      color: "#7b9ea8",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "8px",
      marginBottom: "12px",
      borderRadius: "0.375rem",
      border: "1px solid #cbd5e1",
      fontSize: "1rem",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      padding: "8px",
      marginBottom: "16px",
      borderRadius: "0.375rem",
      border: "1px solid #cbd5e1",
      fontSize: "1rem",
      boxSizing: "border-box",
      resize: "vertical",
      minHeight: "80px",
    },
    modalButtons: {
      display: "flex",
      justifyContent: "space-between",
    },
    cancelBtn: {
      padding: "8px 16px",
      backgroundColor: "#d9d9d9",
      borderRadius: "0.375rem",
      cursor: "pointer",
      border: "none",
      fontWeight: "600",
      flex: 1,
      marginRight: "8px",
    },
    confirmBtn: {
      padding: "8px 16px",
      backgroundColor: "#ff8c42",
      color: "white",
      borderRadius: "0.375rem",
      cursor: "pointer",
      border: "none",
      fontWeight: "600",
      flex: 1,
    },
    toast: {
      position: "fixed",
      bottom: "24px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#ff8c42",
      color: "white",
      padding: "8px 16px",
      borderRadius: "9999px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      zIndex: 50,
      fontWeight: "600",
    },
    qtyBtn: {
      background: "#e0e0e0",
      border: "none",
      borderRadius: "50%",
      width: "28px",
      height: "28px",
      fontWeight: "bold",
      fontSize: "18px",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
    },
    qtyBtnMinus: {
      color: "#ff8c42",
    },
    qtyBtnPlus: {
      color: "#16a34a",
    },
    mapContainer: {
      width: "100%",
      height: "220px",
      marginBottom: "12px",
      borderRadius: "1rem",
      overflow: "hidden",
      border: "1px solid #cbd5e1",
    },
    locationBtn: {
      marginBottom: "10px",
      backgroundColor: "#117a65",
      color: "white",
      border: "none",
      borderRadius: "0.375rem",
      padding: "8px 12px",
      fontWeight: "600",
      cursor: "pointer",
      width: "100%",
    },
    floatingCartButtonBig: {
      position: "fixed",
      bottom: 20,
      right: 20,
      width: 64,
      height: 64,
      fontSize: 32,
      borderRadius: "50%",
      backgroundColor: "#ff8c42",
      color: "white",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    // Container for large background image with watermark text
    homeImageContainer: {
  position: "relative",
  width: "100%",
  maxWidth: "900px",
  height: "400px",
  margin: "32px auto 0 auto",
  border: "4px solid #ff8c42",
  borderRadius: "1.5rem",
  overflow: "hidden",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
},
homeImage: {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  opacity: 0.6,  // Make image transparent
},
homeWatermarkText: {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#fff", // white for clear visibility
  fontSize: "1.2rem",
  fontWeight: "700",
  userSelect: "none",
  pointerEvents: "none",
  whiteSpace: "normal",
  textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
  textAlign: "center",
  width: "80%", // constrain width for better readability
  lineHeight: 1.4,
},
homeImageContainer: {
      position: "relative",
      width: "100%",
      maxWidth: "900px",
      height: "600px",
      margin: "32px auto 0 auto",
      border: "4px solid #ff8c42",
      borderRadius: "1.5rem",
      overflow: "hidden",
      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    },
    homeImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      opacity : 0.9,
    },
    homeWatermarkText: {
    position: "absolute",
    top: "20%",
    left: "10%",
    color: "#f74701", // white text
    fontSize: "xx-large",
    fontWeight: "large",
    userSelect: "none",
    pointerEvents: "none",
    whiteSpace: "normal",       // allow wrapping
    maxWidth: "80%",            // constrain width to 80% of container      
    textShadow: "2px 2px 6px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  };

  return (
    <div style={styles.container}>
       <div style={{ textAlign: "center", marginBottom: "16px" }}>
  <h1 style={styles.header}>🍽️ Hanna's Kitchen</h1>
      <p style={{ fontStyle: "italic", fontSize: "18px", margin: "4px 0" }}>
    “Where Every Bite Feels Like Home” 🏡
  </p>

  <p style={{ fontSize: "16px", color: "#555" }}>
  📞{" "}
  <a href="tel:8486107258" style={{ color: "#007BFF", textDecoration: "none" }}>
    8486107258
  </a>
  {" | "}
  <a href="tel:9954304446" style={{ color: "#007BFF", textDecoration: "none" }}>
  9954304446
  </a>
</p>
</div>

      <div style={styles.flexRow}>
        {["Home", "Veg", "Non-Veg", "Cake", "Cart"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              ...styles.buttonBase,
              ...(filter === tab ? styles.buttonActive : {}),
            }}
            type="button"
          >
            {tab === "Home"
              ? "🏠 Home"
              : tab === "Veg"
              ? "🥦 Veg"
              : tab === "Non-Veg"
              ? "🍗 Non-Veg"
              : tab === "Cake"
              ? "🍰 Cake"
              : `🛒 Cart (${cart.length})`}
          </button>
        ))}
      </div>

      {filter === "Home" ? (
        <>
    {/* Text content above the image */}
    <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#ff8c42" }}>
        Welcome to Hanna's Kitchen
      </h2>
    </div>

    {/* Large background image with watermark text */}
    <div style={styles.homeImageContainer}>
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
        alt="Hanna's Kitchen"
        style={styles.homeImage}
      />
      <div style={styles.homeWatermarkText}>
        <p style={{ fontSize: "1.3rem", marginBottom: "8px", color: "#fff" }}>
          Good food is not just about taste — it’s about health, happiness, and
          connection. At Hanna’s Kitchen, we believe in using fresh ingredients,
          balanced nutrition, and a love for cooking to serve you delicious dishes
          that make your day better.
        </p>
        <p style={{ fontSize: "1.3rem", color: "#fff" }}>
          🍽️ Whether you're craving rich cakes, wholesome vegetarian meals, or
          mouth-watering non-veg delights — we’ve got you covered. Click on the
          categories above to explore our menu!
        </p>
      </div>
    </div>
  </>
      ) : filter === "Cart" ? (
        <div style={styles.cartContainer}>
          <h2 style={styles.cartTitle}>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Cart is empty.</p>
          ) : (
            <>
              <ul style={{ marginBottom: "8px", paddingLeft: "0", listStyle: "none" }}>
                {cart.map((item, idx) => (
                  <li key={idx} style={styles.cartItem}>
                    <span style={{ flex: 1 }}>{item.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button
                        onClick={() => decrementCartItem(item.itemId)}
                        style={{ ...styles.qtyBtn, ...styles.qtyBtnMinus }}
                        type="button"
                      >
                        −
                      </button>
                      <span style={{ minWidth: "24px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementCartItem(item.itemId)}
                        style={{ ...styles.qtyBtn, ...styles.qtyBtnPlus }}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                    <span style={{ minWidth: "60px", textAlign: "right" }}>
                      ₹{item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
              <p style={styles.totalText}>
                Total: ₹{cart.reduce((sum, i) => sum + i.price * i.quantity, 0)}
              </p>
              <button
                onClick={() => setShowModal(true)}
                style={styles.placeOrderBtn}
                type="button"
              >
                Place Order
              </button>
            </>
          )}
        </div>
      ) : (
        <div style={styles.gridContainer}>
          {filteredMenu.map((item) => (
            <div key={item._id} style={styles.card}>
              {item.imageUrl && (
                <img
                  src={`http://localhost:8080${item.imageUrl}`}
                  alt={item.name}
                  style={styles.cardImage}
                />
              )}
              <h2 style={styles.cardTitle}>{item.name}</h2>
              <p style={styles.cardPrice}>₹ {item.price}</p>
              <button
                onClick={() => addToCart(item)}
                style={styles.addToCartBtn}
                type="button"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>📝 Enter Details</h2>
            <input
              style={styles.input}
              placeholder="Your Name"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              type="text"
            />
            <input
              style={styles.input}
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              type="tel"
            />
            <textarea
              style={styles.textarea}
              placeholder="Delivery Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <button
              style={styles.locationBtn}
              onClick={handleUseMyLocation}
              disabled={loadingLocation}
              type="button"
            >
              {loadingLocation ? "Getting your location..." : "📍 Use My Current Location"}
            </button>
            {mapUrl && (
              <div style={styles.mapContainer}>
                <iframe
                  title="Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={mapUrl}
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <div style={styles.modalButtons}>
              <button
                onClick={() => setShowModal(false)}
                style={styles.cancelBtn}
                type="button"
              >
                Cancel
              </button>
              <button onClick={handleOrder} style={styles.confirmBtn} type="button">
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={styles.toast}>{toast}</div>}

      {/* Big floating cart button at bottom-right */}
      {cart.length > 0 && filter !== "Cart" && (
        <button
          onClick={() => setFilter("Cart")}
          style={styles.floatingCartButtonBig}
          type="button"
          aria-label="Open Cart"
          title="Open Cart"
        >
          🛒
        </button>
      )}
    </div>
  );
}

export default App;
