require("dotenv").config();
import * as nodemailer from 'nodemailer';
import {Transporter} from 'nodemailer';
import ejs from 'ejs';
import path, { format } from 'path';
import exp from 'constants';
import { send } from 'process';


interface EmailOptions{
    email:string;
    subject:string;
    template:string;
    data:{[key:string]:any};

}


const sendMail=async (options:EmailOptions):Promise<void>=>{
    const Transporter: Transporter= nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:parseInt(process.env.SMTP_PORT||'587'),
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        },
    });

    const {email,subject,template,data}=options;

    //get the path to the email template file

    const templatePath=path.join(__dirname,'../mails',template);

    //render the email template with ejs

    const html:string= await ejs.renderFile(templatePath,data);

    const mailOptions={
        form:process.env.SMTP_MAIL,
        to:email,
        subject,
        html
    };


    await Transporter.sendMail(mailOptions);
};


export default sendMail;
