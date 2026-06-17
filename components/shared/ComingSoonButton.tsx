"use client"
import { useToastStore } from "@/providers/toast-provider";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface ComingSoonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  message: string;
  children: ReactNode;
}

export default function ComingSoonButton({ message, children, className, ...props }: ComingSoonButtonProps) {
  const { show } = useToastStore();
  return (
    <button
      {...props}
      onClick={(e) => {
        show(message, "coming");
        if (props.onClick) props.onClick(e);
      }}
      className={className}
    >
      {children}
    </button>
  );
}
