import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useState } from "react";
import "../styles/cart.css";

const API_BASE = "http://127.0.0.1:5000";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } =
    useCart();
  const { isAuthenticated, token, user } = useAuth(); // ✅ user already here
  const navigate = useNavigate();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      showToast("Please login to place an order", "error");
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }

    setIsPlacingOrder(true);

    try {
      await axios.post(
        `${API_BASE}/api/orders`,
        {
          items: items.map((item) => ({
            pizzaId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total: totalPrice,

          // 🔥🔥🔥 ONLY NEW LINE (STEP 5 FIX)
          email: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearCart();
      navigate("/order-success");
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to place order",
        "error"
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  /* EMPTY CART */
  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="empty-cart-content"
        >
          <h2 className="empty-cart-title">Your cart is empty</h2>
          <p className="empty-cart-text">
            Looks like you haven't added any pizzas yet
          </p>
          <Link to="/menu" className="browse-menu-btn">
            Browse Menu →
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cart-header"
        >
          <h1 className="cart-title">
            Your <span className="cart-title-gradient">Cart</span>
          </h1>
          <p className="cart-count">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        <div className="cart-layout">
          {/* CART ITEMS */}
          <div className="cart-items">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="cart-item"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />

                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">
                      ₹{item.price.toFixed(2)}
                    </p>

                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="quantity-value">
                        {item.quantity}
                      </span>
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ✕
                    </button>
                    <span className="cart-item-total">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ORDER SUMMARY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="order-summary"
          >
            <div className="order-summary-card">
              <h2 className="order-summary-title">Order Summary</h2>

              <div className="order-summary-row">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <div className="order-summary-row free">
                <span>Delivery</span>
                <span>Free</span>
              </div>

              <hr className="order-summary-divider" />

              <div className="order-summary-total">
                <span>Total</span>
                <span className="order-summary-total-price">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="place-order-btn"
              >
                {isPlacingOrder ? "Placing..." : "Place Order"}
              </button>

              {!isAuthenticated && (
                <p className="login-prompt">
                  Please <Link to="/login">login</Link> to place order
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
};

export default Cart;
