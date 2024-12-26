import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";
import Loader from "../../components/Loader/Loader";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import { selectContacts } from "../../redux/contacts/selectors";
import s from "./ContactPage.module.css";

const ContactPage = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const contacts = useSelector(selectContacts);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
    
    const error = useSelector(selectError);
    return (
        <div className={s.container}>
      {error && <p> Error: {error}</p>}
      <ContactForm />
      <SearchBox />
            {loading ? <Loader /> : <ContactList contacts={contacts} />}
    </div>
    )
}
export default ContactPage;