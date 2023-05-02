// const fs = require('fs');

// import glob from 'glob'

// const componentsPath = './src/components';
// const indexFilePath = `${componentsPath}/index.js`;

// const getComponentName = filePath => {
//   return filePath.split('/').slice(-1)[0].replace(/\.js$/, '');
// };

// const generateIndexFile = () => {
//   glob(`${componentsPath}/**/*.js`, (err, files) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     const componentNames = files.map(getComponentName);
//     const componentsExport = componentNames
//       .map(name => `export { default as ${name} } from './${name}';\n`)
//       .join('');

//     fs.writeFileSync(indexFilePath, componentsExport);
//   });
// };

// generateIndexFile();

const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = './src/components';

const components = fs.readdirSync(COMPONENTS_DIR)
  .filter(file => file.endsWith('.js'))
  .map(file => path.parse(file).name);

const indexFileContent = components.map(component => `export { default as ${component} } from './${component}';`).join('\n');

fs.writeFileSync(path.join(COMPONENTS_DIR, 'index.js'), indexFileContent);