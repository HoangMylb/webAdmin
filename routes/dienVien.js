var express = require('express');
var router = express.Router();

const dienVienController = require('../controller/dienVienController');
/* GET users listing. */
// http://localhost:3000/rapphim

router.get('/', async function (req, res, next) {
    try {
        const startIndex = 1;
        let dienVien = await dienVienController.getAll();
        dienVien = dienVien.map((el,index) => {
            return {
                _id: el._id,
                tenDienVien: el.tenDienVien,
                hinhAnh: el.hinhAnh,
                indexPlusOne: index + 1,

            }
        });
        res.render('dienVien', { dv: dienVien,startIndex })

    } catch (error) {
        console.log(error);
    }
});
router.get('/newDienVien', function (req, res, next) {
    res.render('newDienVien')

});
router.post('/newDienVien', async function (req, res, next) {
    try {
        //lấy giá trị name từ body
        let { tenDienVien, hinhAnh } = req.body;
        let errors = [];
        let errors2 = [];
        if (tenDienVien.length <= 0) {
            errors.push("Không để trống tên Rạp");
        }
        if (hinhAnh.length <= 0) {
            errors.push("Không để trống địa chỉ hình ảnh");
        }

        if (errors.length > 0) {
            res.render('newDienVien', { errors, tenDienVien, hinhAnh });
        } else {
            
            let dienvien = await dienVienController.insert(tenDienVien, hinhAnh);
            if (dienvien.success) {
                console.log(""+dienvien.message);
            res.redirect('/dienVien');
            }else{
                errors2.push(dienvien.message);
                if (errors2.length > 0) {
                    res.render('newDienVien', { errors2, tenDienVien, hinhAnh });
                }
                
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
        await dienVienController.del(_id);
        console.log("Delete OK");
        res.redirect('/dienVien');
    } catch (error) {
        console.error();
    }
})

router.get('/:id/edit', async (req, res, next) => {
    let _id = req.params.id;
    try {
        let dienVien = await dienVienController.getById(_id);
        res.render('dienVienUpdate', { dv: dienVien })

    } catch (error) {
        console.log(error);
    }
});

router.post('/:id/edit', async function (req, res, next) {
    let _id = req.params.id;
    try {
       //lấy giá trị name từ body
       let { tenDienVien, hinhAnh } = req.body;
       let errors = [];
       if (tenDienVien.length <= 0) {
           errors.push("Không để trống tên Rạp");
       }
       if (hinhAnh.length <= 0) {
           errors.push("Không để trống địa chỉ hình ảnh");
       }

       if (errors.length > 0) {
           res.render('dienVienUpdate', { errors, tenDienVien, hinhAnh,_id });
       } else {
           let ojDB = {
               tenDienVien: tenDienVien, hinhAnh: hinhAnh
           }

           await dienVienController.update(_id,ojDB);
           console.log("Sửa thành công");
           res.redirect('/dienVien');
       }
   } catch (err) {
       console.error(err);
       res.status(500).send("Chưa sửa được");
   }
});
//JSON app
router.get('/getAll', async function (req, res, next) {
    try {
      
        let dienVien = await dienVienController.getAll();
        res.status(200).json({
            success: true,
             message: dienVien,
             
          });

    } catch (error) {
        console.log(error);
    }
});
router.get('/getDienVien', async function (req, res, next) {
    try {
        const _id = req.query._id.split(',');


        let dienVien = await dienVienController.getDienVien(_id);
        res.status(200).json({
            success: true,
             message: dienVien,
             
          });
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;
