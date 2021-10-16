const { Router, json } = require('express');
const cors = require('cors');

module.exports = ({ walletRoutes, routerRegister }) => {
  const router = Router();
  router
    .use(cors())
    .use(json())
    .use('/api/v1', routerRegister.register(walletRoutes));
  return router;
};
