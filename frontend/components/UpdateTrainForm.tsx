"use client";

import css from "./CreateTrainForm.module.css";
import { Form, Field, Formik, ErrorMessage, FormikHelpers } from "formik";
import { fetchTrainById, updateTrain } from "../lib/api/clientApi";
import { formatDateForDB } from "../helpers/fromatingDate";
import { createTrainValidationSchema } from "../helpers/validationFormSchema";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Train } from "../types/train";

type TrainForCreate = {
  name: string;
  departure_station: string;
  arrival_station: string;
  departure_time: string;
  arrival_time: string;
};

export default function UpdateTrainForm({ trainId }: { trainId: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: train,
    isLoading,
    error,
  } = useQuery<TrainForCreate, Error>({
    queryKey: ["train", trainId],
    queryFn: () => fetchTrainById(trainId),
  });

  const mutation = useMutation<
    { message: string; status: string; data: Train },
    Error,
    TrainForCreate
  >({
    mutationFn: (updatedTrain) => updateTrain(updatedTrain, trainId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trains"] });
      queryClient.invalidateQueries({ queryKey: ["train", trainId] });
      router.push("/trains");
    },
    onError: (error: Error) => {
      console.error("Failed to update train", error);
    },
  });

  const handleSubmit = (
    values: TrainForCreate,
    { resetForm }: FormikHelpers<TrainForCreate>
  ) => {
    const formattedPayload = {
      ...values,
      departure_time: formatDateForDB(values.departure_time),
      arrival_time: formatDateForDB(values.arrival_time),
    };
    mutation.mutate(formattedPayload, {
      onSuccess: () => resetForm(),
    });
  };

  if (isLoading) return <div>Loading train data...</div>;
  if (error) return <div>Error loading train data</div>;

  return (
    <Formik
      enableReinitialize
      initialValues={
        train ?? {
          name: "",
          departure_station: "",
          arrival_station: "",
          departure_time: new Date().toISOString().slice(0, 16),
          arrival_time: new Date().toISOString().slice(0, 16),
        }
      }
      validationSchema={createTrainValidationSchema}
      onSubmit={handleSubmit}
    >
      <div className={css.container}>
        <button className={css.backBtn} onClick={() => router.back()}>
          Back
        </button>
        <h2 className={css.title}>Оновити поїзд</h2>
        <Form className={css.form}>
          <div>
            <label className={css.label}>Назва поїзда</label>
            <Field type="text" name="name" className={css.input} />
            <ErrorMessage
              name="name"
              component="div"
              className={css.errorMessage}
            />
          </div>

          <div>
            <label className={css.label}>Станція відправлення</label>
            <Field type="text" name="departure_station" className={css.input} />
            <ErrorMessage
              name="departure_station"
              component="div"
              className={css.errorMessage}
            />
          </div>

          <div>
            <label className={css.label}>Станція прибуття</label>
            <Field type="text" name="arrival_station" className={css.input} />
            <ErrorMessage
              name="arrival_station"
              component="div"
              className={css.errorMessage}
            />
          </div>

          <div>
            <label className={css.label}>Час відправлення</label>
            <Field
              type="datetime-local"
              name="departure_time"
              className={css.input}
            />
            <ErrorMessage
              name="departure_time"
              component="div"
              className={css.errorMessage}
            />
          </div>

          <div>
            <label className={css.label}>Час прибуття</label>
            <Field
              type="datetime-local"
              name="arrival_time"
              className={css.input}
            />
            <ErrorMessage
              name="arrival_time"
              component="div"
              className={css.errorMessage}
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className={css.button}
          >
            Оновити
          </button>
        </Form>
      </div>
    </Formik>
  );
}
