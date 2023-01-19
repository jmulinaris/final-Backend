import * as dotenv from "dotenv";
import twilio from "twilio";
dotenv.config();

const account = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(account, authToken);

export const sendTwilioMsg = async (body, to) => {
    client.messages.create({
        body: body,
        to: to,
        from: process.env.TWILIO_NUMBER,
    }).then((msg) => console.log(`msg sent ${msg.sid}`))
}

export const sendTwilioWsp = async () => {
        client.messages.create({
        body: body,
        to: `whatsapp:${to}`,
        from: `whatsapp:${process.env.TWILIO_WSP_NUMBER}`,
    }).then((wsp) => console.log(`msg sent ${wpp.sid}`))
}