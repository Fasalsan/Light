import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Card from "../components/Card";
import data from "../api/Product";
import Top from "./Top";

export default function ProductList() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract category from URL
  const query = new URLSearchParams(location.search);
  const initialCategory = query.get("category") || "ទាំងអស់";

  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // Extract unique categories
  const categories = ["ទាំងអស់", ...new Set(data.map((p) => p.category))];

  // Filter products by active category
  const filteredProducts =
    activeCategory === "ទាំងអស់"
      ? data
      : data.filter((p) => p.category === activeCategory);

  // Button visibility state
  const [showButton, setShowButton] = useState(false);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    navigate(`/?category=${encodeURIComponent(cat)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [activeCategory]);

  // Scroll event to show button when user scrolls down more than 100px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initially

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Top />

      {/* Sticky Tabs */}
      <div className="sticky top-0 z-20 bg-gray-100 py-4 px-2 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-serif font-bold mb-4 text-gray-800">
            ប្រភេទពិលទាំងអស់
          </h1>

          <button
            onClick={() => alert("hello")}
            className={`bg-red-800 p-4 rounded text-white transition-opacity duration-300 ${showButton
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
              }`}
          >
            language
          </button>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-3 rounded-full text-sm font-medium border ${activeCategory === cat
                ? "bg-red-900 text-white"
                : "bg-white text-gray-700 hover:bg-red-50"
                }`}
            >
              {cat}
            </button>
          ))}
          {/* Testing button */}

        </div>


      </div>

      {/* Product Cards */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Card
                image={product.image}
                name={product.name}
                price={product.price}
                onView={() =>
                  navigate(`/product/${product.id}`, {
                    state: {
                      ...product,
                      fromCategory: activeCategory,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
