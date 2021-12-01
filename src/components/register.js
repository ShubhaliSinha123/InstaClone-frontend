import { useHistory } from "react-router";
import useInput from "../hooks/use-input";

const Register = () => {
  const history = useHistory();

  const {
    value: name,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: email,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@gmail.com"));

  const {
    value: phone,
    isValid: enteredPhoneIsValid,
    hasError: phoneInputHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhoneInput,
  } = useInput((value) => value.length === 8);

  const {
    value: password,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: cpassword,
    isValid: enteredCPasswordIsValid,
    hasError: CpasswordInputHasError,
    valueChangeHandler: CpasswordChangeHandler,
    inputBlurHandler: CpasswordBlurHandler,
    reset: resetCPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: role,
    isValid: enteredRoleIsValid,
    hasError: roleInputHasError,
    valueChangeHandler: roleChangeHandler,
    inputBlurHandler: roleBlurHandler,
    reset: resetRoleInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPhoneIsValid &&
    enteredPasswordIsValid &&
    enteredCPasswordIsValid &&
    enteredRoleIsValid
  ) {
    formIsValid = true;
  }

  const registerHandler = async (event) => {
    event.preventDefault();

    if (
      !enteredNameIsValid &&
      !enteredEmailIsValid &&
      !enteredPhoneIsValid &&
      !enteredPasswordIsValid &&
      !enteredCPasswordIsValid &&
      !enteredRoleIsValid
    ) {
      return;
    }

    const result = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
        role,
      }),
    });
    const data = await result.json();
    
    if (data.status === 403 || !data) {
      window.alert("Invalid registeration!");
      console.log("Invalid registeration!");
    } else {
      window.alert("Registeration successful");
      console.log("Registeration successful");

      history.push('/login');
    }
    
          resetNameInput();
          resetEmailInput();
          resetPhoneInput();
          resetPasswordInput();
          resetCPasswordInput();
          resetRoleInput();
  };

  const nameClasses = nameInputHasError ? "form-control invalid" : "form-control ";
  const emailClasses = emailInputHasError ? "form-control invalid" : "form-control ";
  const phoneClasses = phoneInputHasError ? "form-control invalid" : "form-control ";
  const passwordClasses = passwordInputHasError ? "form-control invalid" : "form-control ";
  const cPasswordClasses = CpasswordInputHasError ? "form-control invalid" : "form-control ";
  const roleClasses = roleInputHasError ? "form-control invalid" : "form-control ";

  return (
    <form>
      <div className={nameClasses}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={name}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty!</p>
        )}
      </div>
      <div className={emailClasses}>
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={email}
        />
        {emailInputHasError && (
          <p className="error-text">E-mail must not be empty!</p>
        )}
      </div>
      <div className={phoneClasses}>
        <label htmlFor="phone">Phone no.</label>
        <input
          type="text"
          id="phone"
          onChange={phoneChangeHandler}
          onBlur={phoneBlurHandler}
          value={phone}
        />
        {phoneInputHasError && (
          <p className="error-text">Phone must not be empty!</p>
        )}
      </div>
      <div className={passwordClasses}>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={password}
        />
        {passwordInputHasError && (
          <p className="error-text">Password must not be empty!</p>
        )}
      </div>
      <div className={cPasswordClasses}>
        <label htmlFor="Cpassword">Confirm password</label>
        <input
          type="text"
          id="Cpassword"
          onChange={CpasswordChangeHandler}
          onBlur={CpasswordBlurHandler}
          value={cpassword}
        />
        {CpasswordInputHasError && (
          <p className="error-text">Re-type password!</p>
        )}
      </div>
      <div className={roleClasses}>
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          onChange={roleChangeHandler}
          onBlur={roleBlurHandler}
          value={role}
        />
        {roleInputHasError && (
          <p className="error-text">Role must not be empty!</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid} onClick={registerHandler}>
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
