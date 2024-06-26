import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useState,
} from "react";
import { Product } from "../../interfaces/interface";

// Define item and cart state types
interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

// Define actions
type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "INCREASE_QUANTITY"; payload: { id: number } }
  | { type: "DECREASE_QUANTITY"; payload: { id: number } }
  | { type: "REMOVE_FROM_CART"; payload: { id: number } }
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "CLEAR_CART" };

// Create initial state
const initialState: CartState = {
  items: [],
};

// Create context
const CartContext = createContext<{
  state: CartState;
  addToCart: (item: CartItem) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => number;
  quantities: number;
  product: Product;
  setProduct: (product: Product) => void;
  clearCart: () => void;
}>({
  state: initialState,
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeFromCart: () => {},
  getTotalPrice: () => 0,
  quantities: 0,
  product: {} as any,
  setProduct: () => {},
  clearCart: () => {},
});

// Reducer function to handle cart actions
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "SET_CART":
      return {
        ...state,
        items: action.payload,
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

// Provider component
const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [product, setProduct] = useState<Product>({} as any);

  // Load cart from local storage on initialization
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch({ type: "SET_CART", payload: JSON.parse(storedCart) });
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const increaseQuantity = (id: number) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id } });
  };

  const decreaseQuantity = (id: number) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id } });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getTotalPrice = () => {
    return state.items.reduce(
      (total, item) => total + 100 + item.price * item.quantity,
      0
    );
  };

  const quantities = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        state,
        quantities,
        product,
        setProduct,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
