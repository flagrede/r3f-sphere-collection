// .storybook/main.js
const path = require('path')
const WindiCSS = require('vite-plugin-windicss').default

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'storybook-builder-vite',
  },
  async viteFinal(config, { configType }) {
    config.plugins = config.plugins ?? []
    config.plugins.push(
      WindiCSS({
        config: path.join(__dirname, '..', 'tailwind.config.js'),
      })
    )
    return config
  },
}
