
// BASE SETUP
// =============================================================================
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/staffList');

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});

var staff     = require('./app/models/staff');
// call the packages we need
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({exnted: true}));
app.use(bodyParser.json());

var port        = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================
var router      = express.Router();
// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(request, response, next){
  console.log('In the middle of something...');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(request, response){
  response.json({message: "Yhoo! I make the API now!!!"});
});

// more routes for our API will happen here
// on routes that end in /bears
// ----------------------------------------------------
router.route('/staff')
  .post(function(request, response){
    //CORS setup
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    var staffMember = new staff();

    staffMember.name = request.body.name;
    staffMember.age = request.body.age;

    staffMember.save(function(error){
      if (error) throw error;
      //response.json({message: staffMember.name + "(age "+ staffMember.age + ") is our staff now!"});
    });
  })

  .get(function(request, response){
    //CORS setup
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    staff.find(function(error, staff){
      if (error) throw error;
      response.json(staff);
    });
  })

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/staff/:staffID')
  .get(function(request, response, corsActivate){
    //CORS setup
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    staff.findById(request.params.staffID, function(error, staff){
      if (error) throw error;
      response.json(staff);
    });
  })

  .put(function(request, response){
    //CORS setup
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    staff.findById(request.params.staffID, function(error, staff){
      if (error) throw error;
      var oldName = staff.name;
      staff.name = request.body.name;
      staff.age = request.body.age;

      staff.save(function(error){
        if (error) throw error;
        //response.json({message: 'Now '+ oldName + ' is renamed to ' + staff.name + '(aged ' + staff.age + ')'});
      });
    });
  })

  .delete(function(request, response){
    //CORS setup
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    staff.remove({_id: request.params.staffID}, function(error, staff){
    var oldName = request.params.staffID;

    if (error) throw error;
      //response.json({message: oldName + ' is no longer our staff!'});
    });
  })

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magician is opening port ' + port);
