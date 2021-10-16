const makeUser = require('src/app/user/entities/UpdateUserEntity');

const fileName = 'UpdateUserUsecase';

module.exports = ({ logger, walletRepository }) => ({
  update: async (user) => {
    const callName = `${fileName}.update()`;
    logger.info(`${callName} entered with data: ${JSON.stringify(user)}`);
    const userSchema = makeUser(user);
    logger.info(`${callName} preparing to update...`);
    await walletRepository.updateByUserId(user.id, userSchema);
    const newUser = await walletRepository.findWalletByUserId(user.id);
    logger.info(
      `${callName} user updated to new data: ${JSON.stringify(newUser)}`
    );
  },
});
