import DashbordTemplate from "./dashboardTry";
import Receipt from "../../components/admin/receipt";
import InvoiceComponent from "../../components/admin/invoiceComponent";
import { Typography } from "@mui/material";

const UploadReceipt = () => {
  return (
    <DashbordTemplate>
      <Receipt />
    </DashbordTemplate>
  );
};

export default UploadReceipt;
