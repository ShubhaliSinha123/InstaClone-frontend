import useInput from "../hooks/use-input";
import { NavLink, useNavigate } from "react-router-dom";

const Login = (props) => {
  
  const navigate = useNavigate();
  const {
    value: email,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes("@gmail.com"));

  const {
    value: password,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = async (event) => {

    event.preventDefault();

    if (!enteredEmailIsValid && !enteredPasswordIsValid) {
      return;
    }

    const result = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    });

    const data = await result.json();

    if(data.status === 404 || !data) {
      window.alert("Login failed!");
    } else {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.jwtoken);
      window.alert("Successfully logged in!");

      navigate('/dashboard');
    }
  };

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";
  const passwordInputClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <div className="app">
    <form onSubmit={formSubmitHandler} method="POST">
      <div className={emailInputClasses}>
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={email}
        />
        {emailInputHasError && (
          <p className="error-text">Email must not be empty.</p>
        )}
      </div>
      <div className={passwordInputClasses}>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={password}
        />
        {passwordInputHasError && (
          <p className="error-text">Password must not be empty. </p>
        )}
      </div>
      <div className="form-actions">
        New User! <NavLink to="/register">Register</NavLink>
        <button disabled={!formIsValid}>Login</button>
      </div>
    </form>
    </div>
  );
};

export default Login;
