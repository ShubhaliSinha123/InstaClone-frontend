import useInput from "../hooks/use-input";
import { NavLink, useNavigate } from "react-router-dom";
import loginBg from "../assets/images/login-bg.JPG";
import { blue } from "@mui/material/colors";

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
        password,
      }),
    });

    const data = await result.json();

    if (data.status === 404 || !data) {
      window.alert("Login failed!");
    } else {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.jwtoken);
      window.alert("Successfully logged in!");

      navigate("/dashboard");
    }
  };

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";
  const passwordInputClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <div className="row m-0">
      <div className="login-bg">
        <img
          src={loginBg}
          style={{ height: "600px", marginLeft: "43%" }}
          alt="Login background"
        />
      </div>
      <div className="login-container">
        <div
          className="app"
          style={{
            marginLeft: "-5%",
            width: "60%",
            height: "80%",
            border: "1px solid #ccc",
          }}
        >
          <h1>Instagram</h1>
          <br />
          <form
            onSubmit={formSubmitHandler}
            method="POST"
            style={{ width: "90%" }}
          >
            <div className={emailInputClasses}>
              <input
                type="text"
                id="email"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                placeholder="Email"
                value={email}
              />
              {emailInputHasError && (
                <p className="error-text">Email must not be empty.</p>
              )}
            </div>
            <br />
            <div className={passwordInputClasses}>
              <input
                type="text"
                id="password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                placeholder="Password"
                value={password}
              />
              {passwordInputHasError && (
                <p className="error-text">Password must not be empty. </p>
              )}
            </div>
            <div className="form-actions">
              <button
                disabled={!formIsValid}
                style={
                  formIsValid
                    ? { backgroundColor: blue[600] }
                    : { backgroundColor: "lightblue" }
                }
              >
                Login
              </button>
              <br />
              <br />
              <p style={{textAlign: "right"}}>Don't have an account? <NavLink to="/register">Register</NavLink></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
