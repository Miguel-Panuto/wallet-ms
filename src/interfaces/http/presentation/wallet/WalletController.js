const fileName = 'WalletController';

module.exports = ({
  logger,
  resumeWalletUsecase,
  moneyMovementUsecase,
  changeLimitUsecase,
}) => ({
  resumeWallet: async (req, res) => {
    const callName = `${fileName}.resumeWallet()`;
    const { id } = req.params;
    try {
      logger.info(`${callName} entered with id: ${id}`);
      const wallet = await resumeWalletUsecase.find(id);
      const status = !wallet ? 204 : 200;
      return res.status(status).json(wallet);
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
      return res.status(403).json({ error: 'a error has been ocoured' });
    }
  },

  movement: async (req, res) => {
    const callName = `${fileName}.findUser()`;
    const { body, params } = req;
    try {
      const { id } = params;
      logger.info(
        `${callName} entered with id: ${id}. And body: ${JSON.stringify(body)}`
      );
      const response = await moneyMovementUsecase.move(id, body);
      const status = !response ? 204 : 200;
      return res.status(status).json(response);
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
      return res.status(403).json({ error: 'a error has been ocoured' });
    }
  },

  limitChanged: async (req, res) => {
    const callName = `${fileName}.findUser()`;
    const { body, params } = req;
    try {
      const { id } = params;
      logger.info(
        `${callName} entered with id: ${id}. And body: ${JSON.stringify(body)}`
      );
      const response = await changeLimitUsecase.change(id, body);
      const status = !response ? 204 : 200;
      return res.status(status).json(response);
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
      return res.status(403).json({ error: 'a error has been ocoured' });
    }
  },
});
