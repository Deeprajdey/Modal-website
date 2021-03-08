/* const path = require('path'); */
const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Mutate Function
const mutateFunction = (fileName, regExp, addData) => {
  fs.readFile(fileName, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    const result = data.replace(regExp, addData);

    fs.writeFile(fileName, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
};

readline.question(
  `\n What's your project name ? 

      Type below on the terminal
  
  \n`,
  name => {
    //Data

    const filenameHTML = './index.html';
    const filenamePackage = './package.json';
    const regExpHTML = /<title>(.*?)<\/title>/g;
    const regExpPackage = /"name": "(.*?)"/g;
    const addDataHTML = `<title>${name.trim()}</title>`;
    const addDataPackage = `"name": "${name
      .trim()
      .toLowerCase()
      .split(' ')
      .join('-')}"`;

    //Calling Function

    mutateFunction(filenameHTML, regExpHTML, addDataHTML);
    mutateFunction(
      filenamePackage,
      regExpPackage,
      addDataPackage
    );
    console.log('*****Project name Changed*****');
    readline.close();
  }
);
