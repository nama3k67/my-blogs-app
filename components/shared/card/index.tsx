import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType } from "react";

import { CardTitle } from "./title";
import { CardDescription } from "./description";
import { CardCta } from "./cta";
import { CardLink } from "./link";
import { CardEyebrow } from "./eyeBrow";

type IProps<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "className"
> & {
  as?: T;
  className?: string;
};

export const Card = <T extends ElementType = "div">({
  as,
  className,
  children,
}: IProps<T>) => {
  const Component = as || "div";

  return (
    <Component
      className={clsx(className, "group relative flex flex-col items-start")}
    >
      {children}
    </Component>
  );
};

Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Cta = CardCta;
Card.Link = CardLink;
Card.Eyebrow = CardEyebrow;
