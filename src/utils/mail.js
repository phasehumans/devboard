import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendMail= async (options) => {
    const mailGenerator= new Mailgen({
        theme: 'default',
        product: {
            name: 'DevBoard',
            link: 'https://devboard.js'
        }
    })

    const emailHtml = mailGenerator.generate(options.mailgenContent);

    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    const emailText = mailGenerator.generatePlaintext(options.mailgenContent);


    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "maddison53@ethereal.email",
            pass: "jn7jnAPss4f63QBp6D",
        },
    });


    const mail= {
        from: "mail.taskmanager@example.com", // We can name this anything. The mail will go to your Mailtrap inbox
        to: options.email, // receiver's mail
        subject: options.subject, // mail subject
        text: emailTextual, // mailgen content textual variant
        html: emailHtml, // mailgen content html variant
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {

        // As sending email is not strongly coupled to the business logic it is not worth to raise an error when email sending fails
        // So it's better to fail silently rather than breaking the app

        console.error("email service failed silently, Make sure you have provided your MAILTRAP credentials in the .env file")
        console.error("error:", error)
    }

}


const emailVerificationMailgenContent= (username, verficationUrl) =>{
    return {
        body: {
            name: username,
            intro: 'Welcome to DevBoard! We\'re very excited to have you on board.',
            action: {
                instructions: 'To verify your email, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Verify your email',
                    link: verficationUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}

const forgotPasswordMailgenContent= (username, passwordResetUrl) =>{
    return {
        body: {
            name: username,
            intro: 'We got request to reset the password of your account',
            action: {
                instructions: 'To reset password, click on the following button',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Reset Password',
                    link: passwordResetUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}


export {sendMail, emailVerificationMailgenContent, forgotPasswordMailgenContent}