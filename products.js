var express = require('express');
var router = express.Router();
var fs = require("fs");
// var app = express();

var products = [];

fs.readFile(__dirname + "/" + 'products.json', 'utf8', (err, data) => {
    var obj = JSON.parse(data);
    var length = Object.keys(obj).length;
    for (var i = 1; i <= length; i++) {
        products.push(obj['product' + i]);  //"Product1"
    }
});

router.get('/products', function(req, res){
    res.json(products);           
 });

router.get('/get_product/:id', function(req, res){
    var currProduct = products.filter(function(product){
        if(product.id == req.params.id){  //neu tim thay id thi true
            return true;
        }
    });
    if(currProduct.length == 1){          //neu ket qua chi co 1
        res.json(currProduct[0])          //hien thi cai duy nhat
    } else {                              //neu co hon 1 ket qua hoac khong co ket qua nao
        res.status(404);                  
        res.json({message: "Not Found"}); //thong bao khong tim thay
    }
});

router.post('/addProduct', function (req, res) {
    var newId = products[(products.length) - 1].id + 1;
    products.push({
        id: newId,
        tensanpham: req.body.tensanpham,
        donvitinh: req.body.donvitinh,
        gia: req.body.gia
    });
    res.json({ message: "New product created." , location: "/products/" + newId});
})

// router.put('/updateProduct/:id', function(req, res){
//     //lay vi tri cua product thong qua id
//     var updateIndex = products.map(function(product){
//         return product.id;
//     }).indexOf(parseInt(req.params.id));
      
//     if(updateIndex === -1){   
//         //Movie not found, create new
//         products.push({
//             id: req.params.id,
//             name: req.body.name,
//             year: req.body.year,
//             rating: req.body.rating
//         });
//         res.json(
//             {message: "New product created.", location: "/product/" + req.params.id}
//          );
//     } else {
//         //Update existing movie
//         products[updateIndex] = {
//             id: req.params.id,
//             name: req.body.name,
//             year: req.body.year,
//             rating: req.body.rating
//         };
//         res.json(
//             {message: "Product id " + req.params.id + " updated.", location: "/product/" + req.params.id}
//         );
//     }
// });

// router.delete('delProduct/:id', function(req, res){
//    var removeIndex = products.map(function(product){
//       return product.id;
//    }).indexOf(req.params.id); //Gets us the index of movie with given id.
   
//    if(removeIndex === -1){  //khong tim thay
//       res.json({message: "Not found"});
//    } else {
//       products.splice(removeIndex, 1);
//       res.send({message: "Product id " + req.params.id + " removed."});
//    }
// });

//Routes will go here
module.exports = router;