var express = require('express');
var router = express.Router();

const phimController = require('../controller/phimController');
/* GET users listing. */
// http://localhost:3000/rapphim

router.get('/', async function (req, res, next) {
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

router.get('/newPhim', function (req, res, next) {
    res.render('newPhim')
});
router.post('/newPhim', async function (req, res, next) {
    try {
        //lấy giá trị name từ body
        let { tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, dienVien, rapPhim, iconStart } = req.body;
        let errors = [];
       
        if (tenPhim.length <= 0) {
            errors.push("Không để trống tên phim");
        }
        if (theLoaiPhim.length <= 0) {
            errors.push("Không để trống thể loại phim");
        }
        if (trailer.length <= 0) {
            errors.push("Không để trống số trailer");
        }
        if (poster.length <= 0) {
            errors.push("Không để trống poster");
        }
        if (thoiLuongPhim.length <= 0) {
            errors.push("Không để trống thời lượng phim");
        }
        if (noiDungPhim.length <= 0) {
            errors.push("Không để trống nội dung phim");
        }
        if (icon.length <= 0) {
            errors.push("Không để trống icon");
        }
        if (dienVien.length <= 0) {
            errors.push("Không để trống diễn viên");
        }
        if (rapPhim.length <= 0) {
            errors.push("Không để trống rạp phim");
        }
        if (iconStart.length <= 0) {
            errors.push("Không để trống iconStart");
        }
        if (errors.length > 0) {
            res.render('newPhim', { errors, tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, dienVien, rapPhim, iconStart });
        } else {
           let phim = await phimController.createPhim(tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, dienVien, rapPhim, iconStart);
          
           if(phim.success){
                console.log("Đã thêm vào collection 'Phim'");
                res.redirect('/phim');
            }else{
                
                for (let index = 0; index < phim.message.length; index++) {
                    errors.push(phim.message[index]);  
                }
                res.render('newPhim', { errors,tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, dienVien, rapPhim, iconStart });
            }
            
        }

    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa thêm được");
    }
});

router.get('/:id/del', async (req, res, next) => {
    let _id = req.params.id;
    try {
        await phimController.del(_id);
        console.log("Delete OK");
        res.redirect('/phim');
    } catch (error) {
        console.error();
    }
})

router.get('/:id/edit', async  (req, res, next)  =>{
    let _id = req.params.id;
    try {
        let phim = await phimController.getById(_id);
        res.render('phimUpdate', { p: phim })

    } catch (error) {
        console.log(error);
    }
});
router.post('/:id/edit',async function(req, res, next) {
    let _id = req.params.id;
    try {
        //lấy giá trị name từ body
        let { tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, dienVien, rapPhim, iconStart } = req.body;

        let newData = {
            tenPhim: tenPhim, theLoaiPhim: theLoaiPhim, trailer: trailer, poster: poster, 
            thoiLuongPhim: thoiLuongPhim, noiDungPhim: noiDungPhim, icon: icon, dienVien: dienVien, rapPhim: rapPhim, iconStart: iconStart
          };
        await phimController.update(_id, newData);
        console.log("Update OK");
        res.redirect('/phim');

    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa sửa được");
    }
});

module.exports = router;
