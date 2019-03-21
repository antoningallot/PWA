const fs = require("fs");
const path = require("path");
const uid = require("./uid_resolve.js");

function parseCmdLine(argv){
    let l = (argv.findIndex(el => el === "-l") != -1);
    let un = (argv.findIndex(el => el === "-1") != -1);
    let t = (argv.findIndex(el => el === "-t") != -1);
    let path = argv[argv.length-1];
    //let path = fs.realpathSync(argv[argv.length-1]);
    if(!fs.existsSync(path)){
        path = ".";
    }
    else if (!(fs.lstatSync(path).isDirectory()) ) {
        path = ".";
    }
    
    return {path : path, long : l, column : un, sorted : t};
}

function printStats(s, p, e){
    let res = "";
    if (s.isDirectory()){
        res += "d";
    }
    else if (s.isSymbolicLink()){
        res += "l";
    }
    else {
        res += "-";
    }

    let perm = s.mode.toString(2);
    let counter = 0;
    for(let i = perm.length-9; i < perm.length; i++){
        if(perm[i] === "0"){
            res += "-";
        }
        else {
            if(counter%3 == 0){ res += "r"; }
            else if(counter%3 == 1){ res += "w"; }
            else if(counter%3 == 2){ res += "x"; }
        }
        counter++;
    }
    res += " " + s.uid;
    res += " " + s.gid;
    res += " " + s.size;
    res += " " + s.mtime.toISOString();
    res += " " + e;
    if (s.isSymbolicLink()) { res += " -> " + fs.readlinkSync(p); }

    return res;
}

function main(){
    let req = parseCmdLine(process.argv);
    let dir = fs.readdirSync(req.path);
    let res = [];
    if (dir.length != 0){
        dir.forEach(element => {
            let p = path.join(req.path, element);
            let s = fs.lstatSync(p);
            res.push([s, p, element]);
        });
        
        if(req.sorted){
            res.sort((el1, el2) => {
                if (el1[0].mtime > el2[0].mtime){ return -1; }
                if (el1[0].mtime < el2[0].mtime){ return 1; }
                else { return 0; }
            });
        }

        let sep = " ";
            if (req.column) {
                sep = "\n";
            }
            let display = "";
        if (req.long){
            res.forEach(element => {
                display += printStats(element[0], element[1], element[2]) + "\n";
            });
        }
        else {
            res.forEach(element => {
                display += element[2] + sep;
            });
        }
        console.log(display);   
    }
}

uid.readFromGetent("passwd", 22567, "");
//console.log(process.argv);
//main();