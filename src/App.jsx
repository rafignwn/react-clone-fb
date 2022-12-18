import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./pages/error/ErrorPage";
import Home from "./pages/home/Home";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RouteProtector = ({ children }) => {
    // check current user
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }

    return children;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          exact
          element={
            <RouteProtector>
              <Root />
            </RouteProtector>
          }
          errorElement={<ErrorPage />}
        >
          <Route
            index
            element={
              <RouteProtector>
                <Home />
              </RouteProtector>
            }
          />
          <Route
            path="profile/:username"
            element={
              <RouteProtector>
                <Profile />
              </RouteProtector>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
