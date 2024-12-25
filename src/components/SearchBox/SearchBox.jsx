import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import s from "./SearchBox.module.css";

function SearchBox() {
  const dispatch = useDispatch();

  return (
    <div className={s.container}>
      <label htmlFor="search">Search contacts using name or number</label>
      <input
        id="search"
        type="text"
        onChange={(e) => dispatch(changeFilter(e.target.value))}
        className={s.searchInput}
      />
    </div>
  );
}

export default SearchBox;