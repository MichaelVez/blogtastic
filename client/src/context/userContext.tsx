import React, { useContext, useState } from "react";
type states = {
  token: { token: string | undefined };
  setToken: React.Dispatch<
    React.SetStateAction<{
      token: string;
    }>
  >;
  userState?: { userName?: string; email?: string; img?: string; _id?: string };
  user: {
    user: {
      email: string;
      tokens: never[];
      userName: string;
      _id: string;
      img: string;
    };
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      email: string;
      tokens: [];
      userName: string;
      _id?: string;
      img?: string;
    }>
  >;
};
const initState: states = {
  token: { token: undefined },
  setToken: () => {},
  user: {
    user: {
      userName: "",
      email: "",
      tokens: [],
      _id: "",
      img: "",
    },
  },
  setUser: () => {},
};

export const useUserContext = () => useContext(AppContext);
export const AppContext = React.createContext<Partial<states>>(initState);
export const ContextProvider = (props: any) => {
  const [token, setToken] = useState({ token: "1" });
  const [userState, setUser] = useState({});
  const data = { token, setToken, userState, setUser };
  return (
    <AppContext.Provider value={data}>{props.children}</AppContext.Provider>
  );
};
