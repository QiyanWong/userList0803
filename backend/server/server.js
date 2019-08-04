// server.js

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// 2nd part -- connect database and add data table
var User     = require('../models/user');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user');
// 2nd part

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


router.get('/', function(req, res) {
    console.log('this is in the get users---');
    User.find(function(err, users) {
      if (err) {
        res.send(err);
        //throw err;
      }
        res.status(200).json({users});
    });
});
// 3rd part - insert a user POST
// on routes that end in /users
// ----------------------------------------------------

    // create a user (accessed at POST http://localhost:8080/api/users)
router.post('/users', function(req, res) {
        console.log('This is in the post /users');
        const newUser = new User(req.body);
        console.log(req.body);
        newUser.save(err => {
          if (err) {
              res.status(500).json({err});
              console.log(err);
          } else {
              res.status(200).json({newUser});
          }
        });
        
    })
// 3rd part

// 4th part -- get the user list
// get all the user (accessed at GET http://localhost:8080/api/users)
// router.get('/users', function(req, res) {
//     console.log('This is in the get /users');
//         User.find(function(err, users) {
//             if (err)
//                 res.send(err);

//             res.status(200).json(users);
//         });
//     });
// 4th part

// 5th part - access an individual user
// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
	//;
// 5th part

// 6th part -- update
// update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function(req, res) {
        console.log(req.body);
        console.log(req.params.user_id);
        User.findByIdAndUpdate(req.params.user_id, req.body, (err) => {
            if (err) {
                res.set(header).status(500).json({err});
                throw err;
                //res.send(err);
            }
            res.status(200).json({message: `user ${req.params.user_id} edit success`});
        });
    })
        // use our user model to find the user we want
// 6th part

// 7th part - delete
// delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
// 7th part 

// 8th part - search
router.route('/search/:keyword')
    .get(function(req, res) {
        const keyword = req.params.keyword;
        User.find({
          $or: [{firstname : {$regex: keyword}}, {lastname : {$regex : keyword}}, {sex : keyword}]}, (err, users) => {
            console.log('server test keyword is', keyword);
            if (err) {
                throw err;
            }
            console.log(users);
            res.status(200).json(users);
        });
    })


// 8th part 

// 9th part - pagination
router.route('/count')
    .get(function(req, res) {
        User.count({}, (err, count) => {
        if (err) {
            throw err;
        }
        res.status(200).json({count});
        });
    });

router.route('/fetch')
    .get(function(req, res){
        User.findById(1000,(err, users) => {
        if (err) {
            throw err;
        }
        console.log("fetch success");
        res.status(200).json({users});
        });
    });

router.get('/range/:offset/:number', (req, res) => {
    const offset = parseInt(req.params.offset);
    const number = parseInt(req.params.number);
    User
        .find({})
        .skip(offset)
        .limit(number)
        .exec((err, user) => {
            if (err) {
                throw err;
            }
            res.status(200).json(user);
        });
});
// 9th part end

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
