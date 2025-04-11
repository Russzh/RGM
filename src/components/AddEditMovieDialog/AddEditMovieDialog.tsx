import React, { useReducer, useState } from "react";
import { Checkbox, DatePicker, Select } from "antd";
import dayjs from "dayjs";

import styles from "./AddEditMovieDialog.module.scss";
import {
  Input,
  InputLabels,
  InputPlaceholders,
  Dialog,
  ButtonTexts,
  DialogTitles,
  datepickerFormat,
} from "@shared/components";
import {
  IMovieInfo,
  movieGenres,
} from "@components/MovieList/MovieCard/MovieCard.types";
import {
  FormAction,
  FormState,
  IAddEditMovieDialogProps,
} from "./AddEditMovieDialog.types";
import { formatMinutes } from "@shared/helpers";

const { formContainer, formRow, fieldContainerWithLabel, datePickerAntd } =
  styles;

const AddEditMovieDialog: React.FC<IAddEditMovieDialogProps> = ({
  onCancel,
  onSubmit,
  isEditModal = false,
  movieData,
}) => {
  const editedMovieData = movieData as IMovieInfo;

  const [runtimeDisplayValue, setRuntimeDisplayValue] = useState<string>(
    isEditModal ? formatMinutes(+editedMovieData.duration) : "",
  );

  const initialState: FormState = {
    title: isEditModal ? editedMovieData.name : "",
    releaseDate: isEditModal ? editedMovieData.releaseDate : "",
    imageUrl: isEditModal ? editedMovieData.imageUrl : "",
    rating: isEditModal ? editedMovieData.rating : "",
    description: isEditModal ? editedMovieData.description : "",
    genres: isEditModal ? editedMovieData.genres : [],
    runtime: isEditModal ? editedMovieData.duration : "",
  };

  const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, title: action.payload };
      case "SET_RELEASE_DATE":
        return { ...state, releaseDate: action.payload };
      case "SET_IMAGE_URL":
        return { ...state, imageUrl: action.payload };
      case "SET_RATING":
        return { ...state, rating: action.payload };
      case "SET_DESCRIPTION":
        return { ...state, description: action.payload };
      case "SET_GENRES":
        return { ...state, genres: action.payload };
      case "SET_RUNTIME":
        return { ...state, runtime: action.payload };
    }
  };
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = () => {
    const movieData: IMovieInfo = {
      id: isEditModal ? editedMovieData.id : new Date().toISOString(),
      name: formState.title,
      releaseDate: formState.releaseDate || "",
      imageUrl: formState.imageUrl,
      rating: formState.rating,
      description: formState.description,
      genres: formState.genres,
      duration: formState.runtime,
    };

    onSubmit(movieData);
  };

  return (
    <Dialog
      title={isEditModal ? DialogTitles.Edit : DialogTitles.Add}
      buttonsText={{
        okText: ButtonTexts.Submit,
        cancelText: ButtonTexts.Reset,
      }}
      onCancelClick={onCancel}
      onOkClick={handleSubmit}
    >
      <form
        className={formContainer}
        onKeyDown={(e: React.KeyboardEvent<HTMLFormElement>) =>
          e.key === "Enter" ? handleSubmit() : null
        }
      >
        <div className={formRow}>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_TITLE", payload: e.target.value })
            }
            defaultValue={formState.title}
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
                formState.releaseDate
                  ? dayjs(formState.releaseDate, datepickerFormat)
                  : null
              }
              className={datePickerAntd}
              id="add-movie-form-release-date"
              format={datepickerFormat}
              onChange={(date, dateString) => {
                dispatch({
                  type: "SET_RELEASE_DATE",
                  payload: dateString as string,
                });
              }}
              allowClear
              placeholder={InputPlaceholders.MovieReleaseDate}
            />
          </div>
        </div>

        <div className={formRow}>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_IMAGE_URL", payload: e.target.value })
            }
            defaultValue={formState.imageUrl}
            inputId="add-movie-form-url"
            invalid={false}
            inputPlaceholder={InputPlaceholders.MovieUrl}
            labelText={InputLabels.MovieUrl}
          />

          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_RATING", payload: e.target.value })
            }
            defaultValue={formState.rating}
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
              value={formState.genres}
              onChange={(values) =>
                dispatch({ type: "SET_GENRES", payload: values })
              }
              dropdownRender={() => (
                <div>
                  {movieGenres.map((listGenre, index) => (
                    <div key={index}>
                      <Checkbox
                        checked={formState.genres.includes(listGenre)}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_GENRES",
                            payload: e.target.checked
                              ? [...formState.genres, listGenre]
                              : formState.genres.filter(
                                  (formGenre) => formGenre !== listGenre,
                                ),
                          })
                        }
                      >
                        {listGenre}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>

          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: "SET_RUNTIME", payload: e.target.value });
              setRuntimeDisplayValue(e.target.value);
            }}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
              setRuntimeDisplayValue(formatMinutes(+e.target.value));
            }}
            currentValue={runtimeDisplayValue}
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
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
            }
            id="add-movie-form-description"
            defaultValue={formState.description}
            placeholder={InputPlaceholders.MovieDescription}
            rows={7}
          />
        </div>
      </form>
    </Dialog>
  );
};

export { AddEditMovieDialog };
