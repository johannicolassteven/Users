import React, { useReducer } from "react";

const userContext = React.createContext();

const initialState = {
  users: [],
  showColors: false,
  sotByCountry: false,
  originalUsers: [],
  filterCountry: null,
};

const userProvider = ({ children }) => {
  const toggleColors = () => {
    return !showColors;
  };

  const toggleSortByCountry = () => {
    return (prevState) => !prevState;
  };

  const handleReset = () => {
    return originalUsers.current;
  };

  const handleDelete = (email) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    return filteredUsers;
  };

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === "string"
      ? users.filter((user) => {
          return user.location.country
            .toLocaleLowerCase()
            .includes(filterCountry.toLocaleLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    return sortByCountry
      ? filteredUsers.toSorted((a, b) => {
          return a.location.country.localeCompare(b.location.country);
        })
      : filteredUsers;
  }, [filteredUsers, sortByCountry]);

  return (
    <userContext.Provider value={{ users, showColors, toggleColors, toggleSortByCountry, handleReset,handleDelete, filteredUsers, sortedUsers }}>
      {children}
    </userContext.Provider>
  );
};

export default userContext;
