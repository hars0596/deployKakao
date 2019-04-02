import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import LoginPage from "components/Login/LoginPage.jsx";
import UserPage from "views/FinalForm/UserPage";
import ResetPassword from "components/resetPassword/resetPassword.jsx"

import Event from "../utils/NewEventPage.jsx";
const indexRoutes = [
  { path: "/dashboard", component: Event(Dashboard) },
  {
    path: "/resetPassword",
    component: ResetPassword
  },
  {
    path: "/form",
    component: Event(UserPage)
  },
  {
    path: "/",
    component: LoginPage
  }

];

export default indexRoutes;
