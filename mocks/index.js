const env = process.env.NODE_ENV;

if (env !== 'production') {
  const mock = require('nordic-dev/mocks')(); // eslint-disable-line

  mock.intercept('https://internal-api.mercadolibre.com/', [
    '/sites/*',
  ]);

  if (env === 'test') {
    mock.intercept('https://internal-api.mercadolibre.com/', [
      '/users/*',
      '/auth/user_session/*',
      '/v2/kyc/vault',
      '/frontend/carts/*',
    ]);
  }
}
