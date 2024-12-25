import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import s from "./RegistrationForm.module.css";
import toast from "react-hot-toast";

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    dispatch(register(values))
      .unwrap()
      .then((data) => {
        toast(`Welcome ${data?.user?.name}`);
        navigate("/contacts");
      })
      .catch(() => {
        toast.error("Try again!");
      });
    options.resetForm();
    };
    
    const initialValues = {
    name: "",
    email: "",
    password: "",
    };
    
    return (
      <div className={s.container}>
      <h2 className={s.title}>Registration</h2>
      <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={orderSchema}>
        <Form className={s.form}>
          <Field name="name" placeholder="Enter name" className={s.input} />
          <Field
            name="email"
            placeholder="Enter email"
            autoComplete="username"
            className={s.input}
          />
          <Field
            name="password"
            type="password"
            placeholder="Enter pass"
            autoComplete="new-password"
            required
            className={s.input}
          />
          <button type="submit" className={s.btn}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>  
    )
}

export default RegistrationForm;