"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

// Cart state for the "after" page. No backend — items live in React context
// and are persisted to localStorage (best effort, never throws).

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

export type NewCartItem = Omit<CartItem, "qty">;

type CartContextValue = {
  items: CartItem[];
  addItem: (item: NewCartItem) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, qty: number) => void;
  count: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "urban-threads-after-cart-v1";

export function formatMoney(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const skipPersist = useRef(true);

  // Hydrate from localStorage once, after mount (avoids SSR mismatch).
  // Applied in a rAF callback so state only updates asynchronously.
  useEffect(() => {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Unavailable storage (private mode) — start with an empty cart.
      return;
    }
    if (!raw) return;
    const frame = requestAnimationFrame(() => {
      try {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter(
              (item): item is CartItem =>
                typeof item === "object" &&
                item !== null &&
                typeof (item as CartItem).id === "string" &&
                typeof (item as CartItem).name === "string" &&
                typeof (item as CartItem).price === "number" &&
                typeof (item as CartItem).qty === "number",
            ),
          );
        }
      } catch {
        // Corrupt data — start with an empty cart.
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Persist changes after the initial hydration.
  useEffect(() => {
    if (skipPersist.current) {
      skipPersist.current = false;
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore write failures — the cart still works in memory.
    }
  }, [items]);

  const addItem = useCallback((item: NewCartItem) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry,
        );
      }
      return [...current, { ...item, qty: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((entry) => entry.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, qty: number) => {
    setItems((current) =>
      qty <= 0
        ? current.filter((entry) => entry.id !== id)
        : current.map((entry) =>
            entry.id === id ? { ...entry, qty: Math.min(qty, 99) } : entry,
          ),
    );
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = Math.round(items.reduce((sum, item) => sum + item.price * item.qty, 0) * 100) / 100;

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    setQuantity,
    count,
    subtotal,
    isCartOpen,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
