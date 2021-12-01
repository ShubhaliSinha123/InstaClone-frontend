import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./components/homePage";
import Login from "./components/login";
import MainPage from "./components/mainPage";
import Posts from "./components/posts";
import Register from "./components/register";
import Welcome from "./components/welcome";

function App() {
  return (
    <div className="app">
        <Switch>
          <Route path= '/' exact>
            <Redirect to='/welcome' />
          </Route>
          <Route path= '/welcome'>
            <Welcome />
          </Route>
          <Route path= '/register' exact>
            <Register />
          </Route>
          <Route path= '/login' exact>
            <Login />
          </Route>
          <Route path= '/homePage' exact>
            <HomePage />
          </Route>
          <Route path= '/posts' exact>
            <Posts />
          </Route>
          <Route path= '/mainPage' exact>
            <MainPage />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
