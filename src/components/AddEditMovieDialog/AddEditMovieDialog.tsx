import React, { useState } from "react";
import { Checkbox, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useNavigate, useOutletContext, useSearchParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import styles from "./AddEditMovieDialog.module.scss";
import globalStyles from "../../index.module.scss";
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
import { IAddEditMovieDialogProps } from "./AddEditMovieDialog.types";
import { formatMinutes } from "@shared/helpers";
import { createMovie, updateMovie } from "../../api/fetchData";
import { RoutePaths } from "../../App.types";

const {
  formContainer,
  formRow,
  fieldContainerWithLabel,
  datePickerAntd,
  runtimeLabel,
} = styles;
const { errorFormText, formField, invalidClass } = globalStyles;

const AddEditMovieDialog: React.FC<IAddEditMovieDialogProps> = ({
  isEditModal = false,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editedMovieData = useOutletContext<IMovieInfo>();

  const [runtimeDisplayValue, setRuntimeDisplayValue] = useState<string>(
    isEditModal ? formatMinutes(editedMovieData.runtime as number) : "",
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

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<IMovieInfo>({
    defaultValues: initialState,
  });

  const onSubmit = async (formState: IMovieInfo) => {
    const moviePayload: IMovieInfo = {
      title: formState.title,
      release_date: formState.release_date || "",
      poster_path: formState.poster_path,
      vote_average: +formState.vote_average,
      overview: formState.overview,
      genres: formState.genres,
      runtime: +formState.runtime,
    };

    if (isEditModal) {
      moviePayload.id = formState.id;
    }

    const newMovieData = await (isEditModal ? updateMovie : createMovie)(
      moviePayload,
    );

    await queryClient.invalidateQueries({
      queryKey: ["responseMovies"],
    });

    navigate(
      {
        pathname: `${RoutePaths.Home}${newMovieData.id}`,
        search: `${searchParams.toString()}`,
      },
      { state: { updatedMovie: newMovieData } },
    );
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
          pathname: `${RoutePaths.Home}${isEditModal ? editedMovieData.id : ""}`,
          search: searchParams.toString(),
        })
      }
      onOkClick={handleSubmit(onSubmit)}
    >
      <form
        className={formContainer}
        onKeyDown={(e: React.KeyboardEvent<HTMLFormElement>) =>
          e.key === "Enter" ? handleSubmit(onSubmit) : null
        }
      >
        <div className={formRow}>
          <div className={formField}>
            <Input
              inputId="add-movie-form-title"
              invalid={!!errors.title}
              inputPlaceholder={InputPlaceholders.MovieTitle}
              labelText={InputLabels.Title}
              registerProps={register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters long",
                },
              })}
              errorMessage={errors.title?.message}
            />
          </div>

          <div className={fieldContainerWithLabel}>
            <label htmlFor="add-movie-form-release-date">
              {InputLabels.ReleaseDate}
            </label>

            <Controller
              name="release_date"
              control={control}
              rules={{
                required: "Release date is required",
              }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={
                    field.value ? dayjs(field.value, datepickerFormat) : null
                  }
                  status={errors.release_date ? "error" : ""}
                  className={datePickerAntd}
                  id="add-movie-form-release-date"
                  format={datepickerFormat}
                  onChange={(date, dateString) => {
                    field.onChange(dateString);
                  }}
                  allowClear
                  placeholder={InputPlaceholders.MovieReleaseDate}
                />
              )}
            />
            {errors.release_date && (
              <p className={errorFormText}>{errors.release_date.message}</p>
            )}
          </div>
        </div>

        <div className={formRow}>
          <div className={formField}>
            <Input
              registerProps={register("poster_path", {
                required: "Movie URL is required",
                pattern: {
                  value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
                  message: "Invalid URL format",
                },
              })}
              inputId="add-movie-form-url"
              invalid={!!errors.poster_path}
              inputPlaceholder={InputPlaceholders.MovieUrl}
              labelText={InputLabels.MovieUrl}
              errorMessage={errors.poster_path?.message}
            />
          </div>

          <div className={formField}>
            <Input
              registerProps={register("vote_average", {
                required: "Rating is required",
                minLength: {
                  value: 1,
                  message: "Rating must be at least 1 characters long",
                },
                pattern: {
                  value: /^(10(\.0)?|[0-9](\.[0-9])?)$/,
                  message:
                    "Rating must be a number between 0.0 and 10.0 with one decimal place",
                },
              })}
              inputId="add-movie-form-rating"
              invalid={!!errors.vote_average}
              inputPlaceholder={InputPlaceholders.MovieRating}
              labelText={InputLabels.RATING}
              errorMessage={errors.vote_average?.message}
            />
          </div>
        </div>

        <div className={formRow}>
          <div className={fieldContainerWithLabel}>
            <label htmlFor="add-movie-form-select-genre">
              {InputLabels.SelectGenre}
            </label>

            <Controller
              name="genres"
              control={control}
              rules={{
                required: "At least one genre must be selected",
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="multiple"
                  status={errors.genres ? "error" : ""}
                  placeholder={InputPlaceholders.MovieGenres}
                  value={field.value}
                  onChange={(values) => field.onChange(values)}
                  dropdownRender={() => (
                    <div>
                      {movieGenres.map((listGenre, index) => (
                        <div key={index}>
                          <Checkbox
                            checked={field.value.includes(listGenre)}
                            onChange={(e) =>
                              field.onChange(
                                e.target.checked
                                  ? [...field.value, listGenre]
                                  : field.value.filter(
                                      (formGenre) => formGenre !== listGenre,
                                    ),
                              )
                            }
                          >
                            {listGenre}
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                  )}
                />
              )}
            />
            {errors.genres && (
              <p className={errorFormText}>{errors.genres.message}</p>
            )}
          </div>

          <div className={formField}>
            <label className={runtimeLabel} htmlFor="add-movie-form-runtime">
              {InputLabels.RUNTIME}
            </label>

            <input
              {...register("runtime", {
                required: "Runtime is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Runtime must be a valid number",
                },
                validate: (value) =>
                  value > 0 || "Runtime must be greater than 0",
              })}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue("runtime", e.target.value, {
                  shouldValidate: true,
                });
                setRuntimeDisplayValue(e.target.value);
              }}
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRuntimeDisplayValue(formatMinutes(+e.target.value));
              }}
              value={runtimeDisplayValue}
              id="add-movie-form-runtime"
              className={errors.runtime ? invalidClass : ""}
              placeholder={InputPlaceholders.MovieRunTime}
            />
            {errors.runtime && (
              <p className={errorFormText}>{errors.runtime.message}</p>
            )}
          </div>
        </div>

        <div className={`${formRow} ${fieldContainerWithLabel} ${formField}`}>
          <label htmlFor="add-movie-form-description">
            {InputLabels.Overview}
          </label>
          <textarea
            id="add-movie-form-description"
            placeholder={InputPlaceholders.MovieDescription}
            rows={7}
            {...register("overview", {
              required: "Overview is required",
              minLength: {
                value: 10,
                message: "Overview must be at least 10 characters long",
              },
            })}
            className={errors.overview ? invalidClass : ""}
          />
          {errors.overview && (
            <p className={errorFormText}>{errors.overview.message}</p>
          )}
        </div>
      </form>
    </Dialog>
  );
};

export { AddEditMovieDialog };
