import { ComponentPropsWithoutRef, ElementType } from "react";
import { Card } from ".";

type Props<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "href"
> & {
  as?: T;
  href?: string;
};

export const CardTitle = <T extends ElementType = "h2">({
  as,
  href,
  children,
}: Props<T>) => {
  const Component = as || "h2";

  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
};
