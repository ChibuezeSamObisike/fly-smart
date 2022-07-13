import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [clientBookingDetails, setClientBookingDetails] = useState({});

  return (
    <AppContext.Provider
      value={{ clientBookingDetails, setClientBookingDetails }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
