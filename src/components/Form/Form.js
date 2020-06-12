import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios'


class Form extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }

    onHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // imgHandleChange = (e) => {
    //     this.setState({
    //         imgUrl: URL.createObjectURL(e.target.value)
    //     })
    // }

    createPost = () => {
        const userId = this.props.user.userId
        const {title, img, content} = this.state
        axios.post(`/api/new`, {title, img, content, userId})
            .then(res => {
                this.props.history.push('/dashboard')
            })
            .catch(error => console.log(error))
    }
    render() {
        const {title, img, content} = this.state
        return (
            <div className="Form">
                <input name='title'
                       value={title}
                       onChange={(e) => this.onHandleChange(e)}/>
                <input name='img'
                       value={img}
                       onChange={(e) => this.onHandleChange(e)}/>
                <input name='content'
                       value={content}
                       onChange={(e) => this.onHandleChange(e)}/>
                <button onClick={() => this.createPost()}>Post</button>
            </div>
        );
    }
}
const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Form);