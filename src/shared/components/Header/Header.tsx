import React from "react";

import styles from "./Header.module.scss";

const { headerContainer, headerContent } = styles;

const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <header className={headerContainer}>
      <div className={headerContent}>{children}</div>
    </header>
  );
};

export { Header };
