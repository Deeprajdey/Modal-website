/* const path = require('path'); */
const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Variables

const filenameHTML = './index.html';
const filenameCache = './lib/cache.json';
const filenamePackage = './package.json';
const filenamePackageLock = './package-lock.json';
const regExpHTML = /<title>(.*?)<\/title>/g;
const regExpPackage = /"name": "(.*?)"/g;
const regExpPackageCheck = /"projectNameUpdated":true/g;
const regExpPackageCheckUpdate = /"projectNameUpdated":.false?/g;
const packageDataCheck = `"projectNameUpdated":true`;

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

//Readline Function

const readlineFunction = () => {
  readline.question(
    `\n What's your project name ? 
  
        Type below on the terminal
    
    \n`,
    projectName => {
      //Data

      const addDataHTML = `<title>${projectName.trim()}</title>`;
      const addDataPackage = `"name": "${projectName
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
      mutateFunction(
        filenameCache,
        regExpPackageCheckUpdate,
        packageDataCheck
      );
      mutateFunction(
        filenamePackageLock,
        regExpPackage,
        addDataPackage
      );
      console.log('*****Project name Changed*****');
      readline.close();
    }
  );
};

//Check Function
const checkFunction = (fileName, regExpPackageCheck) => {
  fs.readFile(fileName, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    const nameChanged = JSON.stringify(
      JSON.parse(data)
    ).match(regExpPackageCheck);
    if (!Boolean(nameChanged)) {
      readlineFunction();
    }
  });
};

checkFunction(filenameCache, regExpPackageCheck);
