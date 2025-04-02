import React, { useState } from "react";

import styles from "./SearchForm.module.scss";
import {
  Button,
  Input,
  InputPlaceholders,
  ButtonTexts,
} from "@shared/components";
import { ISearchFormProps } from "./SearchForm.types";

const { searchFormContainer, searchButton } = styles;

const SearchForm: React.FC<ISearchFormProps> = ({
  initialSearchQuery,
  onSearchClick,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSearchClick(searchQuery);
  };

  return (
    <form className={searchFormContainer} onSubmit={handleFormSubmit}>
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
      />
    </form>
  );
};

export { SearchForm };
