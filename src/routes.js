import React from "react";
// import { AuthProvider } from "./helpers/AuthContext";
import { ProvideAuth } from "@utils/hooks/useAuth";
import { Router } from "@reach/router";
import HomePage from '@pages/Home';
import LoginPage from '@pages/Login';

import DashboardLayout from './layouts/DashboardLayout';
import NotFound from "@pages/NotFound";

const Routes = () => (
  <div>
    <ProvideAuth>
      <Router>
        <HomePage path="/" />
        <LoginPage path="/login" />

        <DashboardLayout path="/dashboard">
          <HomePage path="/" />
          <NotFound default />
        </DashboardLayout>

        <NotFound default />
      </Router>
    </ProvideAuth>
  </div>
);

export default Routes;
