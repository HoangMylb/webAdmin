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
      
         // Tạo một mảng chứa tất cả các promise
         const promises = xuatPhim.map(async (el, index) => {
            let rap = await rapPhimController.getById(el.Rap);
            let phim = await phimController.getById(el.Phim);
           // console.log('sss', user);
           // console.log('tenRapPhim: ', rap.tenRapPhim);

            // Cập nhật giá trị trong mảng donHang
            xuatPhim[index] = {
                _id: el._id,
                Phong: el.Phong,
                Rap: rap.tenRapPhim,
                Phim: phim.tenPhim,
                ngay: el.ngay,
                gio: el.gio,
                indexPlusOne: index + 1,
            };
        });

        // Chờ tất cả các promise hoàn thành
        await Promise.all(promises);

        res.render('xuatPhim', { sp: xuatPhim });

    } catch (error) {
        res.status(404).json({ message: 'Lỗi khi truy vấn dữ liệu ' });
    }
});
router.get('/newXuatPhim', async function (req, res, next) {
    let phim = await phimController.getPhimDangChieu();

        phim = phim.map((el, index) => {
            return {
                _id: el._id,
                tenPhim: el.tenPhim,
            }
        });
        let rap = await rapPhimController.getAll();

        rap = rap.map((el, index) => {
            return {
                _id: el._id,
                tenRapPhim: el.tenRapPhim,
            }
        });
    res.render('newXuatPhim', { phim: phim,rap:rap })
});
router.post('/newXuatPhim', async function (req, res, next) {
    try {
        //lấy giá trị name từ body
                   const ghe = [
                { tenGhe: 'A01', empty: true, selected: false },
                { tenGhe: 'A02', empty: true, selected: false },
                { tenGhe: 'A03', empty: true, selected: false },
                { tenGhe: 'A04', empty: true, selected: false },
                { tenGhe: 'A05', empty: true, selected: false },
                { tenGhe: 'A06', empty: true, selected: false },
                { tenGhe: 'B01', empty: true, selected: false },
                { tenGhe: 'B02', empty: true, selected: false },
                { tenGhe: 'B03', empty: true, selected: false },
                { tenGhe: 'B04', empty: true, selected: false },
                { tenGhe: 'B05', empty: true, selected: false },
                { tenGhe: 'B06', empty: true, selected: false },
                { tenGhe: 'C01', empty: true, selected: false },
                { tenGhe: 'C02', empty: true, selected: false },
                { tenGhe: 'C03', empty: true, selected: false },
                { tenGhe: 'C04', empty: true, selected: false },
                { tenGhe: 'C05', empty: true, selected: false },
                { tenGhe: 'C06', empty: true, selected: false },
                { tenGhe: 'D01', empty: true, selected: false },
                { tenGhe: 'D02', empty: true, selected: false },
                { tenGhe: 'D03', empty: true, selected: false },
                { tenGhe: 'D04', empty: true, selected: false },
                { tenGhe: 'D05', empty: true, selected: false },
                { tenGhe: 'D06', empty: true, selected: false },
                { tenGhe: 'E01', empty: true, selected: false },
                { tenGhe: 'E02', empty: true, selected: false },
                { tenGhe: 'E03', empty: true, selected: false },
                { tenGhe: 'E04', empty: true, selected: false },
                { tenGhe: 'E05', empty: true, selected: false },
                { tenGhe: 'E06', empty: true, selected: false },
                { tenGhe: 'F01', empty: true, selected: false },
                { tenGhe: 'F02', empty: true, selected: false },
                { tenGhe: 'F03', empty: true, selected: false },
                { tenGhe: 'F04', empty: true, selected: false },
                { tenGhe: 'F05', empty: true, selected: false },
                { tenGhe: 'G06', empty: true, selected: false },
                { tenGhe: 'G01', empty: true, selected: false },
                { tenGhe: 'G02', empty: true, selected: false },
                { tenGhe: 'G03', empty: true, selected: false },
                { tenGhe: 'G04', empty: true, selected: false },
                { tenGhe: 'G05', empty: true, selected: false },
                { tenGhe: 'G06', empty: true, selected: false },
                { tenGhe: 'H01', empty: true, selected: false },
                { tenGhe: 'H02', empty: true, selected: false },
                { tenGhe: 'H03', empty: true, selected: false },
                { tenGhe: 'H04', empty: true, selected: false },
                { tenGhe: 'H05', empty: true, selected: false },
                { tenGhe: 'H06', empty: true, selected: false },

              ]; // Dữ liệu ghế
        let { Phong,ngay,gio,Rap,Phim } = req.body;
            let ojDB = {
                Phong:Phong,ghe,ngay:ngay,gio:gio,Rap:Rap,Phim:Phim 
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
