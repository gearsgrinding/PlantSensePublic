//module.exports = router;
var hypothesisSchema = require('../models/Models').hypothesisSchema;
var dataSchema = require('../models/Models').Data;
var path = require('path');
var schedule = require('node-schedule');
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', isLoggedIn , function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
    app.get('/test.ejs',function(req, res) {
      res.sendfile(path.resolve('views/test.ejs'));
  });
    app.get('/data.ejs',function(req, res) {
        dataSchema.find(function(err, data) {
            if (err)
                res.send(err);

            res.render(path.resolve('views/data.ejs'),{data:data});
                
        })

    });
    app.get('/home.ejs',function(req, res) {
      dataSchema.find(function(err, data) {
            if (err)
                res.send(err);

            res.render(path.resolve('views/home.ejs'),{data:data});
        })
  });
    app.get('/logging.ejs',function(req, res) {
      dataSchema.find(function(err, data) {
            if (err)
                res.send(err);

            res.render(path.resolve('views/logging.ejs'),{data:data});
        })
  });
    app.get('/history.ejs',function(req, res) {
        hypothesisSchema.find(function(err, hypothesis) {
            if (err)
                res.send(err);

            var experiments = hypothesis;
            res.render(path.resolve('views/history.ejs'),{experiments: experiments});
        })

    });

    app.get('/current.ejs',function(req, res) {
     hypothesisSchema.find(function(err, hypothesis) {
        if (err)
            res.send(err);

        var experiments = hypothesis;
        res.render(path.resolve('views/current.ejs'),{experiments: experiments});
    })

 });

    app.get('/login', function(req, res) {
        res.render('login.ejs',{ message: req.flash('loginMessage') }); // load the index.ejs file
    });

    app.get('/signup', function(req, res) {
        res.render('signup.ejs',{ message: req.flash('signupMessage') }); // load the index.ejs file
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login'); // load the single view file (angular will handle the page changes on the front-end)

    });

    app.post('/Temp',function(req, res) {

        var j = schedule.scheduleJob('5 * * * *', function(){

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

                var data = new dataSchema();
                console.log(req.body);
                data.field = "Temperature";
                data.unit = "Celsius";
                data.measure = Temp;
                data.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json("success")
                })
            });

   });
          res.json(Temp);
      });


});



app.get('/light',function(req, res) {
    var j = schedule.scheduleJob('5 * * * *', function(){
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
          var data = new dataSchema();
          console.log(req.body);
          data.field = "Light";
          data.unit = "Lumens";
          data.measure = this.value;
          data.save(function(err) {
            if (err)
                res.send(err);

            res.json("success")
        });

      });
       res.json("success");
       console.log('router in use');
   });
  });
});

app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

app.get('/dashboard',isLoggedIn, function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

 /*   app.post('/hypothesis',function(req, res) {
        hypothesis = new hypothesisSchemaModel({
        	hypothesis:req.body.hypothesis
        });

        hypothesis.save(function(err){
        		if(!err) {
        		}else {
        		}
        });
        res.redirect('/dashboard');
    }); */

app.post('/hypothesis',function(req, res, next) {
    var hypothesisTemp = new hypothesisSchema();
    hypothesisTemp.hypothesis = req.body.hypothesis;
    hypothesisTemp.dataX = req.body.dataX;
    hypothesisTemp.dataY = req.body.dataY;
    hypothesisTemp.corelation = req.body.corelation;
    hypothesisTemp.terminated = false;
    hypothesisTemp.startTime = new Date();

    hypothesisTemp.save(function(err) {
        if (err)
            res.send(err);

        res.json("post");
    })
    res.redirect('/');
});

app.get('/hypothesis',function(req, res, next) {
   hypothesisSchema.find(function(err, hypothesis) {
    if (err)
        res.send(err);

    res.json(hypothesis);
})
        // res.redirect('/');
    });

app.get('hypothesis/:id', function(req, res) {
    hypothesisSchema.get({_id: req.params.id}, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
                return res.send(err); // 500 error
            }
        });
});

app.put('hypothesis/:id', function(req, res) {
    hypothesisSchema.updateById(req.params.id, req.body, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
                return res.send(err); // 500 error
            }
        });
});

app.delete('hypothesis/:id', function(req, res) {
    hypothesisSchema.removeById({_id: req.params.id}, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            console.log(err);
                return res.send(err); // 500 error
            }
        });
});

app.post('/data',function(req, res, next) {
    var data = new dataSchema();
    
    if (typeof req.body.date != "undefined") {
      data.date = req.body.date;
    }
    else {
      data.date = Date.now();
    }
    data.pH = req.body.pH;
    data.light = req.body.light;
    data.temp = req.body.temp;
    if (typeof req.body.height != "undefined") {
      data.height = req.body.height;
    }
    if (typeof req.body.colour != "undefined") {
      data.colour = req.body.colour;
    }

    data.save(function(err) {
        if (err)
            res.send(err);

        res.json("success")
    })
});

app.get('/data',function(req, res, next) {
   dataSchema.find(function(err, hypothesis) {
    if (err)
        res.send(err);

    res.json(hypothesis);
})
});



app.get('/dataBetween',function(req, res, next) {
   var time1 = req.body.time1;
   var time2 = req.body.time2;

   dataSchema.find.sort([['date', 'descending']]).all(function (data) {

    for (i=0;i<data.length;i++) {
        if (data[i].date < time1 || data[i]>time2) {
            data.splice(i,1);
        }
    }
    res.json(data);
});
});



app.get('/dataAfter',function(req, res, next) {

   var time1 = req.body.time1;
   dataSchema.find.sort([['date', 'descending']]).all(function (data) {

    for (i=0;i<data.length;i++) {
        if (data[i].date < time1) {
            data.splice(i,1);
        }
    }
    res.json(data);
});

});

app.put('/finish/:id/:conclusion/:concludingText', function(req, res) {

    req.body.terminated = true;
    req.body.endTime  = Date.now();
    req.body.conclusion = req.params.conclusion;
    req.body.concludingText = req.params.concludingText;
    req.body.correlation = req.params.corelation;
    hypothesisSchema.update({_id: req.params.id}, req.body,{upsert:true}, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
                return res.send(err); // 500 error

            }
        });
});

app.post('/logging',function(req, res, next) {
    console.log(req.body.height);
    req.params.height = req.body.height;
    req.params.colour = req.body.colour;
    dataSchema.update({_id: req.body.id}, req.body,{upsert:true}, function(err, result) {
        if (!err) {
            
        } else {
                return res.send(err); // 500 error

            }
        });
    res.redirect('/');
});

};


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
