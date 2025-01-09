const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  output: {
    uniqueName: 'messages', // Nom unique pour le micro frontend Messages
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'messages', // Nom de l'application Remote
      filename: 'remoteEntry.js', // Fichier exposé
      exposes: {
        './Module': './src/app/messages.module.ts', // Module Angular exposé
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true },
        "@angular/common": { singleton: true, strictVersion: true },
        "@angular/router": { singleton: true, strictVersion: true },
      },
    }),
  ],
};
