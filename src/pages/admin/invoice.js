import InvoiceComponent from "../../components/admin/invoiceComponent";
import DashbordTemplate from "./dashboardTry";
import BookedFlight from "../../components/BookedFlight";
import { Box } from "@mui/system";
import MyButton from "./../../styles/button";

const Invoice = () => {
  return (
    <DashbordTemplate>
      <BookedFlight />
      <h1>Kindly Upload an Invoice for this client</h1>
      <InvoiceComponent />
    </DashbordTemplate>
  );
};

export default Invoice;
