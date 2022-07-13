import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MyButton from "../styles/button";
import http from "../utils/http";
import { LoaderSmall } from "../loader/loader";

export default function TableComponent({
  terminalData,
  handleIsEditing,
  getData,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async (id) => {
    try {
      setIsDeleting(true);
      const res = await http.delete(`terminals/${id}/`);
      await getData();
      setIsDeleting(false);
      console.log(res);
    } catch (ex) {
      console.log(ex);
      setIsDeleting(false);
    }
  };

  function createData(
    id,
    name,
    city,
    created_at,
    updated_at,
    deleteBtn,
    editBtn
  ) {
    deleteBtn = (
      <MyButton onClick={() => onDelete(id)}>
        {isDeleting ? "Deleting" : "Delete"}
      </MyButton>
    );
    editBtn = <MyButton onClick={() => handleIsEditing(id)}>Edit</MyButton>;
    return { id, name, city, created_at, updated_at, deleteBtn, editBtn };
  }

  const rows = [
    ...terminalData?.map((data) =>
      createData(
        data.id,
        data.name,
        data.city,
        data.created_at,
        data.updated_at
      )
    ),
  ];

  if (rows.length === 0) return <LoaderSmall />;
  return (
    <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Updated at</TableCell>
            <TableCell align="right">Actions</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">
                {new Date(row.created_at).toISOString().split("T")[0]}
              </TableCell>
              <TableCell align="right">
                {new Date(row.updated_at).toISOString().split("T")[0]}
              </TableCell>
              <TableCell align="right">{row.deleteBtn}</TableCell>
              <TableCell align="right">{row.editBtn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
