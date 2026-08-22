import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "inverse";

const variantClasses: Record<Variant, string> = {
  primary: "bg-green text-navy hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(34,197,94,0.35)]",
  secondary:
    "border border-white/20 text-white hover:-translate-y-0.5 hover:bg-white/10",
  inverse: "bg-navy text-white hover:-translate-y-0.5",
};

const baseClasses =
  "inline-block rounded-md px-6 py-3 text-sm font-bold transition-all duration-200 ease-out";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type LinkButtonProps = CommonProps & { href: string; onClick?: never };
type ClickButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: never };

export function Button(props: LinkButtonProps | ClickButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href, variant: _variant, className: _className, children: _children, ...buttonProps } = props;

  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
