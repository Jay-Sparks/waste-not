import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import style from './UserSignIn.module.css';
import { signInWithGoogle } from '../../firebase';
import { auth } from '../../firebase';

const UserSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const history = useNavigate();

  const signInWithEmailAndPasswordHandler = async (event, email, password) => {
    // event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push('/');
    }
    catch(error){
      setError('Error Signing up with email and password');
      console.error("Error signing in with password and email", error);
    }
  };

  const change = event => {
    const {name, value} = event.currentTarget;

    if (name === 'userEmail') {
        setEmail(value);
    }
    else if (name === 'userPassword'){
      setPassword(value);
    }
  };

  const submit = event => {
    signInWithEmailAndPasswordHandler(event, email, password);
  }

  const signInWithGoogleHandler = async () => {
    // event.preventDefault();
    try {
      await signInWithGoogle();;
    }
    catch(error){
      setError('Error Signing in with google');
      console.error("Error signing in with google", error);
    }
    finally {

      history.push('/');
    }
  };

  const cancel = () => {
   this.props.history.push('/');
  }

  return (
    <div className={style.UserSignIn}>
      <div className={style.SignInWrapper}>
        <h3>Sign In</h3>

        <button
          className={style.GoogleButton} onClick={signInWithGoogleHandler}>
          Sign in with Google
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
          submitButtonText="Sign In"
          elements={() => (
            <React.Fragment>
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
          <Link to = "/passwordReset" className="text-blue-500 hover:text-blue-600">
            Forgot Password?
          </Link>
        </p>
        <p>
          Don't have a user account yet? <Link to="/signup">Click here</Link> to sign up!
        </p>
      </div>
    </div>
  );
}

export default UserSignIn;
