import './App.css';
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import { useSelector } from "react-redux";
import loadable from "@loadable/component";
import React from "react";
const Beranda = loadable(() => import("./pages/beranda"));
const Entry = loadable(() => import("./pages/entry"));
const Login = loadable(() => import("./pages/Login"));


function App() {
  const accessToken = useSelector((state) => state.accessToken);
  // const loading = useSelector((state) => state.loading);
  const routes = [
    { path: "/beranda", exact: true, component: () => <Beranda /> },
  ];
  const authRoutes = [
    { path: "/", exact: true, component: () => <Login /> },
    { path: "/beranda", exact: true, component: () => <Beranda /> },
    { path: "/entry", exact: true, component: () => <Entry /> },
  ];

  return (
    <>
    <Router>
        {accessToken === null ? (
          <>
            <Switch>
              {authRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.component />}
                />
              ))}
              <Route path="*">
                <h1>Not Found</h1>
              </Route>
            </Switch>
          </>
        ) : (
          <>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.component />}
                />
              ))}
              <Route path="*">
                <h1>Not Found</h1>
              </Route>
            </Switch>
          </>
        )}
      </Router>
      {/* <Router>
      <div class="text-center text-black">
        <nav>
          <ul class="text-center text-black">
            <li class="text-center text-black">
              <Link to="/">Login</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router> */}
    </>
  );
}

export default App;
