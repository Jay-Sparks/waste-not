import React from 'react';
import { Navigate } from 'react-router-dom';

const UserSignOut = ({context}) => {
  context.actions.signOut();

  return (
    <Navigate to="/" replace={true} />
  );
}

export default UserSignOut;