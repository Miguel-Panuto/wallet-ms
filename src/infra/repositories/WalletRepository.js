const fileName = 'WalletRepository';

module.exports = class WalletRepository {
  constructor({ logger, walletModel }) {
    this.logger = logger;
    this.walletModel = walletModel;
  }

  async createWallet(user) {
    const callName = `${fileName}.createWallet()`;
    this.logger.info(`${callName} entered with body: ${JSON.stringify(user)}`);
    return this.walletModel.create(user);
  }

  async findWalletByUserId(id) {
    const callName = `${fileName}.findWalletById()`;
    this.logger.info(`${callName} entered with id: ${id}`);
    return this.walletModel.findOne({ _userId: id });
  }

  async updateByUserId(id, obj) {
    const callName = `${fileName}.changeWallet()`;
    this.logger.info(
      `${callName} entered with id: ${id} . And body: ${JSON.stringify(obj)}`
    );
    await this.walletModel.findOneAndUpdate({ _userId: id }, obj);
  }
  
  async deleteWalletByUserId(id) {
    const callName = `${fileName}.delete()`;
    this.logger.info(`${callName} entered with id: ${id}`);
    return this.walletModel.deleteOne({ _userId: id });
  }
};
