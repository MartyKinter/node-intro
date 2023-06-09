const fs = require('fs');
const process = require('process');
const axios = require('axios');

//reading from file path
function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        }else{
            handleOutput(data, out);
        }
    });
}


//reading from URL

async function webCat(url){
    try{
        let response = await axios.get(url);
        handleOutput(response.data, out);
    }catch(err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

//how to handle output
function handleOutput(text, out){
    if(out){
        fs.writeFile(out, text, 'utf8', function(err){
            if(err){
                console.error(`Couldn't write ${out}: ${err}`);
                process.exit(1);
            }
        });
    }else{
        console.log(text)
    }
}

let path;
let out;

if(process.argv[2] === '--out'){
    out = process.argv[3];
    path = process.argv[4];
}else{
    path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
    webCat(path, out);
  } else {
    cat(path, out);
  }
  