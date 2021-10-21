const makeWallet = require('src/app/wallet/entities/WalletReturnEntity');

const fileName = 'OnTransaction';

module.exports = ({
  logger,
  walletRepository,
  pubSub,
  config: {
    amqp: { pubs },
  },
}) => ({
  move: async (transaction) => {
    const callName = `${fileName}.move()`;
    logger.info(
      `${callName} entered with data: ${JSON.stringify(transaction)}`
    );
    const from = {
      ...makeWallet(
        await walletRepository.findWalletByUserId(transaction.from_id)
      ),
      id: transaction.from_id,
    };
    const to = {
      ...makeWallet(
        await walletRepository.findWalletByUserId(transaction.to_id)
      ),
      id: transaction.to_id,
    };
    const fromLimit = from.cash + from.limit;
    if (transaction.cash_amount > fromLimit) {
      logger.info(`${callName} user ${from.id} insuficient money`);
      await pubSub.publish(pubs[1].topicName, {
        id: transaction.id,
        status_id: 4,
      });
      return {
        error: { message: 'insuficient money' },
        balance: {
          ...makeWallet(await walletRepository.findWalletByUserId(id)),
          name: undefined,
        },
      };
    }
    const fromNewBalance = from.cash - transaction.cash_amount;
    const toNewBalance = to.cash + transaction.cash_amount;
    logger.info(
      `${callName} user from ${from.id} new balance: R$${fromNewBalance}`
    );
    logger.info(
      `${callName} user to ${from.id} new balance: R$${toNewBalance}`
    );
    await walletRepository.updateByUserId(from.id, { cash: fromNewBalance });
    await walletRepository.updateByUserId(to.id, { cash: toNewBalance });
    await pubSub.publish(pubs[1].topicName, {
      id: transaction.id,
      status_id: 3,
    });
    return {
      from: makeWallet(await walletRepository.findWalletByUserId(from.id)),
      to: makeWallet(await walletRepository.findWalletByUserId(to.id)),
    };
  },
});
