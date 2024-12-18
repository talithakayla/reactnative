import React, { createContext, useState, useContext } from "react";

const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(20000000); // initial balance

  const addBalance = (amount) => {
    setBalance((prevBalance) => prevBalance + amount);
  };

  return (
    <BalanceContext.Provider value={{ balance, addBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  return useContext(BalanceContext);
};
