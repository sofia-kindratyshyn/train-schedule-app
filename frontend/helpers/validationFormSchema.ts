import * as Yup from "yup";

export const createTrainValidationSchema = Yup.object({
    name: Yup.string().min(3).max(30).required("Required"),
    departure_station: Yup.string().min(3).max(50).required("Required"),
    arrival_station: Yup.string().min(3).max(50).required("Required"),
    departure_time: Yup.string().required("Required"),
    arrival_time: Yup.string()
      .required("Required")
      .test(
        "is-after-departure",
        "Час прибуття повинен бути пізніше за час відправлення",
        function (value) {
          const { departure_time } = this.parent;
          return (
            departure_time &&
            value &&
            new Date(value) > new Date(departure_time)
          );
        }
      ),
  });