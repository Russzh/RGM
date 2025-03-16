import React, { useState } from "react";

import styles from "./SearchForm.module.scss";
import { Button, Input } from "../../shared/components";
import { ButtonTexts, InputPlaceholders } from "../../shared/constants";
import { ISearchFormProps } from "./SearchForm.types";

const { searchFormContainer, searchButton } = styles;

const SearchForm: React.FC<ISearchFormProps> = ({
  initialSearchQuery,
  onSearchClick,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  return (
    <form className={searchFormContainer}>
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        inputValue={searchQuery}
        inputId="search-form"
        invalid={false}
        inputPlaceholder={InputPlaceholders.WhatDoYouWantToWatch}
      />
      <Button
        buttonText={ButtonTexts.Search}
        type="submit"
        className={searchButton}
        onClick={() => onSearchClick(searchQuery)}
      />
    </form>
  );
};

export { SearchForm };
