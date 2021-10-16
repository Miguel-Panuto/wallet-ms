const makeWallet = require('src/app/wallet/entities/WalletReturnEntity');

const fileName = 'ResumeWalletUsecase';

module.exports = ({ logger, walletRepository }) => ({
  find: async (id) => {
    const callName = `${fileName}.find()`;
    logger.info(`${callName} entered with id: ${id}`);
    const wallet = await walletRepository.findWalletByUserId(id);
    logger.info(`${callName} wallet finded: ${JSON.stringify(wallet)}`);
    return makeWallet(wallet);
  },
});
