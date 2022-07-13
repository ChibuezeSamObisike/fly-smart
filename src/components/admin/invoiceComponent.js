import React, { useState, useRef } from "react";
import Pdf from "@mikecousins/react-pdf";
import MyButton from "./../../styles/button";
import { Box } from "@mui/material";
import { HiOutlineUpload } from "react-icons/hi";
import http from "../../utils/http";

const InvoiceComponent = () => {
  const fileInput = useRef(null);
  const [page, setPage] = useState(1);
  const [pdf, setPdf] = useState("");
  const [pdfVal, setPdfVal] = useState(null);

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    let x = URL.createObjectURL(e.target.files[0]);
    setPdf(x);
    setPdfVal(e.target.files[0]);
  };

  const invoiceUpload = async (id) => {
    const iData = new FormData();
    iData.append("invoice", pdfVal);
    try {
      const response = http.post(`quotes/${id}/upload-invoice/`, iData);
      console.log(response);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInput}
        onChange={(e) => handleChange(e)}
      />
      <Box sx={{ width: "25%" }}>
        <MyButton
          endIcon={<HiOutlineUpload />}
          onClick={() => fileInput.current.click()}
        >
          Upload Invoice
        </MyButton>
      </Box>

      {pdf && (
        <Pdf file={pdf} page={page}>
          {({ pdfDocument, pdfPage, canvas }) => {
            console.log(pdfDocument);
            return (
              <>
                {!pdfDocument && <span>Loading...</span>}
                {canvas}
                {Boolean(pdfDocument && pdfDocument.numPages) && (
                  <nav>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        width: "40%",
                      }}
                    >
                      <Box sx={{ width: "20%" }}>
                        <MyButton
                          disabled={page === 1}
                          onClick={() => setPage(page - 1)}
                        >
                          Previous
                        </MyButton>
                      </Box>
                      <Box sx={{ width: "20%", marginLeft: "20px" }}>
                        <MyButton
                          disabled={page === pdfDocument.numPages}
                          onClick={() => setPage(page + 1)}
                        >
                          Next
                        </MyButton>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        width: "30%",
                        marginTop: "20px",
                        marginLeft: "50px",
                        "&:hover": {
                          background: "none",
                          color: "white",
                        },
                      }}
                    >
                      <MyButton
                        sx={{
                          backgroundColor: "transparent",
                          border: "0.7px solid black",
                          color: "black",
                        }}
                        onClick={() => invoiceUpload()}
                      >
                        Send to client
                      </MyButton>
                    </Box>
                  </nav>
                )}
              </>
            );
          }}
        </Pdf>
      )}
    </>
  );
};

export default InvoiceComponent;
