const path = require("path");
module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, "src/components/"),
      '@helpers': path.resolve(__dirname, "src/helpers/"),
      '@layouts': path.resolve(__dirname, "src/layouts/"),
      '@modules': path.resolve(__dirname, "src/modules/"),
      '@pages': path.resolve(__dirname, "src/pages/"),
      '@services': path.resolve(__dirname, "src/services/"),
      '@utils': path.resolve(__dirname, "src/utils/"),
    }
  }
}