import axios from 'axios'

const initialState = {
    user: {},
    userId: 0,
    isLoggedIn: false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const GET_USER = 'GET_USER'
const USER_ID = 'USER_ID'
const SET_POSTS = 'SET_POSTS'

export function loginUser(user) {
    return {
        type:LOGIN_USER,
        payload: user
    }
}

export function logoutUser() {
    return {
        type:LOGOUT_USER,
        payload: initialState
    }
}

export function getUser() {
    const user = axios.get('/api/auth/user')
    return {
        type:GET_USER,
        payload: user
    }
}

export function sendUser(userId) {
    return {
        type: USER_ID,
        payload: userId
    }
}

export function setPosts(payload){
    return{
        type: SET_POSTS,
        payload
    }
}
export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, user:action.payload, isLoggedIn: true}
        case LOGOUT_USER:
            return {...state,...action.payload}
        case GET_USER + 'PENDING':
            return this
        case GET_USER + 'FULFILLED':
            return {...state, user: action.payload.data, isLoggedIn: true}
        case GET_USER + 'REJECTED':
            return initialState
        case SET_POSTS:
            return {...state, posts: action.payload}
        default:
            return initialState
    }
}