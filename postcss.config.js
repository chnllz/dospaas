module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px2rem-exclude': {
      remUnit: 192,
      exclude: /^((?!(\\views\\monitor\\flexible\\)|(\/views\/monitor\/flexible\/)).)*$/i
    }
  }
}
