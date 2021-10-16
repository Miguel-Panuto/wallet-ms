module.exports = (wallet) => ({
  name: wallet.name || null,
  cash: wallet.cash,
  limit: wallet.limit,
});
