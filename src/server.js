require('dotenv').config();
import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import helmet from "helmet";


const { PORT, NODE_ENV, CMS_APP_API_URL } = process.env;
const dev = NODE_ENV === 'development';

let app = express();

app.use(
        helmet({
      contentSecurityPolicy:{
        directives: {
                defaultSrc: ["'self'", "https://dash.garageratz.com"],
                scriptSrc: ["'self' 'unsafe-eval'"],
                styleSrc: ["'self' 'unsafe-inline'" ],
                imgSrc: ["'self'", 'data:', "https://dash.garageratz.com", ],
                connectSrc: ["'self'", "https://dash.garageratz.com","https://localhost:10000",],
               mediaSrc: ["'self'", "https://dash.garageratz.com"],
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
