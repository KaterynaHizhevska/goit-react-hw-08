import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { deleteContact, editContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
import { useState } from "react";
import s from "./Contact.module.css"

function Contact({ id, name, number }) {
    const dispatch = useDispatch();
    const [isModal, setIsModal] = useState(false);
    const [contactData, setContactData] = useState({ name, number })

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = () => {
    const { name: updatedName, number: updatedNumber } = contactData;

    if (updatedName.trim() && updatedNumber.trim()) {
      dispatch(
        editContact({ id, name: updatedName.trim(), number: updatedNumber.trim() })
      );
    }
    setIsModal(false);
  };

    return (
        <li className={s.item}>
            <div className={s.container}>
                <p><FaUser /> {name}</p>
                <p><FaPhoneAlt /> {number}</p>
            </div>
            <div className={s.box}>
                <button
                onClick={() => dispatch(deleteContact(id))}
                    className={s.btnContact}>Delete</button>
                <button
                onClick={() => setIsModal(true)}
                className={s.btnContact}>Edit Contact</button>
            </div>
            {isModal && (
                <div className={s.modalContainer}>
                    <p>Edit Contact</p>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={contactData.name}
                            onChange={handleInputChange}
                            className={s.input}
                        />
                    </label>
                    <label>
                        Number:
                        <input
                            type="text"
                            name="number"
                            value={contactData.number}
                            onChange={handleInputChange}
                            className={s.input}
                        />
                    </label>
                    <button className={s.btnContact} onClick={handleSaveEdit}>Save</button>
                </div>
            )}
        </li>
  )
}

export default Contact