import 'dotenv/config'
import app from './App'


const { APP_PORT = 3333 } = process.env

app.listen(APP_PORT, () => console.log(`App rodando na porta ${APP_PORT}`))