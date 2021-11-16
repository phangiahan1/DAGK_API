const nodemailer = require("nodemailer");

exports.sendmailTeacher = (req, res) => {
    const output = `
    <p>Hello,</p>
    <p>invited you to co-teach</p>
    <button><a href="http://localhost:5000">Join</a></button>
    <h3>If you accept, your contact information will be shared with the class members and applications they authorize to use Classroom.</h3>
    <h3>Forward to only those you trust. Anyone with this email may be able to accept the invitation.</h3>
  `;
    const email = req.params.email;
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'phanhan226@gmail.com', // generated ethereal user
            pass: 'phangiahan220918', // generated ethereal password
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: '"TH CLASSROOM" <phanhan22@example.com>', // sender address
        to: email, // list of receivers
        subject: "Invitation to co-teach", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};