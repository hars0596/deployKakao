// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import DashboardPage from "../views/Dashboard/Dashboard";
import UserPage from "../views/FinalForm/UserForm";
import TableData from "views/TableData/TableList.jsx";
import ResetPassword from "views/ResetPassword/resetPasswordview.jsx";
const dashboardRoutes = [
  {
    path: "/dashboard/Home",
    sidebarName: "Dashboard",
    navbarName: "Welcome to Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/dashboard/form",
    sidebarName: "Create Masters",
    navbarName: "Profile",
    icon: Person,
    component: UserPage
  },
  {
    path: "/dashboard/userlist",
    sidebarName: "Statistics",
    navbarName: "Table Data",
    icon: "content_paste",
    component: TableData
  },
  {
    path: "/dashboard/resetPassword",
    sidebarName: "Reset Password",
    navbarName: "Reset Password",
    icon: "content_paste",
    component: ResetPassword
  },

  { redirect: true, path: "/", to: "/login", navbarName: "Redirect" }
];

export default dashboardRoutes;
