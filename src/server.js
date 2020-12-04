require('dotenv').config();
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import helmet from "helmet";
import uuid from "uuid";

const { PORT, NODE_ENV, CMS_APP_API_URL } = process.env;
const dev = NODE_ENV === 'development';


polka().use((req, res, next) => {
	res.locals.nonce = uuid();
	next();
});

polka().use(
        helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", "CMS_APP_API_URL", "https://*.garageratz.com"],
          // Has to be unsafe-eval because %sapper.scripts% uses eval
          // @ts-expect-error
          scriptSrc: ["'self' 'unsafe-eval'", (_req, res) => `'nonce-${res.locals.nonce}'`],
          // Has to be unsafe-inline currently, because svelte-awesome & svelte-image sets inline style
          styleSrc: ["'self' 'unsafe-inline'"],
          // data: needed for svelte-image placeholders and svelte-awesome icons
          imgSrc: ["'self'", 'data:', 'mediastream:', 'blob:'],
          // localhost:10000 needed by __sapper__ itself
          connectSrc: ["'self'", 'CMS_APP_API_URL' , 'https://localhost:10000'],
        },
      },
     referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    })
);

polka() // You can also use Express
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
