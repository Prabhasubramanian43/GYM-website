import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest, getSessionId } from "../api.js";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fitfuelCart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("fitfuelCart", JSON.stringify(cart));
    apiRequest(`/cart/${getSessionId()}`, {
      method: "PUT",
      body: JSON.stringify({ items: cart }),
    }).catch((error) =>
      console.warn(
        "Cart sync pending (backend may be offline):",
        error.message,
      ),
    );
  }, [cart]);

  useEffect(() => {
    apiRequest(`/cart/${getSessionId()}`)
      .then((serverCart) => {
        if (Array.isArray(serverCart.items) && serverCart.items.length) {
          setCart(serverCart.items);
          localStorage.setItem("fitfuelCart", JSON.stringify(serverCart.items));
        }
      })
      .catch((error) =>
        console.warn("Could not load server cart:", error.message),
      );
  }, []);

  // Add a normal food item to the cart.
  function addToCart(food, customization = "Regular") {
    const key = `${food.id}-${customization}`;

    setCart((current) => {
      const found = current.find((item) => item.key === key);

      return found
        ? current.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [
            ...current,
            {
              ...food,
              key,
              customization,
              quantity: 1,
              isCombo: false,
            },
          ];
    });
  }

  // Add all selected foods as one combo item.
  function addComboToCart(selectedFoods) {
    if (!selectedFoods || selectedFoods.length === 0) {
      return;
    }

    const comboPrice = selectedFoods.reduce(
      (total, food) => total + Number(food.price || 0),
      0,
    );

    const comboKey = `combo-${Date.now()}`;

    const comboItem = {
      id: comboKey,
      key: comboKey,
      name: "My Custom Combo",
      customization: "Custom Food Combo",
      image: selectedFoods[0].image,
      price: comboPrice,
      quantity: 1,
      isCombo: true,
      items: selectedFoods.map((food) => ({
        id: food.id,
        name: food.name,
        price: Number(food.price || 0),
        image: food.image,
      })),
    };

    setCart((current) => [...current, comboItem]);
  }

  // Update item quantity.
  function updateQuantity(key, quantity) {
    setCart((current) =>
      quantity < 1
        ? current.filter((item) => item.key !== key)
        : current.map((item) =>
            item.key === key ? { ...item, quantity } : item,
          ),
    );
  }

  // Remove item from cart.
  function removeFromCart(key) {
    setCart((current) => current.filter((item) => item.key !== key));
  }

  // Clear cart.
  function clearCart() {
    setCart([]);
  }

  // Total number of cart items.
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total cart price.
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        count,
        total,
        addToCart,
        addComboToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
