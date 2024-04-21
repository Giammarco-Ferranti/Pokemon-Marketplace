import React from "react";
import AuthProvider from "./utils/Auth/AuthContext";
import Routes from "./Routes";

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
