var fs = require('fs');
fs.appendFile('D:/Node/resource_download/src/service/log.txt','123', (err) => {
    if (err) throw err;
    console.log('123')
});