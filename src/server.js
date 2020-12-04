require('dotenv').config();
import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import helmet from "helmet";
import { v4 as uuidv4 } from "uuid";
const { createProxyMiddleware } = require('http-proxy-middleware');

const { PORT, NODE_ENV, CMS_APP_API_URL } = process.env;
const dev = NODE_ENV === 'development';

let app = express();

app.use((req, res, next) => {
	res.locals.nonce = uuidv4();
	next();
});

app.use(createProxyMiddleware('/', {target: 'https://dash.garageratz.com'}));

app.use(
        helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          // Has to be unsafe-eval because %sapper.scripts% uses eval
          // @ts-expect-error
          scriptSrc: ["'self' 'unsafe-eval'", (_req, res) => `'nonce-${res.locals.nonce}'`],
          // Has to be unsafe-inline currently, because svelte-awesome & svelte-image sets inline style
          styleSrc: ["'self' 'unsafe-inline'"],
          // data: needed for svelte-image placeholders and svelte-awesome icons
          imgSrc: ["'self'", 'data:'],
          // localhost:10000 needed by __sapper__ itself
          connectSrc: ["'self'", 'https://garageratz.com:10000'],
	  mediaSrc: ["'self'"],
	  upgradeInsecureRequests: [],
        },
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
