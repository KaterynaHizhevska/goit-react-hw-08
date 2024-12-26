import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addContact } from "../../redux/contacts/operations";
import { nanoid } from "@reduxjs/toolkit";
import * as Yup from "yup";
import s from "./ContactForm.module.css";

function ContactForm() {
    const dispatch = useDispatch();

    const initialValues = {
    username: "",
    number: "",
    };

    const orderSchema = Yup.object({
    username: Yup.string()
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
    const newContact = {
      id: nanoid(),
      name: values.username,
      number: values.number,
    };
    dispatch(addContact(newContact));
    options.resetForm();
  };
    

  return (
      <div className={s.container}>
        <Formik
        validationSchema={orderSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <label className={s.label}>
            <span>Name</span>
            <Field type="text" name="username" className={s.input} />
            <ErrorMessage
              name="username"
              component="span"
              className={s.error}
            />
          </label>
          <label className={s.label}>
            <span>Number</span>
            <Field type="text" name="number" className={s.input} />
            <ErrorMessage
              name="number"
              component="span"
              className={s.error}
            />
          </label>
          <button type="submit" className={s.btn}>
            Add contact
          </button>
        </Form>
      </Formik>  
    </div>
  )
}

export default ContactForm