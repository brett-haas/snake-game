const { exec } = require('child_process');
const os = require('os');

const runScript = (scriptName) => {
    exec(scriptName, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`${stderr}`);
            return;
        }
        console.log(`${stdout}`);
    });
};

if (['linux', 'darwin'].includes(os.platform())) {
    runScript('./linux_setup.sh');
} else {
    runScript('win_setup.ps1');
}
