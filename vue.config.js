const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  lintOnSave: false,
  devServer: {
    // I forgot why I turned this one, but if I turn it on Firebase Auth
    // no longer works due to invalid SSL cert. ugh...
    https: false
  },
  chainWebpack: config => {
    config.optimization.minimizer("terser").tap(args => {
      const { terserOptions } = args[0]
      // This is needed because base model class determines the model name at runtime and it must match the db collection name.
      // Which won't match if it's mangled.
      terserOptions.keep_fnames = true
      return args
    })
  }
};
