import { useState, useCallback } from "react";

// ── Hook ───────────────────────────────────────────────────
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return { toasts, showToast };
};

// ── Component ──────────────────────────────────────────────
const Toast = ({ toasts }) => {
  if (!toasts.length) return null;

  return (
    <div className="toast-container-custom">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-custom ${toast.type}`}>
          {toast.type === "success" && "✅ "}
          {toast.type === "error"   && "❌ "}
          {toast.type === "info"    && "ℹ️ "}
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;