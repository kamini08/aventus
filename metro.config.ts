import { getDefaultConfig } from '@expo/metro-config';

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  return {
    ...config,
    transformer: {
      ...config.transformer,
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      ...config.resolver,
      sourceExts: [...(config.resolver?.sourceExts ?? []), 'tsx', 'ts', 'jsx', 'js'],
      assetExts: [...(config.resolver?.assetExts ?? []), 'ttf'], // For SpaceMono font
    },
  };
})();