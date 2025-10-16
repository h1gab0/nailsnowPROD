const twilio = require('twilio');

const sendWhatsAppMessage = (to, body) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    client.messages
        .create({
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
            body: body,
            to: `whatsapp:${to}`
        })
        .then(message => console.log(`WhatsApp message sent to ${to}: ${message.sid}`))
        .catch(error => console.error(`Failed to send WhatsApp message to ${to}:`, error));
};

module.exports = { sendWhatsAppMessage };