import { cn } from "../../../lib/cn";

export default function Card({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag
      className={cn("surface rounded-md p-5 sm:p-6", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
