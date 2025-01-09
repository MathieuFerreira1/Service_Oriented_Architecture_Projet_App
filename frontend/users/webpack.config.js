const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  output: {
    uniqueName: 'users', // Nom unique pour le micro frontend Users
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'users', // Nom de l'application Remote
      filename: 'remoteEntry.js', // Fichier exposé
      exposes: {
        './Module': './src/app/users.module.ts', // Module Angular exposé
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true },
        "@angular/common": { singleton: true, strictVersion: true },
        "@angular/router": { singleton: true, strictVersion: true },
      },
    }),
  ],
};
