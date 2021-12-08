const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    fs.open('Guestbook.txt', 'a+', (err) => {  
        fs.readFile('index.html', (err, Data) => {
            fs.readFile('Guestbook.txt',  (err, pData) => {
                let htmlText = Data.toString();
                let posts = pData.toString();
                let output = htmlText.replace(/TEXT/, posts);
                res.send(output);
            });
        });
    });
})

app.listen(3000);
console.log('Servern körs på localhost:3000');

app.post('/', (req, res) => {
    let messageInput = req.body.message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    let message = messageInput + '<br>' + '\n';
    fs.appendFile('Guestbook.txt', message, (err) => {
        if (err) throw err;
        fs.readFile('index.html', (err, Data) => {
            fs.readFile('Guestbook.txt', function(err, pData) {
                let htmlText = Data.toString();
                let posts = pData.toString();
                let output = htmlText.replace(/TEXT/, posts);
                res.send(output);
            });
        });
    });
});



