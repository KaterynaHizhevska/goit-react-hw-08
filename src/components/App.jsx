import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, lazy, Suspense } from "react";
import { refreshUser } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selectors";
import Layout from "./Layout/Layout";
import Loader from "./Loader/Loader";
import "./App.css";


const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("../pages/RegistrationPage/RegistrationPage")
);
const ContactPage = lazy(() => import("../pages/ContactsPage/ContactPage"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const RestrictedRoute = lazy(() => import("./RestrictedRoute"));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));


function App() {
    const dispatch = useDispatch();
    const isRefreshing = useSelector(selectIsRefreshing);

    useEffect(() => {
    dispatch(refreshUser());
    }, [dispatch]);
    
  return isRefreshing ? null : (
      <div>
          <Suspense fallback={<Loader />}>
              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route index element={<HomePage />} />
                  <Route
              path="contacts"
              element={
                <PrivateRoute>
                  <ContactPage />
                </PrivateRoute>
              }
            />
            <Route
              path="register"
              element={
                <RestrictedRoute
                  component={<RegistrationPage />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute
                  component={<LoginPage />}
                  redirectTo="/contacts"
                />
              }
                      />
                  </Route>
                  <Route path='*' element={<NotFoundPage />} />
              </Routes>
          </Suspense>
    </div>
  )
}

export default App