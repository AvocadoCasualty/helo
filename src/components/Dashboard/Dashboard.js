import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './Dashboard.css'
import {setPosts} from "../../redux/reducer";


class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            myPosts: true,
            posts: [],
            search: ''
        }
    }

    componentDidMount() {
        axios.get(`/api/dashboard/posts/?userPosts=true`).then(res => {
            this.setState({
                posts: res.data
            })
        })
            .catch(error => {
                console.log(error)
                alert(error)
            })

    }

    render() {
        const posts = this.state.posts.map((e) => {
            return (
                <div
                    className='individual-posts'
                    key={e.post_id}
                    onClick={() => this.props.history.push(`/post/${e.post_id}`)}>
                    <h2>{e.title}</h2>
                    <p>by {e.username}<img className='profile-pic' src={e.profile_pic}/></p>
                </div>
            )
        })

        return (
            <div className="Dashboard">
                <div className='search-bar'>
                    <div>
                        <input
                            className='search'
                            name='search'
                            // type={search}
                        />
                        <button onClick={this.blah}>Search</button>
                        <button onClick={this.bleck}>Reset</button>
                    </div>
                    <div>
                        <span>My Posts</span>
                        <input
                            type='checkbox'/>
                    </div>
                </div>
                <div className='posts'>
                    {posts}
                </div>
            </div>
        );
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Dashboard);