import React, { useReducer, useState } from "react";
import { Checkbox, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useNavigate, useOutletContext, useSearchParams } from "react-router";

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
  IAddEditMovieDialogProps,
} from "./AddEditMovieDialog.types";
import { formatMinutes } from "@shared/helpers";
import { createMovie, updateMovie } from "../../api/fetchData";
import { RoutePaths } from "../../App.types";

const { formContainer, formRow, fieldContainerWithLabel, datePickerAntd } =
  styles;

const AddEditMovieDialog: React.FC<IAddEditMovieDialogProps> = ({
  isEditModal = false,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editedMovieData = useOutletContext<IMovieInfo>();

  const [runtimeDisplayValue, setRuntimeDisplayValue] = useState<string>(
    isEditModal ? formatMinutes(editedMovieData.runtime) : "",
  );

  const initialState: IMovieInfo = {
    id: isEditModal ? editedMovieData.id : 0,
    title: isEditModal ? editedMovieData.title : "",
    release_date: isEditModal ? editedMovieData.release_date : "",
    poster_path: isEditModal ? editedMovieData.poster_path : "",
    vote_average: isEditModal ? editedMovieData.vote_average : "",
    overview: isEditModal ? editedMovieData.overview : "",
    genres: isEditModal ? editedMovieData.genres : [],
    runtime: isEditModal ? editedMovieData.runtime : 0,
  };

  const formReducer = (state: IMovieInfo, action: FormAction): IMovieInfo => {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, title: action.payload };
      case "SET_RELEASE_DATE":
        return { ...state, release_date: action.payload };
      case "SET_IMAGE_URL":
        return { ...state, poster_path: action.payload };
      case "SET_RATING":
        return { ...state, vote_average: action.payload };
      case "SET_DESCRIPTION":
        return { ...state, overview: action.payload };
      case "SET_GENRES":
        return { ...state, genres: action.payload };
      case "SET_RUNTIME":
        return { ...state, runtime: action.payload };
    }
  };
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = async () => {
    const moviePayload: IMovieInfo = {
      title: formState.title,
      release_date: formState.release_date || "",
      poster_path: formState.poster_path,
      vote_average: formState.vote_average,
      overview: formState.overview,
      genres: formState.genres,
      runtime: formState.runtime,
    };

    if (isEditModal) {
      moviePayload.id = formState.id;
    }

    const response = await (isEditModal ? updateMovie : createMovie)(
      moviePayload,
    );

    navigate({
      pathname: `${RoutePaths.Home}`,
      search: `${searchParams.toString()}`,
    });

    navigate({
      pathname: `${RoutePaths.Home}${response.id}`,
      search: `${searchParams.toString()}`,
    });
  };

  return (
    <Dialog
      title={isEditModal ? DialogTitles.Edit : DialogTitles.Add}
      buttonsText={{
        okText: ButtonTexts.Submit,
        cancelText: ButtonTexts.Reset,
      }}
      onCancelClick={() =>
        navigate({
          pathname: `${RoutePaths.Home}${isEditModal ? editedMovieData.id : null}`,
          search: searchParams.toString(),
        })
      }
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
                formState.release_date
                  ? dayjs(formState.release_date, datepickerFormat)
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
            defaultValue={formState.poster_path}
            inputId="add-movie-form-url"
            invalid={false}
            inputPlaceholder={InputPlaceholders.MovieUrl}
            labelText={InputLabels.MovieUrl}
          />

          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_RATING", payload: +e.target.value })
            }
            defaultValue={formState.vote_average}
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
              dispatch({ type: "SET_RUNTIME", payload: +e.target.value });
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
            defaultValue={formState.overview}
            placeholder={InputPlaceholders.MovieDescription}
            rows={7}
          />
        </div>
      </form>
    </Dialog>
  );
};

export { AddEditMovieDialog };
