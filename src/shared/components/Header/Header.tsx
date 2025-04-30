import React from "react";
import { useNavigate, useSearchParams } from "react-router";

import styles from "./Header.module.scss";
import { Button } from "@shared/components";
import { RoutePaths } from "../../../App.types";
import { IHeaderProps } from "@shared/components/Header/Header.types";

const { headerContainer, headerContent, headerButton } = styles;

const Header: React.FC<IHeaderProps> = ({ children, buttonText }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <header className={headerContainer}>
      <div data-testid="header-content" className={headerContent}>
        {children}
        {buttonText && (
          <Button
            className={headerButton}
            buttonText={buttonText}
            onClick={() =>
              navigate({
                pathname: RoutePaths.AddMovie,
                search: searchParams.toString(),
              })
            }
          />
        )}
      </div>
    </header>
  );
};

export { Header };
