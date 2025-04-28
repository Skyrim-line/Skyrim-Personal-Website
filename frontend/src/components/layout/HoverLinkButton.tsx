import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HoverLinkButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const HoverLinkButton = ({
  to,
  children,
  className = "",
}: HoverLinkButtonProps) => {
  return (
    <Button
      asChild
      variant="link"
      className={`text-lg transition-transform duration-300 ease-in-out  hover:scale-110 ${className}`}>
      <Link to={to}>{children}</Link>
    </Button>
  );
};
