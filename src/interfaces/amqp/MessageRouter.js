module.exports = ({ pubSub, messageController }) => ({
  initiateRoutes: async () => {
    await pubSub.subscribe('userChange', messageController.onUserChange);
    await pubSub.subscribe('paymentReceived', messageController.onUserChange);
    await pubSub.subscribe('paymentSend', messageController.onUserChange);
  },
});
