import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { authThunks } from "features/auth/model/authSlice";

export const useLogin = () => {
  const dispatch = useDispatch();

  type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 4) {
        errors.password = "Too short";
      }
      return errors;
    },
    onSubmit: (values) => {
      formik.resetForm();
      dispatch(authThunks.login(values));
      // alert(JSON.stringify(values, null, 2));
    },
  });
  return { formik };
};
