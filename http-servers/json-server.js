const server = require('http').createServer();
const fs = require('fs');

// const​​ product = {
//     id: ​1​,
//     name: ​ 'Supreme T-Shirt'​,
//     brand: ​ 'Supreme'​,
//     price: ​99.99​,
//     options: [{
//         color: ​ 'blue'​
//     }, {
//         size: ​ 'XL'​
//     }]
// };

server.on('request', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    let product = {
        id: 1,
        name: 'Supreme T-Shirt',
        brand: 'Supreme',
        price: 99.99,
        options: [
            {color: 'blue'},
            {size: 'XL'}
        ]
    };
    res.end(JSON.stringify(product));
})

server.listen(8080)