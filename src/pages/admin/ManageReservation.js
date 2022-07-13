import React from "react";
import DashbordTemplate from "./dashboardTry";
import BookedUsers from "../../components/admin/BookedUsers";

const ManageReservation = () => {
  return (
    <DashbordTemplate>
      <BookedUsers />
    </DashbordTemplate>
  );
};

export default ManageReservation;
