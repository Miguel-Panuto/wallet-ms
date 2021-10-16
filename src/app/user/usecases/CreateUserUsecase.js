const fileName = 'CreateUserUsecase';
const makeUser = require('src/app/user/entities/UserEntity');

module.exports = ({ logger, walletRepository }) => ({
  create: async (data) => {
    const callName = `${fileName}.create()`;
    logger.info(`${callName} entered with data: ${JSON.stringify(data)}`);
    const user = makeUser(data);
    const createdUser = await walletRepository.createWallet(user);
    logger.info(
      `${callName} user has been created: ${JSON.stringify(createdUser)}`
    );
  },
});
