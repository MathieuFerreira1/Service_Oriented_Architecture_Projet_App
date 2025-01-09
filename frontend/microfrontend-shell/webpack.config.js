const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  output: {
    uniqueName: 'shell',
    publicPath: 'http://localhost:4200/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        auth: 'auth@http://localhost:4201/remoteEntry.js',
        users: 'users@http://localhost:4202/remoteEntry.js',
        messages: 'messages@http://localhost:4203/remoteEntry.js',
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true },
        "@angular/common": { singleton: true, strictVersion: true },
        "@angular/router": { singleton: true, strictVersion: true },
      },
    }),
  ],
};
