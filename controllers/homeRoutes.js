const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/withAuth');

router.get('/', async(req, res) => {
    try {
// get all posts and JOIN with user data         
const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
            });
            
            // Serialize data so the template can read it 
            const blogs = postData.map((post) => project.get({ plain: true }));
            

            //  const blogs = [
            //     {
                //      id: 1,
            //         title:"title",
            //         content: "content",
            //         author: "author",
            //         date: "1/17/2022"
            //     },
            //     {
                //      id: 2,
            //         title:"title2",
            //         content: "content",
            //         author: "author",
            //         date: "1/17/2022"
            //     },
            //     {
                        // id: 1,
            //         title:"title3",
            //         content: "content",
            //         author: "author",
            //         date: "1/17/2022"
            //     },
            // ];

            // Pass serial data and session flag into the template
            console.log('blogs', blogs);
            res.render(`homepage`, {
                blogs,
                logged_in: req.session.logged_in,
                });
    } catch (err) {
        res.status(500).json(err);
    }
});
// use withAuth middlewasre to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try{
        // find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
        
        const user = userData.get({ plain: true });
        
        console.log('user', user);

    
            res.render('dashboard', {
                ...user,
                logged_in: req.session.logged_in,
            });
        } catch (err) {
            res.status(500).json(err);
        }
    });
    
    router.get('/login', (req, res) => {
        // if the user is already logged in, redirect the request to another route
        if (req.session.logged_in) {
            res.redirect('/profile');
            return;
        }

        res.render('login');
    });
    router.get('/create-blog', (req, res) => {
        // If the user is already logged in, redirect the request to another route.
    // if (req.session.logged_in) {
    //     res.redirect('/profile');
    //     return;
    // }

    res.render('create-blog'{
        logged_in: true,
});
    });
router.get('/edit-blog', (req, res) => {
    // if (req.session.logged_in) {
    //     res.redirect('/profile');
    //     return;
    // }

    const blog = {
            id: 'id',
            title:"title2",
            content: "content",
            author: "author",
            date: "1/17/2022"
    },
    res.render('edit-blog',{
        ...blog,
        logged_in: true;
});
});

router.get('/blogs/:id', async (req, res) => {
    const postData = await Post.findByPK(req.params.id, {
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
        ],
    });
    const blog = postData.get({ plain: true });

    res.render('blog-page', {
        ...blog,
        logged_in: true,
    });
});



    module.exports = router;