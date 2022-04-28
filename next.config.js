const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = {
  reactStrictMode: true,
  withBundleAnalyzer: withBundleAnalyzer({}),
};
