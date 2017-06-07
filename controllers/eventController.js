var User = require('../models/User');




exports.getlist = function(req, res) {
	console.log("event controller - getList reached, eventName:", req.params.eventName)
 
    User.find({ eventName:req.params.eventName }, function(err, users) {
      if (!users) {
        return res.status(401).send({ msg: 'The event ' + req.params.eventName + ' has no subscribed attendees.'
        });
      } else {
      	res.json({attendees: users})
      }
      

    });
	
};



exports.checkIn = function(req,res){
	console.log('checking user in ', req.body.person)

 	User.findByIdAndUpdate(req.body.person._id ,req.body.person, {new: false}, function(err, user){
 		console.log('found user', user);
 	})
}

exports.updateAttendeeDetails = function(req,res){
	console.log('updateAttendeeDetails ', req.body.person)

 	User.findByIdAndUpdate(req.body.person._id ,req.body.person, {new: false}, function(err, user){
 		console.log('updated details of', user);
 	})
}