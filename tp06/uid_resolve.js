const cp = require("child_process");

function readFromGetent(map, value, field){
    let req = "getent " + map + " " + value;
    let result = cp.execSync(req);
    console.log(result);
    return result;
}

module.exports.readFromGetent = readFromGetent;