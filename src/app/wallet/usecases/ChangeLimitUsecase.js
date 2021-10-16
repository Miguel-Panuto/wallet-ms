const makeWallet = require('src/app/wallet/entities/WalletReturnEntity');
const makeLimit = require('src/app/wallet/entities/LimitEntity');

const fileName = 'ChangeLimitUsecase';

module.exports = ({ logger, walletRepository }) => ({
  change: async (id, data) => {
    const callName = `${fileName}.change()`;
    logger.info(
      `${callName} entered with id: ${id}. And data: ${JSON.stringify(data)}`
    );
    const newLimit = makeLimit(data);
    if (typeof newLimit.limit !== 'number') throw new Error('invalid limit');
    await walletRepository.updateByUserId(id, data);
    return makeWallet(await walletRepository.findWalletByUserId(id));
  },
});
