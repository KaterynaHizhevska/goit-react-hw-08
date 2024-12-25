import Contact from "../Contact/Contact";
import { selectQueryFilter } from "../../redux/filters/selectors";
import { useSelector } from "react-redux";

function ContactList() {
    const filteredContacts = useSelector(selectQueryFilter);

  return (
    <div>
      <ul>
        {filteredContacts.map((item) => {
          return <Contact key={item.id} {...item} />;
        })}
      </ul>
    </div>
  )
}

export default ContactList