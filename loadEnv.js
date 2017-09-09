/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
const fs = require('fs');
const FILE_NAME = '.env';
if(fs.existsSync(FILE_NAME)) {
    // readEnv(fs.readFileSync(FILE_NAME));
    var data = fs.readFileSync(FILE_NAME);
    setUpEnv(data.toString().split('\n'));

} else {
    console.error('No '+ FILE_NAME + ' file found');
    exit();
}

function setUpEnv(envVariablesArray){
    envVariablesArray.forEach(function(env){
        if(env != null) {
            process.env[env.split('=')[0]] = env.split('=')[1];
        }
    });
}

function exit(){
    console.error('Existing');
    process.exit(0);
}
