const Promise = require('bluebird');
const fs = require('fs');
const fsa = Promise.promisifyAll(fs);
const { join } = require('path');

const DIRECTORIES =  [
    'dir-1/dir-1-1',
    'dir-1/dir-1-2',
    'dir-1/dir-1-2/dir-1-2-1',
    'dir-2/dir-2-1/dir-2-1-1',
    'dir-2/dir-2-2/dir-2-2-1',
    'dir-2/dir-2-1/dir-2-2-2/dir-2-2-2-1',
    'dir-3/dir-3-1',
    'dir-3',
    'dir-3/dir-3-2/dir-3-2-1',
    'dir-3/dir-3-3/dir-3-3-1'
];
const DESTINATION_PATH =  'D:\\study\\5\\node\\cwp-09\\dirs';


let currentDir = DESTINATION_PATH;
Promise.mapSeries(DIRECTORIES, (dir) => {
    currentDir = DESTINATION_PATH;
    return Promise.mapSeries(dir.split('/'), (everyDir) => {
        currentDir = join(currentDir, everyDir);
        if (!fs.existsSync(currentDir)) {
            return fsa.mkdirAsync(currentDir);
        }
    })
}).then(() => {
    console.log('OK');
});

