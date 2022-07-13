import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useNavigate } from "react-router-dom";
import http from "../../utils/http";
import { LoaderSmall } from "./../../loader/loader";

function createData(firstName, lastName, flightFrom, flightTo, date) {
  return {
    firstName,
    lastName,
    flightFrom,
    flightTo,
    date,
  };
}

const headCells = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },

  {
    id: "lastName",
    numeric: false,
    disablePadding: true,
    label: "Last Name",
  },

  {
    id: "flightFrom",
    numeric: false,
    disablePadding: true,
    label: "Flight From",
  },

  {
    id: "flightTo",
    numeric: false,
    disablePadding: true,
    label: "Flight To",
  },

  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
];

const BookedUsers = () => {
  const [bookedUsers, setBookedUsers] = useState([]);

  const getBookedFlight = async () => {
    try {
      let {
        data: { results },
      } = await http.get("quotes");
      console.log(results);

      results.forEach((flight) => {
        if (flight.booked_flight) {
          setBookedUsers([
            ...bookedUsers,
            {
              name: flight?.firstname,
              lName: flight?.lastname,
              id: flight?.id,
              flightFrom: flight?.flight_from,
              flightTo: flight?.flight_to,
              date: flight.flight_date,
            },
          ]);
        }
      });
      // setBookedUsers(
      //   results
      //   results.map((result) => {
      //     return {
      //       name: result.firstname,
      //       lName: result.lastname,
      //       id: result.id,
      //       flightFrom: result.flight_from,
      //       flightTo: result.flight_to,
      //       date: result.flight_date,
      //     };
      //   })
      // );
      console.log("Hi", results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBookedFlight();
  }, []);

  if (bookedUsers.length === 0) return <h1>No Flights Booked So far</h1>;
  return (
    <>
      <h1>Booked Flights</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell>{headCell.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookedUsers.map(
              ({ name, lName, id, flightFrom, flightTo, date }) => (
                <TableRow>
                  <TableCell>{name}</TableCell>
                  <TableCell>{lName}</TableCell>
                  <TableCell>{flightFrom}</TableCell>
                  <TableCell>{flightTo}</TableCell>
                  <TableCell>{date}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BookedUsers;
