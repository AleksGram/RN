import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  email: "",
  authenticate: (token, email) => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [authEmail, setAuthEmail] = useState(null);

  function authenticate(token, email) {
    console.log("authenticate====>>>>>", email);

    setAuthToken(token);
    AsyncStorage.setItem("token", token);
    setAuthEmail(email);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
    setAuthEmail(null);
  }

  const value = {
    token: authToken,
    email: authEmail,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
