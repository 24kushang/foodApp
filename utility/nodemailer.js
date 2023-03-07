const nodemailer = require('nodemailer')

module.exports.sendMail = async function sendMail (str, data){
    try{
        console.log("Hello world");
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'kushangharia24@gmail.com', // generated ethereal user
                pass: "rfrbgbhcovuvatvd" // generated ehereal password
            }
        })

        var Osubject, Otext, Ohtml;
        if (str == 'signup'){
            Osubject = `Thank you for signing up ${data.name}`
            Ohtml = `
            <h1>Welcome to foodApp.com</h1>
            Hope you have a good time!
            Here are your details - 
            Name - ${data.name},
            Email - ${data.email}
            `
        } else if (str == "resetpassword") {
            Osubject = 'Reset password'
            Ohtml = `
            <h1>foodApp.com
            here is the link to reset your password :
            ${data.resetPasswordLink} </h1>
            `
        }

        let info = await transporter.sendMail({
            from: "kushangharia24@gmail.com",
            to: data.email,
            subject: Osubject,
            html: Ohtml
        })
        console.log("Message send: %s", info.messageId)
    }
    catch(err){
        console.log(err.message);
    }
}