var express = require('express');
var router = express.Router();

const khachHangController = require('../controller/khachHangController');
/* GET users listing. */
// http://localhost:3000/khachhang
router.get('/', async function(req, res, next) {
    try {
        let khachHang = await khachHangController.getByVaiTro();
        khachHang = khachHang.map(el => {
            return {
                _id: el._id,
                tenKhachHang: el.tenKhachHang,
                userName: el.userName,
                passWord: el.passWord,
                SDT: el.SDT,
                ngaySinh: el.ngaySinh,
                vaiTro: el.vaiTro,
                gioiTinh: el.gioiTinh,

            }
        });
        res.render('khachHang', { kh: khachHang })
        
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
