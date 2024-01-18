var express = require('express');
var router = express.Router();


const donHangController = require('../controller/donHangController');
const rapPhimController = require('../controller/rapPhimController');
const phimController = require('../controller/phimController');
const khachHangController = require('../controller/khachHangController');
/* GET users listing. */
// http://localhost:3000

router.get('/', async function (req, res, next) {
    try {
        let donHang = await donHangController.getAll();
        // Tạo một mảng chứa tất cả các promise
        const promises = donHang.map(async (el, index) => {
            let rap = await rapPhimController.getById(el.rapPhim);
            let phim = await phimController.getById(el.phim);
            let user = await khachHangController.getById(el.user);
           // console.log('sss', user);
           // console.log('tenRapPhim: ', rap.tenRapPhim);

            // Cập nhật giá trị trong mảng donHang
            donHang[index] = {
                _id: el._id,
                user: user.tenKhachHang,
                phim: phim.tenPhim,
                rapPhim:  rap.tenRapPhim,
                ngayDat: el.ngayDat,
                xuatChieu: el.xuatChieu,
                ghe: el.ghe,
                soLuong: el.soLuong,
                phongChieu: el.phongChieu,
                tien: el.tien,
                indexPlusOne: index + 1,
            };
        });

        // Chờ tất cả các promise hoàn thành
        await Promise.all(promises);

        res.render('donHang', { dh: donHang });

    } catch (error) {
        console.log(error);
    }
});
router.get('/getAll', async function (req, res, next) {
    try {
        let donHang = await donHangController.getAll();
        // Tạo một mảng chứa tất cả các promise
        const promises = donHang.map(async (el, index) => {
            let rap = await rapPhimController.getById(el.rapPhim);
            let phim = await phimController.getById(el.phim);
            let user = await khachHangController.getById(el.user);
           // console.log('sss', user);
           // console.log('tenRapPhim: ', rap.tenRapPhim);

            // Cập nhật giá trị trong mảng donHang
            donHang[index] = {
                _id: el._id,
                user: user.tenKhachHang,
                phim: phim.tenPhim,
                rapPhim:  rap.tenRapPhim,
                ngayDat: el.ngayDat,
                xuatChieu: el.xuatChieu,
                ghe: el.ghe,
                soLuong: el.soLuong,
                phongChieu: el.phongChieu,
                tien: el.tien,
                indexPlusOne: index + 1,
            };
        });

        // Chờ tất cả các promise hoàn thành
        await Promise.all(promises);
        if (donHang) {
            res.status(200).json({
                success: true,
                message: donHang,
            });
        } else {
            res.status(400).json({
                success: false,
                message: donHang,
            });
        }

    } catch (error) {
        console.log(error);
    }
});
router.get('/rapQuangTrung', async function (req, res, next) {
    try {
        let donHang = await donHangController.getRapQT();
        
        // Tạo một mảng chứa tất cả các promise
        const promises = donHang.map(async (el, index) => {
            let rap = await rapPhimController.getById(el.rapPhim);
            let phim = await phimController.getById(el.phim);
            let user = await khachHangController.getById(el.user);

            // Cập nhật giá trị trong mảng donHang
            donHang[index] = {
                _id: el._id,
                user: user.tenKhachHang,
                phim: phim.tenPhim,
                rapPhim:  rap.tenRapPhim,
                ngayDat: el.ngayDat,
                xuatChieu: el.xuatChieu,
                ghe: el.ghe,
                soLuong: el.soLuong,
                phongChieu: el.phongChieu,
                tien: el.tien,
                indexPlusOne: index + 1,
            };
        });

        // Chờ tất cả các promise hoàn thành
        await Promise.all(promises);

        if (donHang) {
            res.status(200).json({
                success: true,
                message: donHang,
            });
        } else {
            res.status(400).json({
                success: false,
                message: donHang,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa lấy được");
    }
});
router.get('/rapPhanVanTri', async function (req, res, next) {
    try {
        let donHang = await donHangController.getRapVT();
        
        // Tạo một mảng chứa tất cả các promise
        const promises = donHang.map(async (el, index) => {
            let rap = await rapPhimController.getById(el.rapPhim);
            let phim = await phimController.getById(el.phim);
            let user = await khachHangController.getById(el.user);

            // Cập nhật giá trị trong mảng donHang
            donHang[index] = {
                _id: el._id,
                user: user.tenKhachHang,
                phim: phim.tenPhim,
                rapPhim:  rap.tenRapPhim,
                ngayDat: el.ngayDat,
                xuatChieu: el.xuatChieu,
                ghe: el.ghe,
                soLuong: el.soLuong,
                phongChieu: el.phongChieu,
                tien: el.tien,
                indexPlusOne: index + 1,
            };
        });

        // Chờ tất cả các promise hoàn thành
        await Promise.all(promises);

        if (donHang) {
            res.status(200).json({
                success: true,
                message: donHang,
            });
        } else {
            res.status(400).json({
                success: false,
                message: donHang,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa lấy được");
    }
});
router.get('/rapLeDuan', async function (req, res, next) {
    try {
        let donHang = await donHangController.getRapLD();
        
        // Tạo một mảng chứa tất cả các promise
        const promises = donHang.map(async (el, index) => {
            let rap = await rapPhimController.getById(el.rapPhim);
            let phim = await phimController.getById(el.phim);
            let user = await khachHangController.getById(el.user);

            // Cập nhật giá trị trong mảng donHang
            donHang[index] = {
                _id: el._id,
                user: user.tenKhachHang,
                phim: phim.tenPhim,
                rapPhim:  rap.tenRapPhim,
                ngayDat: el.ngayDat,
                xuatChieu: el.xuatChieu,
                ghe: el.ghe,
                soLuong: el.soLuong,
                phongChieu: el.phongChieu,
                tien: el.tien,
                indexPlusOne: index + 1,
            };
        });

        // Chờ tất cả các promise hoàn thành
        await Promise.all(promises);

        if (donHang) {
            res.status(200).json({
                success: true,
                message: donHang,
            });
        } else {
            res.status(400).json({
                success: false,
                message: donHang,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa lấy được");
    }
});
router.get('/rapTruongChinh', async function (req, res, next) {
    try {
        let donHang = await donHangController.getRapTC();
        
        // Tạo một mảng chứa tất cả các promise
        const promises = donHang.map(async (el, index) => {
            let rap = await rapPhimController.getById(el.rapPhim);
            let phim = await phimController.getById(el.phim);
            let user = await khachHangController.getById(el.user);

            // Cập nhật giá trị trong mảng donHang
            donHang[index] = {
                _id: el._id,
                user: user.tenKhachHang,
                phim: phim.tenPhim,
                rapPhim:  rap.tenRapPhim,
                ngayDat: el.ngayDat,
                xuatChieu: el.xuatChieu,
                ghe: el.ghe,
                soLuong: el.soLuong,
                phongChieu: el.phongChieu,
                tien: el.tien,
                indexPlusOne: index + 1,
            };
        });

        // Chờ tất cả các promise hoàn thành
        await Promise.all(promises);

        if (donHang) {
            res.status(200).json({
                success: true,
                message: donHang,
            });
        } else {
            res.status(400).json({
                success: false,
                message: donHang,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa lấy được");
    }
});
router.get('/rapVanLuong', async function (req, res, next) {
    try {
        let donHang = await donHangController.getRapVL();
        
        // Tạo một mảng chứa tất cả các promise
        const promises = donHang.map(async (el, index) => {
            let rap = await rapPhimController.getById(el.rapPhim);
            let phim = await phimController.getById(el.phim);
            let user = await khachHangController.getById(el.user);

            // Cập nhật giá trị trong mảng donHang
            donHang[index] = {
                _id: el._id,
                user: user.tenKhachHang,
                phim: phim.tenPhim,
                rapPhim:  rap.tenRapPhim,
                ngayDat: el.ngayDat,
                xuatChieu: el.xuatChieu,
                ghe: el.ghe,
                soLuong: el.soLuong,
                phongChieu: el.phongChieu,
                tien: el.tien,
                indexPlusOne: index + 1,
            };
        });

        // Chờ tất cả các promise hoàn thành
        await Promise.all(promises);

        if (donHang) {
            res.status(200).json({
                success: true,
                message: donHang,
            });
        } else {
            res.status(400).json({
                success: false,
                message: donHang,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa lấy được");
    }
});
router.get('/rapNguyenDu', async function (req, res, next) {
    try {
        let donHang = await donHangController.getRapND();
        
        // Tạo một mảng chứa tất cả các promise
        const promises = donHang.map(async (el, index) => {
            let rap = await rapPhimController.getById(el.rapPhim);
            let phim = await phimController.getById(el.phim);
            let user = await khachHangController.getById(el.user);

            // Cập nhật giá trị trong mảng donHang
            donHang[index] = {
                _id: el._id,
                user: user.tenKhachHang,
                phim: phim.tenPhim,
                rapPhim:  rap.tenRapPhim,
                ngayDat: el.ngayDat,
                xuatChieu: el.xuatChieu,
                ghe: el.ghe,
                soLuong: el.soLuong,
                phongChieu: el.phongChieu,
                tien: el.tien,
                indexPlusOne: index + 1,
            };
        });

        // Chờ tất cả các promise hoàn thành
        await Promise.all(promises);

        if (donHang) {
            res.status(200).json({
                success: true,
                message: donHang,
            });
        } else {
            res.status(400).json({
                success: false,
                message: donHang,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa lấy được");
    }
});
router.get('/rapTanBinh', async function (req, res, next) {
    try {
        let donHang = await donHangController.getRapTB();
        
        // Tạo một mảng chứa tất cả các promise
        const promises = donHang.map(async (el, index) => {
            let rap = await rapPhimController.getById(el.rapPhim);
            let phim = await phimController.getById(el.phim);
            let user = await khachHangController.getById(el.user);

            // Cập nhật giá trị trong mảng donHang
            donHang[index] = {
                _id: el._id,
                user: user.tenKhachHang,
                phim: phim.tenPhim,
                rapPhim:  rap.tenRapPhim,
                ngayDat: el.ngayDat,
                xuatChieu: el.xuatChieu,
                ghe: el.ghe,
                soLuong: el.soLuong,
                phongChieu: el.phongChieu,
                tien: el.tien,
                indexPlusOne: index + 1,
            };
        });

        // Chờ tất cả các promise hoàn thành
        await Promise.all(promises);

        if (donHang) {
            res.status(200).json({
                success: true,
                message: donHang,
            });
        } else {
            res.status(400).json({
                success: false,
                message: donHang,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa lấy được");
    }
});



router.post('/newDonHang', async function (req, res, next) {
    try {
        //lấy giá trị name từ body
        let { user, phim, rapPhim, ngayDat,phongChieu, xuatChieu, ghe, soLuong, tien } = req.body;
        
        let donHang = await donHangController.createDonHang(user, phim, rapPhim, ngayDat, xuatChieu, ghe, soLuong, phongChieu, tien);
        if (donHang) {
            res.status(200).json({
                success: true,
                message: donHang.message,

            });
        } else {
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
       
        const { user } = req.query;
        let donHang = await donHangController.getDonHangUser(user);
        if (donHang) {
            res.status(200).json({
                success: true,
                message: donHang.message,

            });
        } else {
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
