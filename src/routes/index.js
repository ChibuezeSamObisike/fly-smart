import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import LandingPage from "../pages/landingpage";
import SignIn from "../pages/Signin";
import Flights from "../pages/flights";
import DashbordTemplate from "../pages/admin/dashboardTry";
import CreateTerminal from "../pages/admin/createTerminal";
import ManageJets from "../pages/admin/ManageJets";
import UploadReceipt from "./../pages/admin/uploadInvoice";
import ViewQuotes from "./../pages/admin/viewquotes";
import QuoteViewsDashboard from "../pages/admin/quoteViewsDashboard";
import Invoice from "./../pages/admin/invoice";
import EmailSent from "../pages/emailSent";
import ManageReservation from "../pages/admin/ManageReservation";

const routes = [
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <SignIn /> },
  { path: "/new-quote/", element: <Flights /> },
  {
    path: "/admin/dashboardTry",
    element: (
      <ProtectedRoutes>
        <DashbordTemplate />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/create-terminal",
    element: (
      <ProtectedRoutes>
        <CreateTerminal />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/admin/manage-jets",
    element: (
      <ProtectedRoutes>
        <ManageJets />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/admin/upload-receipt",
    element: (
      <ProtectedRoutes>
        <UploadReceipt />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/admin/quotes",
    element: (
      <ProtectedRoutes>
        <ViewQuotes />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/quotes/:id",
    element: (
      <ProtectedRoutes>
        <QuoteViewsDashboard />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/invoice/:id",
    element: (
      <ProtectedRoutes>
        <Invoice />
      </ProtectedRoutes>
    ),
  },
  { path: "/email", element: <EmailSent /> },
  {
    path: "/admin/manage-reservation",
    element: (
      <ProtectedRoutes>
        <ManageReservation />
      </ProtectedRoutes>
    ),
  },
  { path: "*", element: <h1>404 | Not found</h1> },
];

const protectedRoutes = [];

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route exact path={path} element={element} key={path} />
          ))}
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
