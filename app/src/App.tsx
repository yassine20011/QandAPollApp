import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login.tsx";
import PrivateRoute from "./utils/privateRoute.tsx";
import RedirectRoute from "./utils/redirectRoute.tsx";
import AuthContextProvider from "./context/AuthProvider.tsx";
import Dashboard from "./components/dashboard.tsx";
import ViewSession from "./components/viewSession.tsx";
import Options from "./components/Q&A/options.tsx";

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
              path="/"
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route path="/login" element={<RedirectRoute component={Login} redirectPath="/" />} />
            <Route path="/view/question" element={<PrivateRoute component={ViewSession} />} />
            <Route path="/view/question/options" element={<PrivateRoute component={Options} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
