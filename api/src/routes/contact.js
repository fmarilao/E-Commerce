const router = require('express').Router();
const nodemailer = require('nodemailer');


router.post('/api/forma', (req, res) =>  {
    const data = req.body

    const smtpTransport = nodemailer.createTransport({
        service:'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth:{
            user:'agustindiegojaime@gmail.com',
            pass:'41926280asd'
        }
    });

    const mailOptions = {
        from: data.email,
        to: 'agustindiegojaime@gmail.com',
        subject: `Henry E-commerce contact from: ${data.name}`,
        html: ` <h3> Information </h3>
                    <ul> 
                    <li> Name: ${data.name} </li>
                    <li> Lastname: ${data.lastname} </li>
                    <li> Email: ${data.email} </li>
                    </ul>

                    <h3>Message</h3>
                    <p>${data.message}</p>
        `
    };

    smtpTransport.sendMail(mailOptions, (error, res) => {
        if(error) {
            res.send(error)
        }
        else{
            res.send('Success')
        }
    })

    smtpTransport.close();
})

module.exports = router;