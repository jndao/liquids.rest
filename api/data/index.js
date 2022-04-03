const fs = require('fs');
const path = require('path')

// Gets all the JSONs in the data folder and loads them into each part of the module 
// Allows us to just import the module instead of individually importing each json
// Also allows us to add new types by simply adding a new json in the data folder
// named [type].json
const jsonsInDir = fs.readdirSync(path.join(__dirname)).filter(file => path.extname(file) === '.json');

jsonsInDir.forEach(file => {
  const fileData = fs.readFileSync(path.join(__dirname, file));
  const fileContent = JSON.parse(fileData.toString());
  module.exports[file.split('.')[0]] = fileContent;
});

module.exports.getDataTypes = getDataTypes = () => {
  let types = [];
  jsonsInDir.forEach(file => {
    const fileData = fs.readFileSync(path.join(__dirname, file));
    types.push(file.split('.')[0]);
  });
  
  return types;
}