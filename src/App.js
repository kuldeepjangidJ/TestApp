import React from 'react';
import MainNavigation from './Navigation/MainNavigation';
import { UserProvider } from './Context/UserContext';

const App = () => {
  return (
    <UserProvider>
      <MainNavigation />
    </UserProvider>
  );
};

export default App;
