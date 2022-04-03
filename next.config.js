const nextra = require('nextra');

exp = nextra('./components/layout.js')({
  experimental: {
    turboMode: true,
  },
  headers() {
    return [
      {
        source: '/atom/:nested*',
        headers: [
          {
            key: 'content-type',
            value: 'text/xml',
          },
        ],
      },
    ];
  },
});

module.exports = exp;
