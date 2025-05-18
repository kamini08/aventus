interface BabelConfig {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
}

interface BabelAPI {
    cache: (value: boolean) => void;
}

module.exports = function (api: BabelAPI): BabelConfig {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: ['react-native-reanimated/plugin'],
    };
};