const bcrypt = require('bcrypt');

module.exports = {
    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;

        const user = await db.check_user(username)
        if (!user[0]) {
            return res.status(404).send('No user found!')
        } else {
            const authenticated = bcrypt.compareSync(password, user[0].password)
            if (authenticated) {
                req.session.user = {
                    userId: user[0].user_id,
                    username: user[0].username,
                    profilePic: user[0].img
                }
                res.status(200).send(req.session.user)
            } else {
                res.status(403).send('Username or password incorrect')
            }
        }
    },
    register: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        const profilePic = `https://robohash.org/${username}.png?set=set4`

        const existingUser = await db.check_user(username);
        if (existingUser[0]) {
            return res.status(409).send('User already exists!')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = await db.register_user([username, hash, profilePic])
        delete newUser[0].hash
        req.session.user = newUser[0]
        return res.status(200).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getUser: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    },
    getPosts: (req, res) => {
        const db = req.app.get('db');
        const {userId} = req.session.user
        console.log(req.session.user)
        const {userPosts, search} = req.query


        if (userPosts === 'true' && !search) {
            db.get_all_posts()
                .then(posts => res.status(200).send(posts))
                .catch(error => res.status(500).send(error))
        } else if (userPosts === 'true' && search) {
            db.get_all_posts_with_search(search)
                .then(posts => res.status(200).send(posts))
                .catch(error => res.status(500).send(error))
        } else if (userPosts === 'false' && !search) {
            db.get_posts_no_user(userId)
                .then(posts => res.status(200).send(posts))
                .catch(error => res.status(500).send(error))
        } else if (userPosts === 'false' && search) {
            db.get_posts_search_no_user(search, userId)
                .then(posts => res.status(200).send(posts))
                .catch(error => res.status(500).send(error))
        } else {
            res.status(200).send(['missed all the the queries'])
        }

    },
    getOnePost: (req, res) => {
        const db = req.app.get('db')
        const {postId} = req.params

        db.get_single_post(postId)
            .then(post => res.status(200).send(post))
            .catch(error => res.status(500).send(error))

    },
    createPost: (req, res) => {
        const db = req.app.get('db')
        const {title, img, content, userId} = req.body

        db.new_post(title, img, content, userId)
            .then(post => res.status(200).send(post))
            .catch(error => res.status(500).send(error))
    }
}