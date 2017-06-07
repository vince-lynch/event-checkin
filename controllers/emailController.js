 var nodemailer = require("nodemailer");



// create reusable transporter object using the default SMTP transport 
var transporter = nodemailer.createTransport( {
    host: "smtp.gmail.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
        user: "eventattendanceapp@gmail.com",
        pass: "totheworld!"
    }
});


exports.emailThankyou  = function(req,res){
	console.log("reached emailThankyou");
   

 	var theEvent = req.body.theEvent;
    var userEmail = req.body.user.email;
    
    var subject = "Event Attendance";

    var msgToSend = "Thankyou for attending the event";
    
    var htmlToSend = "Thankyou for attending the event";

    // setup e-mail data with unicode symbols 
    var mailOptions = {
        from: '"Event Attendance" <eventattendanceapp@gmail.com>', // sender address 
        to: userEmail, // list of receivers 
        subject: subject, // Subject line 
        text: msgToSend, // plaintext body 
        html: htmlToSend // html body 
    };
   
    // send mail with defined transport object 
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        if(info){
        console.log('Message sent: ' + info.response);
        }
    });




}//