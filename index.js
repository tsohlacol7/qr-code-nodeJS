//1. Use the inquirer npm package to get user input.
import inquirer from 'inquirer';
//2. Use the qr-image npm package to turn the user entered URL into a QR code image.
import qr from 'qr-image';

import fs from 'fs';

inquirer
  .prompt([
    {    
        message:"Type your URL",
        name:"URL"
    }
  ])
  .then((answers) => {
    const url = answers.URL;
    let qr_img = qr.image(url);
    qr_img.pipe(fs.createWriteStream('./qr_img.png'));

    // Create a txt file to save the user input using the native fs node module.
    fs.writeFile('url.txt', url, (err) => {
        if (err) throw err;
        console.log('The file has been saved successfully!');
      }); 

  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment") ;
    } else {
      console.log("Something else went wrong") ;
    }
  });


