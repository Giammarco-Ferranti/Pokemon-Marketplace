import React from "react";
import AuthProvider from "./utils/Auth/AuthContext";
import Routes from "./Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
