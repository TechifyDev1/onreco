"use client"
import { useToastStore } from "@/providers/toast-provider";
import { ReactNode, AnchorHTMLAttributes } from "react";

interface ComingSoonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  message: string;
  children: ReactNode;
}

export default function ComingSoonLink({ message, children, className, ...props }: ComingSoonLinkProps) {
  const { show } = useToastStore();
  return (
    <a
      {...props}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        show(message, "coming");
        if (props.onClick) props.onClick(e);
      }}
      className={className}
    >
      {children}
    </a>
  );
}
