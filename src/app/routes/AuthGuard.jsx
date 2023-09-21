import { Route, Routes, Navigate } from "react-router-dom";

const checkValidRole = (role) => {
  let status = false;

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && role === user.role && localStorage.getItem("token")) {
    status = true;
  }
  return status;
};

const AuthGuard = ({ element, ...rest }) => {
  return checkValidRole(rest.role) ? (
    <Routes>
      <Route {...rest} element={element} path={rest.path}></Route>
    </Routes>
  ) : (
    <Routes>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AuthGuard;
