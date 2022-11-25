import { createTransport } from 'nodemailer';
import {errorLogger} from "./logger.js";
import config from '../config.js';

const sendEmail = async (subject,html) => {
    const trasporter = createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "okenobi114@gmail.com",
            pass: config.gmail.password
        }
    })

    const mailOptions = {
        from: "Servidor Node",
        to: "ninanbudevelop@gmail.com",
        subject: subject,
        html: html
    }

    try {
        const info = await trasporter.sendMail(mailOptions)
    } catch (error) {
        errorLogger.error(error)
    }
}

export {
    sendEmail
}