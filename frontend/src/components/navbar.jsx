import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function NavBar(props) {
    const { user, logoutUser} = useContext(AuthContext);
    return (
      <>
      <nav className="bg-blue-500 p-4">
        <div className="flex items-center justify-between">
          <div className="text-white text-xl font-semibold">My App</div>
          {user ? (
            <button
              onClick={logoutUser}
              className="bg-white text-blue-500 px-4 py-2 rounded-md"
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-white text-blue-500 px-4 py-2 rounded-md"
              onClick={() => window.location.replace("/login")}
            >
              Login
            </button>
          )}
        </div>
      </nav>
      </>
    );
  }