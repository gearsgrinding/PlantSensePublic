//module.exports = router;
var Hypothesis = require('../models/User').Hypothesis;

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs',{ message: req.flash('loginMessage') }); // load the index.ejs file
    });

    app.get('/signup', function(req, res) {
        res.render('signup.ejs',{ message: req.flash('signupMessage') }); // load the index.ejs file
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/'); // load the single view file (angular will handle the page changes on the front-end)
   	
    });

    app.get('*/view2',function(req, res) {
      var five = require("johnny-five");
			var myBoard, myLed;
			var Temp;

			myBoard = new five.Board();

			board.on("ready", function() {
		  var sensor = new five.Sensor("A0");

	  	// When the sensor value changes, log the value
	  	sensor.on("change", function(value) {
	    	Temp = log(((10240000/value) - 10000));
 				Temp = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * Temp * Temp ))* Temp );
 				Temp = Temp - 273.15;              // Convert Kelvin to Celsius
 				Temp = (Temp * 9.0)/ 5.0 + 32.0; // Celsius to Fahrenheit - comment out this line if you need Celsius
	  	});

			});
			res.json(Temp);
			console.log('router in use');
    });

    app.get('*/view1',function(req, res) {
      var five = require("johnny-five");
			var myBoard, myLed;

			myBoard = new five.Board();

			board.on("ready", function() {
		  	var val = new five.Sensor({
		  		pin: "A2",
		  		freq: 250
		  });

		  board.repl.inject({
		  	pot: photoresistor
		  });

		  photoresistor.on("data", function() {
	    	res.json(this.value);
	  	});

			});
				res.json("success");
				console.log('router in use');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/dashboard', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.post('/hypothesis',function(req, res) {
        hypothesis = new HypothesisModel({
        	hypothesis:req.body.hypothesis
        });

        hypothesis.save(function(err){
        		if(!err) {
        		}else {
        		}
        });
        res.redirect('/dashboard');
    });

    app.post('/hypothesis',function(req, res, next) {
        Hypothesis.create(req.body, function(err, result) {
            if (!err) {
                return res.json(result);
            } else {
                return res.send(err); // 500 error
            }
        });
    });
    
    app.get('hypothesis/:id', function(req, res) {
        Hypothesis.get({_id: req.params.id}, function(err, result) {
            if (!err) {
                return res.json(result);
            } else {
                return res.send(err); // 500 error
            }
        });
    });

    app.put('hypothesis/:id', function(req, res) {
        Hypothesis.updateById(req.params.id, req.body, function(err, result) {
            if (!err) {
                return res.json(result);
             } else {
                return res.send(err); // 500 error
             }
        });
    });

    app.delete('hypothesis/:id', function(req, res) {
        Hypothesis.removeById({_id: req.params.id}, function(err, result) {
            if (!err) {
                return res.json(result);
             } else {
                console.log(err);
                return res.send(err); // 500 error
             }
        });
    });

  };

  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}




