import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { loginUser } from "../../redux/reducer";


class Auth extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value
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
            <div className="Auth">
                <input
                    type='text'
                    placeholder='username'
                    name="username"
                    value={username}
                    onChange={(e) => this.changeHandler(e)}
                />
                <input
                    type='text'
                    placeholder='password'
                    name="password"
                    value={password}
                    onChange={(e) => this.changeHandler(e)}
                />
                <button onClick={this.login}>Login</button>
                <button onClick={this.register}>Register</button>
            </div>
        );
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps,{loginUser})(Auth);