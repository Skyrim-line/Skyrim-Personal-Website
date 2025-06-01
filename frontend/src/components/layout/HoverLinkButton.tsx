import { Link } from "react-router-dom";

interface HoverLinkButtonProps {
  to: string;
  children: React.ReactNode;
}

export const HoverLinkButton = ({ to, children }: HoverLinkButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (to.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(to.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary underline-offset-4 hover:underline h-9 px-4 py-2 has-[>svg]:px-3 text-lg transition-transform duration-300 ease-in-out hover:scale-110">
      {children}
    </Link>
  );
};
