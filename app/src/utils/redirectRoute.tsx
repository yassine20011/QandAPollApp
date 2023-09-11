/**
 * The `RedirectRoute` component redirects the user to a specified path if they are authenticated,
 * otherwise it renders the specified component.
 * @returns The code is returning a JSX element. If the `user` is truthy, it returns a `<Navigate>`
 * component with the `to` prop set to the value of `redirectPath`. If the `user` is falsy, it returns
 * the `Component` passed as a prop.
 */
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import React from 'react';

interface RedirectRouteProps {
  component: React.ComponentType;
  redirectPath: string;
  [key: string]: any;
}

export default function RedirectRoute({
  component: Component,
  redirectPath,
  ...rest
}: RedirectRouteProps) {
  const { user } : any = useContext(AuthContext);

  return user ? <Navigate to={redirectPath} /> : <Component {...rest} />;
}
