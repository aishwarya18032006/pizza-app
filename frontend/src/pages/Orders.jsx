import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/orders.css";

const API_BASE = "https://pizza-app-mbty.onrender.com";

const Orders = () => {
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchOrders = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(`${API_BASE}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data || []);
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to fetch orders",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE ORDER
  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`${API_BASE}/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders((prev) => prev.filter((o) => o._id !== orderId));
      showToast("Order deleted successfully");
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to delete order",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated, token]);

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  if (!isAuthenticated) return null;

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="empty-orders">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="empty-orders-content"
        >
          <h2>No orders yet</h2>
          <p>You haven't placed any orders yet</p>
          <Link to="/menu" className="browse-menu-link">
            Browse Menu →
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="orders-header"
        >
          <h1>Your Orders</h1>
          <button onClick={fetchOrders} className="refresh-btn">
            Refresh
          </button>
        </motion.div>

        <div className="orders-list">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="order-card"
            >
              <div className="order-header">
                <div>
                  <p className="order-id">
                    #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <p className="order-date">
                    {formatDate(order.createdAt)}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span className="order-status">
                    {order.status || "Completed"}
                  </span>

                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    title="Delete order"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    🗑
                  </button>
                </div>
              </div>

              {/* ✅ ITEM PRICE REMOVED – NO NaN */}
              <div className="order-items">
                {order.items.map((item, i) => (
                  <div key={i} className="order-item">
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <strong>Total</strong>
                <strong>₹{order.total.toFixed(2)}</strong>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
};

export default Orders;
