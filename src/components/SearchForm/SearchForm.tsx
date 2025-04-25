import React, { useState } from "react";
import { useOutletContext } from "react-router";

import styles from "./SearchForm.module.scss";
import {
  Button,
  Input,
  InputPlaceholders,
  ButtonTexts,
} from "@shared/components";
import { ISearchFormProps } from "./SearchForm.types";

const { searchFormContainer, searchButton } = styles;

const SearchForm: React.FC<ISearchFormProps> = ({ initialSearchQuery }) => {
  const { updateSearchParams, searchFormQuery } = useOutletContext<{
    updateSearchParams: (params: Record<string, string>) => void;
    searchFormQuery: string;
  }>();
  const [searchQuery, setSearchQuery] = useState(
    initialSearchQuery || searchFormQuery || "",
  );

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    updateSearchParams({ query: searchQuery });
  };

  return (
    <form className={searchFormContainer} onSubmit={handleFormSubmit}>
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        currentValue={searchQuery}
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
