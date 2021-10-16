module.exports = ({ walletController }) => [
  {
    method: 'get',
    path: '/wallet/:id',
    handler: walletController.resumeWallet,
  },
  {
    method: 'post',
    path: '/wallet/:id',
    handler: walletController.movement,
  },
  {
    method: 'put',
    path: '/wallet/:id',
    handler: walletController.limitChanged,
  },
];
