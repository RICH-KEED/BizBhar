// CRA's webpack sets postcss-loader with config: false, so postcss.config.js
// is ignored unless we override via CRACO. mode: 'file' lets postcss-loader
// load postcss.config.js (Tailwind + autoprefixer).
module.exports = {
  style: {
    postcss: {
      mode: 'file',
    },
  },
};
