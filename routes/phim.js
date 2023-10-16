var express = require('express');
var router = express.Router();

const phimController = require('../controller/phimController');
/* GET users listing. */
// http://localhost:3000/rapphim

router.get('/', async function(req, res, next) {
    try {
        let phim = await phimController.getAll();
        phim = phim.map(el => {
            return {
                _id: el._id,
                tenPhim: el.tenPhim,
                theLoaiPhim: el.theLoaiPhim,
                trailer: el.trailer,
                poster: el.poster,
                thoiLuongPhim: el.thoiLuongPhim,
                noiDungPhim: el.noiDungPhim,
                icon: el.icon,
                dienVien: el.dienVien,
                rapPhim: el.rapPhim,

            }
        });
        res.render('phim', { p: phim })
        
    } catch (error) {
        console.log(error);
    }
});

router.get('/newPhim', function(req, res, next) {
    res.render('newPhim')
});
router.post('/newPhim',async function(req, res, next) {
    try {
        //lấy giá trị name từ body
        let { tenPhim,theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, dienVien, rapPhim } = req.body;

        
        // let ojDB = {
        //     tenPhim: tenPhim, theLoaiPhim: theLoaiPhim, trailer: trailer, poster: poster,
        //     thoiLuongPhim: thoiLuongPhim, noiDungPhim: noiDungPhim, icon: icon, dienVien: dienVien, rapPhim: rapPhim
        // }
        

         await phimController.createPhim(tenPhim,theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, dienVien, rapPhim);
       
        console.log("Đã thêm vào collection 'Phim'");
        res.redirect('/phim');

    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa thêm được");
    }
});

// router.get('/:id/del', async (req, res, next) => {
//     let _id = req.params.id;
//     try {
//         await rapPhimController.del(_id);
//         console.log("Delete OK");
//         res.redirect('/rapphim');
//     } catch (error) {
//         console.error();
//     }
// })

// router.get('/:id/edit', async  (req, res, next)  =>{
//     let _id = req.params.id;
//     try {
//         let rapphim = await rapPhimController.getById(_id);
//         res.render('rapPhimUpdate', { rp: rapphim })
        
//     } catch (error) {
//         console.log(error);
//     }
// });
// router.post('/:id/edit',async function(req, res, next) {
//     let _id = req.params.id;
//     try {
//         //lấy giá trị name từ body
//         let { tenRapPhim, diaChi, SDT, hinh } = req.body;
            
//         let newData = {
//             tenRapPhim: tenRapPhim, diaChi: diaChi, SDT: SDT, hinh: hinh
//           };
//         await rapPhimController.update(_id, newData);
//         console.log("Update OK");
//         res.redirect('/rapphim');

//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Chưa sửa được");
//     }
// });

module.exports = router;
