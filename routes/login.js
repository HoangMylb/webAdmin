var express = require('express');
var router = express.Router();

const khachHangController = require('../controller/khachHangController');
/* GET users listing. */
// http://localhost:3000/khachhang
router.get('/', async function(req, res, next) {
        res.render('login')
   
});
router.post('/', async function(req, res, next) {
        try {
            let { userName,passWord } = req.body;
            let a,b;
            let khachHang = await khachHangController.loginAdmin(userName,passWord);
            a= userName;
            b=passWord;
          if (khachHang.success) {
                console.log(""+khachHang.message);
                userName="";
                passWord="";
                res.redirect('/rapphim');
          } else {
                console.log(""+khachHang.message);
                
                res.render('login', { error: khachHang.message, userName, passWord});
          }
           
            
        } catch (error) {
            console.log(error);
        }
    });

module.exports = router;
