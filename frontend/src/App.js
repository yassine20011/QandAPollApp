import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import NavBar from "./components/navbar";
import PrivateRoute from "./utils/privateRoute";
import AuthContextProvider from "./context/AuthProvider";
import { useContext } from "react";

import AuthContext from "./context/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p>{user ? `Welcome ${user.username}` : "sign in"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={<PrivateRoute component={HomePage} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
