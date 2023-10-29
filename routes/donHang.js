var express = require('express');
var router = express.Router();


const donHangController = require('../controller/donHangController');
/* GET users listing. */
// http://localhost:3000

router.get('/', async function (req, res, next) {
    try {
        const startIndex = 1;
        let donHang = await donHangController.getAll();
        donHang = donHang.map((el, index) => {
            return {
                _id: el._id,
                user: el.user,
                phim: el.phim,
                rapPhim: el.rapPhim,
                ngayDat: el.ngayDat,
                xuatChieu: el.xuatChieu,
                ghe: el.ghe,
                soLuong: el.soLuong,
                tien: el.tien,
                indexPlusOne: index + 1,
            }
        });
        res.render('donHang', {dh: donHang, startIndex })

    } catch (error) {
        console.log(error);
    }
});



router.post('/newDonHang', async function (req, res, next) {
    try {
        //lấy giá trị name từ body
        let { user, phim, rapPhim,ngayDat, xuatChieu, ghe,soLuong, tien } = req.body;
       
        let donHang = await donHangController.createDonHang(user, phim,rapPhim, ngayDat, xuatChieu, ghe,soLuong, tien);
        if(donHang){
            res.status(200).json({
                success: true,
                 message: donHang.message,
                 
              });
        }else{
            res.status(400).json({
                success: false,
                 message: donHang.message,
                 
              });
        }
           

    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa thêm được");
    }
});
router.get('/DonHangUser', async function (req, res, next) {
    try {
        //lấy giá trị name từ body
        let { user} = req.body;
       
        let donHang = await donHangController.getDonHangUser(user);
        if(donHang){
            res.status(200).json({
                success: true,
                 message: donHang.message,
                 
              });
        }else{
            res.status(400).json({
                success: false,
                 message: donHang.message,
                 
              });
        }
           

    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa thêm được");
    }
});

module.exports = router;
