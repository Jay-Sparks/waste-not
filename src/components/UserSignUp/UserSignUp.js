import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import style from './UserSignUp.module.css';

import { auth, generateUserDocument, signInWithGoogle } from '../../firebase';

const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const history = useNavigate();
  
  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    // event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
      history.push('/');
    }
    catch(error){
      setError('Error Signing up with email and password');
    }
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const change = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  const submit = event => {
    createUserWithEmailAndPasswordHandler(event, email, password);
  }

  const cancel = () => {
   this.props.history.push('/');
  }

  return (
    <div className={style.UserSignUp}>
      <div className={style.SignUpWrapper}>
        <h3>Sign Up</h3>

        <button
          className={style.GoogleButton} onClick={signInWithGoogle}>
          Sign up with Google
        </button>

        <h5>or</h5>
        {error !== null && (
          <div>
            {error}
          </div>
        )}
        <Form
          cancel={cancel}
          submit={submit}
          submitButtonText="Sign Up"
          elements={() => (
            <React.Fragment>
              <input
                id="displayName"
                name="displayName"
                type="text"
                value={displayName}
                onChange={change}
                placeholder="Name" />
              <input
                id="userEmail"
                name="userEmail"
                type="email"
                value={email}
                onChange={change}
                placeholder="E-mail" />
              <input
                id="userPassword"
                name="userPassword"
                type="password"
                value={password}
                onChange={change}
                placeholder="Password" />
            </React.Fragment>
          )} />
        <p>
          Already have a user account? <Link to="/signin">Click here</Link> to log in!
        </p>
      </div>
    </div>
  );
}

export default UserSignUp;
