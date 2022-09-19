import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from "react-redux";
import loadable from "@loadable/component";
import 'assets/styles/tailwind.css';
const Login = loadable(() => import("./pages/Login"));

// Tailwind CSS Style Sheet


function App() {
    const accessToken = useSelector((state) => state.accessToken);
    // const loading = useSelector((state) => state.loading);
    const routes = [
    //   { path: "/", exact: true, component: () => <Dashboard /> },
    //   { path: "/data-pokok", exact: true, component: () => <Master /> },
    //   { path: "/data-kuesioner", exact: true, component: () => <Kuesioner /> },
    //   { path: "/profile", exact: true, component: () => <Profile /> },
    //   {
    //     path: "/ganti-password",
    //     exact: true,
    //     component: () => <GantiPassword />,
    //   },
    //   { path: "/laporan", exact: true, component: () => <Laporan /> },
    ];
    const authRoutes = [{ path: "/", exact: true, component: () => <Login /> }];

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
            {/* <div className="md:ml-0">
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div> */}
        </>
    );
}

export default App;
