const makeWallet = require('src/app/wallet/entities/WalletReturnEntity');

const fileName = 'MoneyMovementUsecase';

module.exports = ({ logger, walletRepository }) => ({
  move: async (id, data) => {
    const callName = `${fileName}.move()`;
    logger.info(
      `${callName} entered with id: ${id}. And data: ${JSON.stringify(data)}`
    );
    const userWallet = makeWallet(
      await walletRepository.findWalletByUserId(id)
    );
    let cash = userWallet.cash;
    if (data.isDeposity) cash += data.amount;
    else cash -= data.amount;
    if (cash < 0 && Math.abs(cash) > userWallet.limit) {
      logger.info(`${callName} user ${id} insuficient money`);
      return {
        error: { message: 'insuficient money' },
        balance: {
          ...makeWallet(await walletRepository.findWalletByUserId(id)),
          name: undefined,
        },
      };
    }
    logger.info(`${callName} user ${id} new balance: R$${cash}`);
    await walletRepository.updateByUserId(id, { cash });
    return makeWallet(await walletRepository.findWalletByUserId(id));
  },
});
