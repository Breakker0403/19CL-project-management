import React, { useState } from "react";
import { navigate } from '@reach/router';

const AuthContext = React.createContext();

const AuthProvider = props => {
  const [isAuth, setIsAuth] = useState(false);

  const login = () => {
    setIsAuth(true);
    navigate(`/dashboard`);
  }

  const logout = () => {
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        login: login,
        logout: logout
      }}
    >
      { props.children }
    </AuthContext.Provider>
  )
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
