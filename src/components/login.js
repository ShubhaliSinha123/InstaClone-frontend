import useInput from "../hooks/use-input";
import { NavLink, useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  const {
    value: email,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@gmail.com"));

  const {
    value: password,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
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

    console.log(email);
    console.log(password);

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
      console.log("Login failed!");
    } else {
      console.log(data.jwtoken);
      localStorage.setItem('token', data.jwtoken);
      const setu = localStorage.getItem('token');
      console.log(setu);
      window.alert("Successfully logged in!");
      console.log("Successfully logged in!");

      history.push('/homePage');
    }

    resetEmailInput();
    resetPasswordInput();
  };

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";
  const passwordInputClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
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
  );
};

export default Login;
