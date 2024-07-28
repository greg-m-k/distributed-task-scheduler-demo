import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import TaskPage from './TaskPage';
import MetricsPage from './MetricsPage';
import AboutPage from './AboutPage';

const App = () => (
    <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Task Scheduler</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/metrics">Metrics</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                </ul>
            </div>
        </nav>
        <div className="container mt-4">
            <Switch>
                <Route path="/metrics" component={MetricsPage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/" component={TaskPage} />
            </Switch>
        </div>
    </Router>
);

export default App;