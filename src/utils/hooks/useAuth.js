import React, { useState, useEffect, useContext, createContext } from "react";
import { login } from '../../services/auth';
import Cookies from 'js-cookie';

const TokenKey = 'token';

export function isToken() {
  return Cookies.get(TokenKey) !== undefined && Cookies.get(TokenKey) !== '';
}

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  
  // ... to save the user to state.
  const signin = (email, password) => {
    return login({ login: email.trim(), password: password })
      .then(res => {

        if (res.status === 400 ) {
          alert(res.errors.common);
          return;
        }

        if (res.status === 200) {
          const { id, role, token } = res.data;
          setUser({
            id,
            role,
            token,
          });
          setToken(token);
          
          return res;
        }
      })
  };

  // const signup = (email, password) => {
    // return firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(response => {
    //     setUser(response.user);
    //     return response.user;
    //   });
  // };

  // const signout = () => {
    // return firebase
    //   .auth()
    //   .signOut()
    //   .then(() => {
    //     setUser(false);
    //   });
  // };

  // const sendPasswordResetEmail = email => {
    // return firebase
    //   .auth()
    //   .sendPasswordResetEmail(email)
    //   .then(() => {
    //     return true;
    //   });
  // };

  // const confirmPasswordReset = (code, password) => {
    // return firebase
    //   .auth()
    //   .confirmPasswordReset(code, password)
    //   .then(() => {
    //     return true;
    //   });
  // };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(false);
  //     }
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    if (!isToken()) {
      setToken('');
    }
  }, []);
  
  // Return the user object and auth methods
  return {
    user,
    isToken,
    signin,
    // signup,
    // signout,
    // sendPasswordResetEmail,
    // confirmPasswordReset
  };
}