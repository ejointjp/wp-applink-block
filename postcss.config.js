module.exports = (ctx) => {
  return {
    map: ctx.options.map,
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      'postcss-preset-env': {
        stage: 3,
        features: {
          'nesting-rules': false
        },
        autoprefixer: {}
      },
      'postcss-sort-media-queries': {},
      ...(ctx.env === 'production' ? { cssnano: {} } : {})
    }
  }
}
