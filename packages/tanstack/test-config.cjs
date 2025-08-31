const { generateTanStackRoutes } = require('./dist/index.js');

const config = {
  configPath: '/Users/suko/x/www/tests/ai/yaml-routes-github/apps/demo/routes.yml',
  outputPath: '/tmp/test-route.tsx'
};

generateTanStackRoutes(config).then(() => {
  console.log('Generated test route');
}).catch(err => {
  console.error('Error:', err);
});
