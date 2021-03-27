import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import '~antd/dist/antd.css';

const Home = lazy(() => import('../pages/Home/Home'));
const About = lazy(() => import('../pages/About/About'));
const Antd = lazy(() => import('../pages/Antd/Antd'));
const Form = lazy(() => import('../pages/Form/Form'));
const RcForm = lazy(() => import('../pages/RcForm/RcForm'));



function Routes() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/antd" component={Antd} />
                    <Route path="/form" component={Form} />
                    <Route path="/rcForm" component={RcForm} />
                </Switch>
            </Suspense>
        </Router>
    );
}

export default Routes;
