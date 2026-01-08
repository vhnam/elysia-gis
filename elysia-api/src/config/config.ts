const privateConfig = {
  apiPort: 4000,
};

const publicConfig = {};

export type PublicConfig = typeof publicConfig;

export type PrivateConfig = typeof privateConfig;

export { privateConfig, publicConfig };
