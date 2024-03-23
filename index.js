
import inquirer from 'inquirer';
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


