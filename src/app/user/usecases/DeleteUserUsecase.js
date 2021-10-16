const fileName = 'DeleteUserUsecase';

module.exports = ({ logger, walletRepository }) => ({
  delete: async (id) => {
    const callName = `${fileName}.delete();`;
    logger.info(`${callName} about to delete user with id: ${id}`);
    const user = await walletRepository.findWalletByUserId(id);
    logger.info(
      `${callName} user that is about to delete: ${JSON.stringify(user)}`
    );
    await walletRepository.deleteWalletByUserId(id);
  },
});
