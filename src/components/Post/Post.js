import React, {Component} from 'react';
import {connect} from 'react-redux'
import {requestPost} from "../../redux/reducer";
import axios from "axios";


class Post extends Component {
    constructor() {
        super();
        this.state = {
            img: '',
            editing: false
        }
    }

    componentDidMount() {
        this.getPost()
    }

    getPost = () => {
        axios.get(`/api/posts/${+this.props.match.params.postid}`).then(res => this.props.requestPost(res.data[0]))
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    editImg(postId) {
        const img = this.state.img
        axios.put(`/api/new/${postId}`, {img})
            .then(() => this.getPost())
            .catch(error => console.log(error))
    }

    editToggle = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    render(props) {
        const {title, content, img, post_id} = this.props.post
        return (
            <div className="Post">
                <div></div>
                <h2>{title}</h2>
                {this.state.editing ? (
                    <div>
                        <input
                            name='img'
                            onChange={(e) => this.handleChange(e)}/>
                        <button onClick={() => {
                            this.editImg(post_id)
                            this.editToggle()
                        }}>Update
                        </button>
                    </div>
                ) : null}
                <img src={img} onClick={this.editToggle}/>
                <p>{content}</p>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.currentPost
    }
}

export default connect(mapStateToProps, {requestPost})(Post);