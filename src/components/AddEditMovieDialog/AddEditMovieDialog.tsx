import React, { useState } from "react";
import { Checkbox, DatePicker, Select } from "antd";
import dayjs from "dayjs";

import styles from "./AddEditMovieDialog.module.scss";
import {
  Input,
  InputLabels,
  InputPlaceholders,
  Dialog,
  DialogButtonTexts,
  DialogTitles,
} from "@shared/components";
import {
  IMovieInfo,
  movieGenres,
} from "@components/MovieList/MovieCard/MovieCard.types";
import { IAddEditMovieDialogProps } from "@components/AddEditMovieDialog/AddEditMovieDialog.types";
import { formatMinutes } from "@shared/helpers";

const { formContainer, formRow, fieldContainerWithLabel, datePickerAntd } =
  styles;

const AddEditMovieDialog: React.FC<IAddEditMovieDialogProps> = ({
  onCancelClick,
  onOkClick,
  isEditModal = false,
  movieData,
}) => {
  const editedMovieData = movieData as IMovieInfo;
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    isEditModal ? editedMovieData.genres : [],
  );
  const [runtimeInputValue, setRuntimeInputValue] = useState<string>(
    isEditModal ? formatMinutes(editedMovieData.duration) : "",
  );

  const datepickerFormat = "YYYY-MM-DD";

  const handleCheckboxChange = (clickedGenre: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedGenres([...selectedGenres, clickedGenre]);
    } else {
      setSelectedGenres(
        selectedGenres.filter(
          (selectedGenre) => selectedGenre !== clickedGenre,
        ),
      );
    }
  };

  return (
    <Dialog
      title={isEditModal ? DialogTitles.Edit : DialogTitles.Add}
      buttonsText={{
        okText: DialogButtonTexts.Submit,
        cancelText: DialogButtonTexts.Reset,
      }}
      onCancelClick={onCancelClick}
      onOkClick={onOkClick}
    >
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        className={formContainer}
      >
        <div className={formRow}>
          <Input
            onChange={() => {}}
            defaultValue={isEditModal ? editedMovieData.name : ""}
            inputId="add-movie-form-title"
            invalid={false}
            inputPlaceholder={InputPlaceholders.MovieTitle}
            labelText={InputLabels.Title}
          />

          <div className={fieldContainerWithLabel}>
            <label htmlFor="add-movie-form-release-date">
              {InputLabels.ReleaseDate}
            </label>
            <DatePicker
              defaultValue={
                isEditModal
                  ? dayjs(editedMovieData.releaseDate, datepickerFormat)
                  : null
              }
              className={datePickerAntd}
              id="add-movie-form-release-date"
              format={datepickerFormat}
              onChange={() => {}}
              allowClear
              placeholder={InputPlaceholders.MovieReleaseDate}
            />
          </div>
        </div>

        <div className={formRow}>
          <Input
            onChange={() => {}}
            defaultValue={isEditModal ? editedMovieData.imageUrl : ""}
            inputId="add-movie-form-url"
            invalid={false}
            inputPlaceholder={InputPlaceholders.MovieUrl}
            labelText={InputLabels.MovieUrl}
          />

          <Input
            onChange={() => {}}
            defaultValue={isEditModal ? editedMovieData.rating : ""}
            inputId="add-movie-form-rating"
            invalid={false}
            inputPlaceholder={InputPlaceholders.MovieRating}
            labelText={InputLabels.RATING}
          />
        </div>

        <div className={formRow}>
          <div className={fieldContainerWithLabel}>
            <label htmlFor="add-movie-form-select-genre">
              {InputLabels.SelectGenre}
            </label>
            <Select
              mode="multiple"
              placeholder={InputPlaceholders.MovieGenres}
              value={selectedGenres}
              onChange={(values) => setSelectedGenres(values)}
              dropdownRender={() => (
                <div>
                  {movieGenres.map((genre, index) => (
                    <div key={index}>
                      <Checkbox
                        checked={selectedGenres.includes(genre)}
                        onChange={(e) =>
                          handleCheckboxChange(genre, e.target.checked)
                        }
                      >
                        {genre}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>

          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRuntimeInputValue(e.target.value)
            }
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
              setRuntimeInputValue(formatMinutes(+e.target.value));
            }}
            currentValue={runtimeInputValue}
            inputId="add-movie-form-runtime"
            invalid={false}
            inputPlaceholder={InputPlaceholders.MovieRunTime}
            labelText={InputLabels.RUNTIME}
          />
        </div>

        <div className={`${formRow} ${fieldContainerWithLabel}`}>
          <label htmlFor="add-movie-form-description">
            {InputLabels.Overview}
          </label>
          <textarea
            onChange={() => {}}
            id="add-movie-form-description"
            defaultValue={isEditModal ? editedMovieData.description : ""}
            placeholder={InputPlaceholders.MovieDescription}
            rows={7}
          />
        </div>
      </form>
    </Dialog>
  );
};

export { AddEditMovieDialog };
