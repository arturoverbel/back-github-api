import config from '../src/config.js';

export default {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Github API Documentation',
			version: '1.0.0',
			description: 'API Github API',
		},
		servers: [
			{
				url: `${process.env.HOST || 'http://localhost'}:${config.port}/api`,
			},
		],
	},
	apis: ['./src/main.js', './src/router/*.js'], // Path to your API route files
};