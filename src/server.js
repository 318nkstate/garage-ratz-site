require('dotenv').config();
import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import helmet from "helmet";
import { v4 as uuidv4 } from "uuid";

const { PORT, NODE_ENV, CMS_APP_API_URL } = process.env;
const dev = NODE_ENV === 'development';

let app = express();

app.use((req, res, next) => {
	res.locals.nonce = uuidv4();
	next();
});

app.use(
        helmet({
      contentSecurityPolicy:{
        directives: {
                defaultSrc: ["'self'", "https://dash.garageratz.com", "https://cdn.sender.net/accounts_resources/universal.js",  "https://www.google.com/recaptcha/ 'strict-dynamic'"],
                scriptSrc: ["'self' 'unsafe-eval'", "https://cdn.sender.net/accounts_resources/universal.js", "https://www.google.com/recaptcha/api.js", "https://cdn.jsdelivr.net/gh/cferdinandi/bouncer/dist/bouncer.polyfills.min.js", (_req, res) => `'nonce-${res.locals.nonce}'`],
                styleSrc: ["'self' 'unsafe-inline'", "https://cdn.sender.net/accounts_resources/forms.css"],
                imgSrc: ["'self'", 'data:', "https://dash.garageratz.com", "https://cdn.sender.net/accounts_resources/sender-logo-plain.png", "https://cdn.sender.net/accounts_resources/popups/sender-brand.png", "https://media3.giphy.com/"],
                connectSrc: ["'self'", "https://dash.garageratz.com","https://localhost:10000", "https://cdn.sender.net", "https://stats.sender.net/forms/", "https://www.google.com/recaptcha/api.js", "https://cdn.jsdelivr.net/gh/cferdinandi/bouncer/dist/bouncer.polyfills.min.js", "https://www.gstatic.com/"],
               mediaSrc: ["'self'", "https://dash.garageratz.com", "https://cdn.sender.net/accounts_resources/universal.js"],
		manifestSrc: ["'self'", "https://dash.garageratz.com"]
		}
        },
      referrerPolicy: {
                 policy: "strict-origin-when-cross-origin"
         },
      hsts: {
                maxAge: 31536000,
                preload: true,
         },
    })
);


app // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: () => ({
				CMS_APP_API_URL
			}),
			
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
