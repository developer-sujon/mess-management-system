const express = require('express');
const docsRoute = require('./docs.route');
const authRoute = require('./auth.route');
const profileRoute = require('./profile.route');
const memberRoute = require('./member.route');
const roleRoute = require('./role.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/profile',
    route: profileRoute,
  },
  {
    path: '/member',
    route: memberRoute,
  },
  {
    path: '/role',
    route: roleRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
