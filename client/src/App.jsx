import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import { AuthContext } from "./AuthContext";
import Dashboard from "./Dashboard.jsx";
import Login from "./Login.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
          <AuthContext>
            <Route path="/dashboard" element={<Dashboard />} />
          </AuthContext>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
