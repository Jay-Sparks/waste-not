import React from 'react';
import Application from "./containers/Application/Application";
import UserProvider from "./providers/UserProvider";

const App = () => (
  <UserProvider>
    <Application />
  </UserProvider>
);

export default App;
