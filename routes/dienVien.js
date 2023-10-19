var express = require('express');
var router = express.Router();

const dienVienController = require('../controller/dienVienController');
/* GET users listing. */
// http://localhost:3000/rapphim

router.get('/', async function (req, res, next) {
    try {
        let dienVien = await dienVienController.getAll();
        dienVien = dienVien.map(el => {
            return {
                _id: el._id,
                tenDienVien: el.tenDienVien,
                hinhAnh: el.hinhAnh,

            }
        });
        res.render('dienVien', { dv: dienVien })

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
        if (tenDienVien.length <= 0) {
            errors.push("Không để trống tên Rạp");
        }
        if (hinhAnh.length <= 0) {
            errors.push("Không để trống địa chỉ");
        }

        if (errors.length > 0) {
            res.render('newDienVien', { errors, tenDienVien, hinhAnh });
        } else {
            let ojDB = {
                tenDienVien: tenDienVien, hinhAnh: hinhAnh
            }

            await dienVienController.insert(ojDB);
            console.log("Đã thêm vào collection 'DienVien'");
            res.redirect('/dienVien');
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
        let ojDB = {
            tenDienVien: tenDienVien, hinhAnh: hinhAnh
        }
        await dienVienController.update(_id, ojDB);

        res.redirect('/dienVien');


    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa sửa được");
    }
});

module.exports = router;
