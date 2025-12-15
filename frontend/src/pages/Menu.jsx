import { useState } from 'react';
import { motion } from 'framer-motion';
import { pizzas } from '../data/pizzas';
import { useCart } from '../context/CartContext';
import '../styles/menu.css';

const Menu = () => {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState([]);
  const [toast, setToast] = useState(null);

  const categories = ['All', ...new Set(pizzas.map((p) => p.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPizzas =
    activeCategory === 'All'
      ? pizzas
      : pizzas.filter((p) => p.category === activeCategory);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToCart = (pizza) => {
    addToCart({
      id: pizza.id,
      name: pizza.name,
      price: pizza.price,
      image: pizza.image,
    });

    setAddedItems((prev) => [...prev, pizza.id]);

    // ✅ FIXED TOAST MESSAGE
    showToast(`₹ ${pizza.name} added to cart!`);

    setTimeout(() => {
      setAddedItems((prev) => prev.filter((id) => id !== pizza.id));
    }, 1500);
  };

  return (
    <div className="menu-page">
      <div className="menu-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="menu-header"
        >
          <h1 className="menu-title">
            Our <span className="menu-title-gradient">Menu</span>
          </h1>
          <p className="menu-subtitle">
            Choose from our handcrafted selection of authentic Italian pizzas
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="menu-categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-btn ${
                activeCategory === category ? 'active' : ''
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Pizza Grid */}
        <div className="pizza-grid">
          {filteredPizzas.map((pizza, index) => (
            <motion.div
              key={pizza.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="pizza-card"
            >
              {/* Image */}
              <div className="pizza-image-container">
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="pizza-image"
                />
                <div className="pizza-image-overlay" />
                <span className="pizza-category">{pizza.category}</span>
              </div>

              {/* Content */}
              <div className="pizza-content">
                <h3 className="pizza-name">{pizza.name}</h3>
                <p className="pizza-description">{pizza.description}</p>

                <div className="pizza-footer">
                  {/* ✅ RUPEE SYMBOL FIX */}
                  <span className="pizza-price">
                    ₹{pizza.price.toFixed(2)}
                  </span>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(pizza);
                    }}
                    className={`add-to-cart-btn ${
                      addedItems.includes(pizza.id) ? 'added' : ''
                    }`}
                  >
                    {addedItems.includes(pizza.id) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Menu;
