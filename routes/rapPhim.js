var express = require('express');
var router = express.Router();

const rapPhimController = require('../controller/rapPhimController');
/* GET users listing. */
// http://localhost:3000/rapphim

router.get('/', async function(req, res, next) {
    try {
        const startIndex = 1;
        let rapPhim = await rapPhimController.getAll();
        rapPhim = rapPhim.map((el,index) => {
            return {
                _id: el._id,
                tenRapPhim: el.tenRapPhim,
                diaChi: el.diaChi,
                SDT: el.SDT,
                hinh: el.hinh,
                indexPlusOne: index + 1,

            }
        });
        res.render('rapPhim', { rp: rapPhim,startIndex })
        
    } catch (error) {
        console.log(error);
    }
});
router.get('/newRapPhim', function(req, res, next) {
    res.render('newRapPhim')
    
});
router.post('/newRapPhim',async function(req, res, next) {
    try {
        //lấy giá trị name từ body
        let { tenRapPhim, diaChi, SDT, hinh } = req.body;
        let errors=[];
        if (tenRapPhim.length <= 0) {
            errors.push("Không để trống tên Rạp");
        }
        if (diaChi.length <= 0) {
            errors.push("Không để trống địa chỉ");
        }
        if (SDT.length <= 0) {
            errors.push("Không để trống số điện thoại");
        }
        if (hinh.length <= 0) {
            errors.push("Không để trống hình ảnh");
        }
        if (errors.length > 0) {
            res.render('newRapPhim', { errors, tenRapPhim, diaChi, SDT, hinh });
        }else{
            let ojDB = {
                tenRapPhim: tenRapPhim, diaChi: diaChi, SDT: SDT, hinh: hinh
            }
            await rapPhimController.insert(ojDB);
            console.log("Đã thêm vào collection 'RapPhim'");
            res.redirect('/rapphim');
        }
       

    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa thêm được");
    }
});

router.get('/:id/del', async (req, res, next) => {
    let _id = req.params.id;
    try {
        await rapPhimController.del(_id);
        console.log("Delete OK");
        res.redirect('/rapphim');
    } catch (error) {
        console.error();
    }
})

router.get('/:id/edit', async  (req, res, next)  =>{
    let _id = req.params.id;
    try {
        let rapphim = await rapPhimController.getById(_id);
        res.render('rapPhimUpdate', { rp: rapphim })
        
    } catch (error) {
        console.log(error);
    }
});
router.post('/:id/edit',async function(req, res, next) {
    let _id = req.params.id;
    try {
        //lấy giá trị name từ body
        let { tenRapPhim, diaChi, SDT, hinh } = req.body;
            
        let newData = {
            tenRapPhim: tenRapPhim, diaChi: diaChi, SDT: SDT, hinh: hinh
          };
        await rapPhimController.update(_id, newData);
        console.log("Update OK");
        res.redirect('/rapphim');

    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa sửa được");
    }
});

module.exports = router;
