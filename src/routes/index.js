import { Router } from 'express'

import WhatsappBot from '../controllers/WhatsappBot'

const routes = Router()


routes.get('/', (req, res) => res.send('OK'))
routes.post('/api/v1/incoming', WhatsappBot.googleSearch)



export default routes