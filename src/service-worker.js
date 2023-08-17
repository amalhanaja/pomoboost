import { build, files, prerendered, version } from '$service-worker';
import { precacheAndRoute } from 'workbox-precaching';

console.log(process.env.NODE_ENV);

const precacheList = [...build, ...files, ...prerendered].map((file) => ({
	url: file,
	revision: version
}));

precacheAndRoute(precacheList);
