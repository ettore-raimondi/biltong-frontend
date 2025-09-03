// src/context/ToastContext.tsx
import { createContext, useContext, useRef, type ReactNode } from "react";
import { Toast } from "primereact/toast";

type ToastContextType = {
  show: (
    severity: "success" | "error" | "warn" | "info",
    summary: string,
    detail?: string
  ) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const toastRef = useRef<Toast>(null);

  const show = (
    severity: "success" | "error" | "warn" | "info",
    summary: string,
    detail?: string
  ) => {
    toastRef.current?.show({ severity, summary, detail, life: 3000 });
  };

  return (
    <ToastContext.Provider value={{ show }}>
      <Toast ref={toastRef} position="top-right" />
      {children}
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
