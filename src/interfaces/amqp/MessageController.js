const fileName = 'MessageController';

module.exports = ({
  logger,
  createUserUsecase,
  updateUserUsecase,
  deleteUserUsecase,
}) => ({
  onUserChange: async (msg) => {
    const callName = `${fileName}.onUserChange()`;
    logger.info(`${callName} entered, with payload: ${JSON.stringify(msg)}`);
    try {
      if (msg.event_type === 'create') {
        await createUserUsecase.create(msg.user);
      } else if (msg.event_type === 'update') {
        await updateUserUsecase.update(msg.user);
      } else if (msg.event_type === 'delete') {
        await deleteUserUsecase.delete(msg.user.id);
      }
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
    }
  },

  onPaymentReceived: async (msg) => {
    const callName = `${fileName}.onPaymentReceived()`;
    logger.info(`${callName} entered, with payload: ${JSON.stringify(msg)}`);
    try {
      
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
    }
  },

  onPaymentSend: async (msg) => {
    const callName = `${fileName}.onPaymentSend()`;
    logger.info(`${callName} entered, with payload: ${JSON.stringify(msg)}`);
    try {
      
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
    }
  },
});
