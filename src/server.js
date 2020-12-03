require('dotenv').config();
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import helmet from "helmet";

const { PORT, NODE_ENV, CMS_APP_API_URL } = process.env;
const dev = NODE_ENV === 'development';

polka().use(
	helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          // Has to be unsafe-eval because %sapper.scripts% uses eval
          // @ts-expect-error
          scriptSrc: ["'self' 'unsafe-eval'"],
          // Has to be unsafe-inline currently, because svelte-awesome & svelte-image sets inline style
          styleSrc: ["'self' 'unsafe-inline'"],
          // data: needed for svelte-image placeholders and svelte-awesome icons
          imgSrc: ["'self'", 'data:'],
          // localhost:10000 needed by __sapper__ itself
          connectSrc: ["'self'", 'http://localhost:10000'],
        },
      },
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
