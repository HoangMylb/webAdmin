var express = require('express');
var router = express.Router();


const binhHangController = require('../controller/binhLuanController');
/* GET users listing. */
// http://localhost:3000

router.post('/', async function (req, res, next) {
    try {
        let { phim,userID,ngay,noiDung,hinhAnh,userTen } = req.body;
        let binhluan = await binhHangController.createBinhLuanPhim(phim,userID,ngay,noiDung,hinhAnh,userTen);
        if (binhluan) {
            res.status(200).json({
                success: true,
                message: binhluan.message,

            });
        } else {
            res.status(400).json({
                success: false,
                message: binhluan.message,

            });
        }

    } catch (error) {
        console.log(error);
    }
});
router.post('/add', async function (req, res, next) {
    try {
        let { _id,userID,ngay,noiDung,hinhAnh,userTen } = req.body;
        let binhluan = await binhHangController.addCommentToBinhLuan(_id,userID,ngay,noiDung,hinhAnh,userTen);
        if (binhluan) {
            res.status(200).json({
                success: true,
                message: binhluan.message,

            });
        } else {
            res.status(400).json({
                success: false,
                message: binhluan.message,

            });
        }

    } catch (error) {
        console.log(error);
    }
});

router.delete('/remove', async function (req, res, next) {
    try {
        let { _id,binhLuanId } = req.body;
        let binhluan = await binhHangController.removeBinhLuanFromPhim(_id,binhLuanId);
        if (binhluan) {
            res.status(200).json({
                success: true,
                message: binhluan.message,

            });
        } else {
            res.status(400).json({
                success: false,
                message: binhluan.message,

            });
        }

    } catch (error) {
        console.log(error);
    }
});
router.get('/get', async function (req, res, next) {
    try {
        let { _id } = req.query;
        let binhluan = await binhHangController.getBinhLuanPhim(_id);
        if (binhluan) {
            res.status(200).json({
                success: true,
                idBinhLuan: binhluan.message[0]._id,
                message: binhluan.message[0].binhluan,
            });
        } else {
            res.status(400).json({
                success: false,
                message: binhluan.message,

            });
        }

    } catch (error) {
        console.log(error);
    }
});
module.exports = router;
