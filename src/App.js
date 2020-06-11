import React, {Component} from 'react';
import './App.css';
import Nav from "./components/Nav/Nav";
import routes from "./routes";
import {withRouter} from 'react-router'

class App extends Component {
    constructor() {
        super();
        this.state = {
            showNav: true
        }
    }

    isThisAnythingButAuth() {
        return this.props.location.pathname !== '/';
    }


    render() {
        const renderNav = () => {
            if (this.isThisAnythingButAuth()) {
                return <Nav/>
            }
        }
        return (
            <div className="App">
                {renderNav()}
                {routes}
            </div>
        );
    }


}

const AppWithRouter = withRouter(App);
export default AppWithRouter;
