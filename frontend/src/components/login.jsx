import React, { useState, useEffect, useContext} from "react";
import AuthContext from "../context/AuthContext";

export default function Login() {
  let {loginUser} = useContext(AuthContext);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={
          loginUser
        }
        >

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
