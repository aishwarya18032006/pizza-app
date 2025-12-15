import margherita from "../assets/margherita.jpg";
import pepperoni from "../assets/pepperoni.jpg";
import bbq from "../assets/bbq.jpg";
import hawaiian from "../assets/hawaiian.jpg";
import fourcheese from "../assets/fourcheese.jpg";
import veggie from "../assets/veggie.jpg";
import fries from "../assets/fries.jpg";
import burger from "../assets/burger.jpg";
import sandwich from "../assets/sandwich.jpg";
import shawarma from "../assets/shawarma.jpg";
import momos from "../assets/momos.jpg";
import panipuri from "../assets/panipuri.jpg";
import mojito from "../assets/mojito.jpg";
import coke from "../assets/coke.jpg";
import sevenup from "../assets/7up.jpg";

export const pizzas = [
  {
    id: 1,
    name: "Margherita",
    description: "Fresh tomatoes, mozzarella, basil, and olive oil",
    price: 499,
    image: margherita,
    category: "Pizza",
  },
  {
    id: 2,
    name: "Pepperoni",
    description: "Spicy pepperoni with mozzarella and tomato sauce",
    price: 549,
    image: pepperoni,
    category: "Pizza",
  },
  {
    id: 3,
    name: "BBQ Chicken",
    description: "BBQ chicken, onions, and mozzarella",
    price: 599,
    image: bbq,
    category: "Pizza",
  },
  {
    id: 4,
    name: "Hawaiian",
    description: "Pineapple, cheese, and classic tomato base",
    price: 529,
    image: hawaiian,
    category: "Pizza",
  },
  {
    id: 5,
    name: "Four Cheese",
    description: "Mozzarella, parmesan, cheddar, and cream cheese",
    price: 579,
    image: fourcheese,
    category: "Pizza",
  },
  {
    id: 6,
    name: "Veggie Pizza",
    description: "Capsicum, onion, olives, and mushrooms",
    price: 499,
    image: veggie,
    category: "Pizza",
  },

  // 🔥 SIDES
  {
    id: 7,
    name: "French Fries",
    description: "Crispy salted french fries",
    price: 199,
    image: fries,
    category: "Sides",
  },
  {
    id: 8,
    name: "Burger",
    description: "Cheesy veg burger with special sauce",
    price: 249,
    image: burger,
    category: "Sides",
  },
  {
    id: 9,
    name: "Sandwich",
    description: "Grilled sandwich with veggies and cheese",
    price: 229,
    image: sandwich,
    category: "Sides",
  },
  {
    id: 10,
    name: "Shawarma",
    description: "Loaded shawarma roll with sauces",
    price: 279,
    image: shawarma,
    category: "Sides",
  },
  {
    id: 11,
    name: "Momos",
    description: "Steamed veg momos with chutney",
    price: 199,
    image: momos,
    category: "Sides",
  },
  {
    id: 12,
    name: "Pani Puri",
    description: "Crispy puris with spicy water",
    price: 149,
    image: panipuri,
    category: "Sides",
  },

  // 🥤 DRINKS
  {
    id: 13,
    name: "Mojito",
    description: "Fresh mint lime mojito",
    price: 129,
    image: mojito,
    category: "Drinks",
  },
  {
    id: 14,
    name: "Coca Cola",
    description: "Chilled coke",
    price: 99,
    image: coke,
    category: "Drinks",
  },
  {
    id: 15,
    name: "7 Up",
    description: "Refreshing lemon drink",
    price: 99,
    image: sevenup,
    category: "Drinks",
  },
];
