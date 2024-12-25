import Loader from "../../components/Loader/Loader";
import s from "./HomePage.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { selectError, selectLoading } from "../../redux/contacts/selections";
import { useSelector } from "react-redux";
import { LuContactRound } from "react-icons/lu";

const HomePage = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    if (loading) {
    return <Loader />;
    }
    
    return (
      <div className={s.container}>
      {error && <p> Error: {error}</p>}

      {isLoggedIn ? (
        <h2>
          Welcome to your contacts <LuContactRound />. Your personal contact book awaits!
        </h2>
      ) : (
        <h2>
          Welcome to contacts <LuContactRound />.
        </h2>
      )}
    </div>  
    )

}

export default HomePage;