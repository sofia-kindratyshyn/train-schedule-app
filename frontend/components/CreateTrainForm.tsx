"use client";

import css from "./CreateTrainForm.module.css";
import { Form, Field, Formik, ErrorMessage, FormikHelpers } from "formik";
import { formatDateForDB } from "../helpers/fromatingDate";
import { createTrainValidationSchema } from "../helpers/validationFormSchema";
import { useRouter } from "next/navigation";
import { createTrain } from "../lib/api/clientApi";

type TrainForCreate = {
  name: string;
  departure_station: string;
  arrival_station: string;
  departure_time: string;
  arrival_time: string;
};

export default function CreateTrainForm() {
  const router = useRouter();
  const defaultValues: TrainForCreate = {
    name: "",
    departure_station: "",
    arrival_station: "",
    departure_time: new Date().toISOString().slice(0, 16),
    arrival_time: new Date().toISOString().slice(0, 16),
  };

  const handleSubmit = async (
    values: TrainForCreate,
    { resetForm }: FormikHelpers<TrainForCreate>
  ) => {
    try {
      const formattedPayload = {
        ...values,
        departure_time: formatDateForDB(values.departure_time),
        arrival_time: formatDateForDB(values.arrival_time),
      };
      await createTrain(formattedPayload);
      resetForm();
      router.push("/trains");
    } catch (error) {
      console.log("Failed to create train", error);
    }
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={createTrainValidationSchema}
      onSubmit={handleSubmit}
    >
      <div className={css.container}>
        <h2 className={css.title}>Додати поїзд</h2>
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

          <button type="submit" className={css.button}>
            Додати
          </button>
        </Form>
      </div>
    </Formik>
  );
}
