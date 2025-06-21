/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  async viteFinal(config) {
    // HTMLファイルをアセットとして扱う設定を追加
    config.assetsInclude = [/\.html$/];

    // または配列がすでに存在する場合は追加する
    // if (Array.isArray(config.assetsInclude)) {
    //   config.assetsInclude.push(/\.html$/);
    // } else {
    //   config.assetsInclude = [config.assetsInclude, /\.html$/].filter(Boolean);
    // }

    return config;
  },
};
export default config;
