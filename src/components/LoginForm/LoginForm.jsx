import { Field, Form, Formik } from "formik";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { Navigate, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import s from "./LoginForm.module.css";
import * as Yup from 'yup';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const orderSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    number: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
      .min(3, 'Minimum 3 digits')
      .max(50, 'Maximum 50 digits')
      .required('Required'),
  });

    const handleSubmit = (values, options) => {
        dispatch(login(values))
            .unwrap()
            .then((data) => {
                toast(`Welcome ${data?.user?.name}`);
                navigate("/contacts");
            })
            .catch(() => {
                toast.error("Wrong login or password!");
            });
        options.resetForm();
    };

    const initialValues = {
    email: "",
    password: "",
    };
    
    if (isLoggedIn) {
    return <Navigate to="/contacts" />;
    }
    
    return (
    <div className={s.container}>
      <h2 className={s.loginTitle}>Login</h2>
      <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={orderSchema}>
        <Form className={s.form}>
          <Field
            name="email"
            placeholder="Enter your email"
            autoComplete="username"
            className={s.input}
          />
          <Field
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            className={s.input}
          />
          <button type="submit" className={s.btn}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;