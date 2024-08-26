import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";

function PrivateRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }
      />
      <Route
        path="/signin"
        element={
          <GuestGuard>
            <SignIn />
          </GuestGuard>
        }
      />
     <Route
        path="/signup"
        element={
          <GuestGuard>
            <SignUp />
          </GuestGuard>
        }
      />
    </Routes>
  );
}

export default PrivateRoutes;
