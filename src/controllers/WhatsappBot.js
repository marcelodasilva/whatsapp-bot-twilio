import { google } from 'googleapis'

import 'dotenv/config'

import twilio from 'twilio'
const { TWILIO_SID, TWILIO_AUTH_TOKEN, GOOGLESEARCH_API_KEY, GOOGLESEARCH_ENGINE_KEY } = process.env


twilio(TWILIO_SID, TWILIO_AUTH_TOKEN)

const { MessagingResponse } = twilio.twiml
const customsearch = google.customsearch('v1');

class WhatsappBot {

    static async googleSearch(req, res, next) {
        const twiml = new MessagingResponse()

        const query = req.body.Body;

        try {
            const result = await customsearch.cse.list({
                auth: GOOGLESEARCH_API_KEY,
                cx: GOOGLESEARCH_ENGINE_KEY,
                q: query
            })

            const firstResult = result.data.items[0];
            const searchData = firstResult.snippet;
            const link = firstResult.link


            twiml.message(`${searchData} ${link}`)
            res.set('Content-Type', 'text/xml')
            return res.status(200).send(twiml.toString())

        } catch (error) {
            return next(error)

        }


    }

}


export default WhatsappBot