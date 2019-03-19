class BasicConfig {
  constructor({config}) {
    config = config || {};
    this.username = config.username || null;
    this.password = config.password || null;
  }
}

module.exports = BasicConfig;
