import StyleCSSAndHeadersTemplate from "./templates/StylesAndHeaders";
import LastWordsInEMailWithEndHTMLTegs from "./templates/LastWordsAndTegs";
import { getUserDetails } from './templates/DetailsForUser';

import nodemailer from "nodemailer";
import path from "path";

async function EMailCodeBuilder({ email, titleHTML, EMAILContent, details = false, request = null, fromName = "CW ID" }) {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    if (details) {
        const userDetailsJSON = JSON.parse(await getUserDetails(request));
        var htmlContent = `
        ${await StyleCSSAndHeadersTemplate(titleHTML)}
        ${EMAILContent}
        <div class="details">
            <p>Details:</p>
            <p>⌚ / 📅 Time and date: ${userDetailsJSON.date} at ${userDetailsJSON.time}.
            <br/>📍 IP-Address: ${userDetailsJSON.ip}.
            <br/>🏞 GEO-Data: ${userDetailsJSON.location}.
            <br/>💻 Operating system: ${userDetailsJSON.os}.
            <br/>🌐 Browser: ${userDetailsJSON.browser}.</p>
            <br/>
        </div>
        ${await LastWordsInEMailWithEndHTMLTegs()}
        `;
    } else {
        var htmlContent = `
        ${await StyleCSSAndHeadersTemplate(titleHTML)}
        ${EMAILContent}
        ${await LastWordsInEMailWithEndHTMLTegs()}
        `;
    }

    await transporter.sendMail({
        from: `"${fromName}" <${process.env.EMAIL_USERNAME}>`,
        to: email,
        subject: titleHTML,
        html: htmlContent,
        attachments: [
            {
                filename: "cw_id_logo_for_dark.png",
                path: path.join(process.cwd(), "public/storage/cw_id", "cw_id_logo_for_dark.png"),
                cid: "logo_cw_id",
            },
            {
                filename: "logo.png",
                path: path.join(process.cwd(), "public/storage", "Logo_CW_CodeWriter.png"),
                cid: "logo_cw",
            }
        ],
    });

    transporter.verify((error, success) => {
        if (error) {
            console.error("SMTP connection error: ", error);
        } else {
            console.log("SMTP connection successfully established");
        }
    });
}

export default EMailCodeBuilder;