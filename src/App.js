import express from 'express'
import cors from 'cors'

import routes from './routes'



class App {
    constructor() {
        this.server = express()
        this.middlewares()
        this.routes()
        this.errorHandlers()
    }
    middlewares() {
        this.server.use(cors())
        this.server.use(express.urlencoded({ extended: false }))
        this.server.use(express.json())

    }
    routes() {
        this.server.use(routes)
    }

    errorHandlers() {
        this.server.use((req, res, next) => {
            const err = new Error('Not Found');
            err.status = 404;
            next(err)
        })

        this.server.use((err, req, res, next) => {
            res.status(err.status || 500).json({
                errors: {
                    message: err.message
                }
            })
        })

    }

}


export default new App().server