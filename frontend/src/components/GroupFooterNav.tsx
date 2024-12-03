import React from "react";

const GroupFooterNav = ({ children }: { children: any }) => {
  return <div className="grid md:grid-cols-2 gap-8 h-max">{children}</div>;
};

export default GroupFooterNav;
