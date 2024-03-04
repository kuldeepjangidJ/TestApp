import React, { useContext, useState } from 'react';


Variables
export const Variables = {
  AUTH: 'AUTH',
  USER: 'USER'
}

export const UserContext = React.createContext({
  isAuth: false,
  updateIsAuth: () => { },
  userData: {},
  updateUserData: () => { },
});
export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({});
  return (
    <UserContext.Provider
      value={{
        isAuth,
        updateIsAuth: setIsAuth,
        userData,
        updateUserData: setUserData,
      }}>
      {children}
    </UserContext.Provider>
  );
};
export const useAuth = () => {
  const { isAuth, updateIsAuth } = useContext(UserContext);
  return { isAuth, updateIsAuth };
};
export const useUser = () => {
  const { userData, updateUserData } = useContext(UserContext);
  return { userData, updateUserData };
};
