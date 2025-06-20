const fs = require ('fs');

fs.readFile('sample.txt', 'utf8', (err, data) => { 
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const modifiedData = data.toUpperCase();
    fs.writeFile('sample.txt', modifiedData, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('File has been modified successfully!');
    
    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('Modified file content:', data);
   });
 });
});