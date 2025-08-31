const fs = require('fs');
const yaml = require('js-yaml');

try {
  const yamlContent = fs.readFileSync('/Users/suko/x/www/tests/ai/yaml-routes-github/apps/demo/routes.yml', 'utf8');
  const config = yaml.load(yamlContent);
  console.log('Router config:', JSON.stringify(config.settings.router, null, 2));
  console.log('LazyComponents:', config.settings.lazyComponents);
} catch (e) {
  console.error('Error:', e.message);
}
