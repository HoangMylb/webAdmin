var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const RapPhim = require('../model/rapPhimModel');
const DienVien = require('../model/dienVienModel');
const phimController = require('../controller/phimController');
/* GET users listing. */
// http://localhost:3000/rapphim

router.get('/', async function (req, res, next) {
    try {
        const startIndex = 1;
        let phim = await phimController.getAll();
        phim = phim.map((el,index) => {
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
                iconStart: el.iconStart,
                indexPlusOne: index + 1,

            }
        });
        res.render('phim', { p: phim,startIndex })

    } catch (error) {
        console.log(error);
    }
});
router.get('/PhimHome', async function (req, res, next) {
    try {
       
        let phim = await phimController.getFirstThree();
        res.status(200).json({
            success: true,
             message: phim,
             
          });
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
        let arrayTenDienVien=[];
        let arrayTenRapPhim=[];
        // Lấy  ten rapPhim
        const rapPhim = phim.rapPhim;
        for (let index = 0; index < rapPhim.length; index++) {
          let rap = await RapPhim.findById(rapPhim[index]);
          arrayTenRapPhim.push(rap.tenRapPhim);
        }
        // Lấy  ten dienVien
        const dienVien = phim.dienVien;
        for (let index = 0; index < dienVien.length; index++) {
          let dien = await DienVien.findById(dienVien[index]);
          arrayTenDienVien.push(dien.tenDienVien);
        }
        console.log("arr: "+arrayTenDienVien);
        console.log("arr2: "+arrayTenRapPhim);
        res.render('phimUpdate', { p: phim, arrayTenDienVien, arrayTenRapPhim })

    } catch (error) {
        console.log(error);
    }
});
router.post('/:id/edit',async function(req, res, next) {
    let _id = req.params.id;
    try {
        //lấy giá trị name từ body
        let { tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, dienVien, rapPhim,   iconStart } = req.body;
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
            res.render('phimUpdate', { errors, tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, dienVien, rapPhim, iconStart,_id });
        } else {
           let phim = await phimController.update(_id,tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, dienVien, rapPhim, iconStart);
          
           if(phim.success){
                console.log("Đã thêm vào collection 'Phim'");
                res.redirect('/phim');
            }else{
                
                for (let index = 0; index < phim.message.length; index++) {
                    errors.push(phim.message[index]);  
                }
                res.render('phimUpdate', { errors,tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, dienVien, rapPhim, iconStart, _id });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa sửa được");
    }
});
router.get('/getIdPhim', async  (req, res, next)  =>{
  
    const { _id } = req.query;
    try {
      const result = await phimController.getById(_id);
      res.status(200).json({
        success: true,
         message: result,
         
      });
       
    } catch (error) {
        console.log('không lấy được được'+error);
        res.status(500).json({ success: false, message: 'Có lỗi xảy ra.' });
    }
  });
module.exports = router;
