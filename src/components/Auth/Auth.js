import React, {Component} from 'react';
import './Auth.css'
import axios from 'axios';
import {connect} from 'react-redux'
import {loginUser} from "../../redux/reducer";


class Auth extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = () => {
        const {username, password} = this.state
        axios.post('/api/auth/register', {username, password})
            .then(res => {
                this.props.loginUser(res.data)
                this.props.history.push('/dashboard')
            })
            .catch(error => {
                console.log(error)
                alert(error)
            })
    }
    login = () => {
        const {username, password} = this.state
        axios.post('/api/auth/login', {username, password})
            .then(res => {
                this.props.loginUser(res.data)
                this.props.history.push('/dashboard')
            })
            .catch(error => {
                console.log(error)
                alert(error)
            })
    }

    render() {
        const {username, password} = this.state
        return (
            <div className='auth-container'>
                <div className="Auth">
                    <img src="https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/helo_logo.png"/>
                    <h1>Helo</h1>
                    <input
                        type='text'
                        placeholder='username'
                        name="username"
                        value={username}
                        onChange={(e) => this.changeHandler(e)}
                    />
                    <br/>
                    <input
                        type='password'
                        placeholder='password'
                        name="password"
                        value={password}
                        onChange={(e) => this.changeHandler(e)}
                    />
                    <br/>
                    <button onClick={this.login}>Login</button>
                    <button onClick={this.register}>Register</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {loginUser})(Auth);