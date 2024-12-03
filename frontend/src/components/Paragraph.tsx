import React, { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

const Paragraph: React.FC<Props> = ({ className, children }) => {
  return <p className={`md:text-lg text-heading-3 ${className}`}>{children}</p>;
};

export default Paragraph;
