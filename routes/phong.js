var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const PhongChieu = require('../model/phongModel'); 

/* GET users listing. */
// http://localhost:3000/
const phongNames = ['Cinema 1', 'Cinema 2']; // Danh sách tên phòng
const gioChieu = ['13:00', '16:00', '19:00', '21:00']; // Danh sách khung giờ
const soNgay = 7;
router.get('/', async function(req, res, next) {
    try {
        let yeuthich = await yeuThichController.getAll();
        res.status(200).json({
            success: true,
             message: yeuthich,
          });
    } catch (error) {
        console.log(error);
    }
 });


module.exports = router;
