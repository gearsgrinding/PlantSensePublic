var express = require('express');
var router = express.Router();
var Box = require('../models/TestSchema');
var router = express.Router();

router.use(function(req, res, next){
	next();
})

router.route('/Boxes')
	.post(function(req, res) {
		var box = new Box();
		box.name = req.body.name;
		console.log(req.body.name);
		if (typeof req.body.name  != 'undefined') {
			box.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.json({ message:'created new box'});
			});
		}
		else {
			res.send('no request body')
		}
	})

	.get(function(req, res) {
        Box.find(function(err, boxes) {
            if (err)
                res.send(err);

            res.json(boxes);
        });
   });

router.route('/Boxes/:box_id')
    .get(function(req, res) {
        Box.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json("success");
        });
    });

router.route('*/view1')
	.get(function(req, res){
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

	router.route('*/view2')
	.get(function(req, res){
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

	router.route('*')
		.get(function(req, res) {
        res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
   			

   	});


module.exports = router;




