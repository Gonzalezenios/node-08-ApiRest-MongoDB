const express = require('express');
const morgan = require('morgan');
const config = require('../../config');
const logger = require('../logger');
const swaggerUi = require('swagger-ui-express');
const e = require('express');

class ExpressServer {

    constructor() {
        this.app = express();
        this.port = config.port;
        this.basePathAuth = `${config.api.prefix}/auth`;
        this.basePathUser = `${config.api.prefix}/users`;

        this._middlewares();

        this._swaggerConfig();

        this._routes();

        this._notFound();

        this._errorHandler();

    }

    _middlewares() {
        this.app.use(express.json());
        this.app.use(morgan('tiny'));
    }

    _routes() {

        this.app.head("/status", (req, res) => {
            res.status(200).end();
        });

        this.app.get("/gitflow", (req, res) => {
            res.status(200).json({
                test: 'gitflow'
            });
        });

        this.app.use(this.basePathAuth, require('../../routes/auth'));
        this.app.use(this.basePathUser, require('../../routes/users'));
    }

    _notFound() {
        this.app.use((req, res, next) => {
            const err = new Error("Not Found");
            err.code = 404;
            next(err);
        });
    }

    _errorHandler() {
        this.app.use((err, req, res, next) => {
            const code = err.code || 500;

            logger.error(`${code} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            logger.error(err.stack);

            res.status(code);
            const body = {
                error: {
                    code,
                    message: err.message,
                    detail: err.data
                }
            };
            res.json(body);
        });
    }

    _swaggerConfig() {
        this.app.use(
            config.swagger.path,
            swaggerUi.serve,
            swaggerUi.setup(require('../swagger/swagger.json')));
    }

    async start() {
        this.app.listen(this.port, (error) => {
            if (error) {
                logger.error(err);
                process.exit(1);
                return;
            }
        });
    }
}

module.exports = ExpressServer;