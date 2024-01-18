var express = require('express');
var router = express.Router();

/* GET users listing. */
// http://localhost:3000/
const rapPhimController = require('../controller/rapPhimController');
const XuatPhimController = require('../controller/xuatPhimController');
const phimController = require('../controller/phimController');

router.get('/', async function (req, res, next) {
    try {
        //     async function getTenRap(id) {
        //         return await rapPhimController.getById(id);
        //     }
        //     async function getTenPhim(id) {
        //         return await phimController.getById(id);
        //     }
        //     let xuatPhim = await XuatPhimController.getAll();
        //     xuatPhim = await Promise.all(xuatPhim.map(async (el, index) => {
        //         const rapPhim = await getTenRap(el.Rap);
        //    const Phim = await getTenPhim(el.Phim);

        //     return {
        //         _id: el._id,
        //         Phong: el.Phong,
        //         Rap: rapPhim.tenRapPhim,
        //         Phim: el.Phim,
        //         ngay: el.ngay,
        //         gio: el.gio,
        //         indexPlusOne: index + 1,
        //     }
        // }));
        let xuatPhim = await XuatPhimController.getAll();
        xuatPhim = await Promise.all(xuatPhim.map(async (el, index) => {
            return {
                _id: el._id,
                Phong: el.Phong,
                Rap: el.Rap,
                Phim: el.Phim,
                ngay: el.ngay,
                gio: el.gio,
                indexPlusOne: index + 1,
            }
        }));

        res.render('xuatPhim', { sp: xuatPhim });

    } catch (error) {
        res.status(404).json({ message: 'Lỗi khi truy vấn dữ liệu ' });
    }
});
router.get('/newXuatPhim', function (req, res, next) {
    res.render('newXuatPhim')
});
router.post('/newXuatPhim', async function (req, res, next) {
    try {
        //lấy giá trị name từ body
        let { Phong, ngay, gio, Rap, Phim } = req.body;
        let ojDB = {
            Phong: Phong, ngay: ngay, gio: gio, Rap: Rap, Phim: Phim
        }
        await XuatPhimController.insert(ojDB);
        console.log("Đã thêm vào collection 'XuatPhim'");
        res.redirect('/xuatPhim');
    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa thêm được");
    }
});
router.get('/:id/edit', async (req, res, next) => {
    let _id = req.params.id;
    try {
        let xuatPhim = await XuatPhimController.getById(_id);
        res.render('xuatPhimUpdate', { xp: xuatPhim })

    } catch (error) {
        console.log(error);
    }
});
router.post('/:id/edit', async function (req, res, next) {
    let _id = req.params.id;
    try {
        //lấy giá trị name từ body
        let { Phong, ngay, gio, Rap, Phim } = req.body;
        let ojDB = {
            Phong: Phong, ngay: ngay, gio: gio, Rap: Rap, Phim: Phim
        }
        await XuatPhimController.update(_id, ojDB);
        console.log("Đã cập nhật vào collection 'XuatPhim'");
        res.redirect('/xuatPhim');
    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa cập nhậtt được");
    }
});
router.get('/:id/del', async (req, res, next) => {
    let _id = req.params.id;
    try {
        await XuatPhimController.del(_id);
        console.log("Delete OK");
        res.redirect('/xuatPhim');
    } catch (error) {
        console.error();
    }
})

module.exports = router;
