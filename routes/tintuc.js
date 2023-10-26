var express = require('express');
var router = express.Router();

const tintucController = require('../controller/tintucController');
/* GET users listing. */
// http://localhost:3000/rapphim

router.get('/', async function(req, res, next) {
    try {
        const startIndex = 1;
        let tintuc = await tintucController.getAll();
        tintuc = tintuc.map((el,index) => {
            return {
                _id: el._id,
                title: el.title,
                chitiet: el.chitiet,
                image: el.image,
                indexPlusOne: index + 1,

            }
        });
        res.render('tintuc', { rp: tintuc,startIndex })
        
    } catch (error) {
        console.log(error);
    }
 });
 router.get('/newTinTuc', function(req, res, next) {
    res.render('newTinTuc')
    
});
router.post('/newTinTuc',async function(req, res, next) {
    try {
        //lấy giá trị name từ body
        let {title , chitiet, image } = req.body;
        let errors=[];
        if (title.length <= 0) {
            errors.push("Không để trống tiêu đề");
        }
        if (chitiet.length <= 0) {
            errors.push("Không để trống chi tiết");
        }
        
        if (image.length <= 0) {
            errors.push("Không để trống hình ảnh");
        }
        if (errors.length > 0) {
            res.render('newTinTuc', { errors, title, chitiet, image });
        }else{
            
            await tintucController.insert( title, chitiet, image );
            console.log("Đã thêm vào collection 'TinTuc'");
            res.redirect('/tintuc');
        }
       

    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa thêm được");
    }
 });

router.get('/:id/del', async (req, res, next) => {
    let _id = req.params.id;
    try {
        await tintucController.del(_id);
        console.log("Delete OK");
        res.redirect('/tintuc');
    } catch (error) {
        console.error();
    }
})

router.get('/:id/edit', async  (req, res, next)  =>{
    let _id = req.params.id;
    try {
        let tintuc = await tintucController.getById(_id);
        res.render('tintucUpdate', { rp: tintuc })
        
    } catch (error) {
        console.log(error);
    }
});
router.post('/:id/edit',async function(req, res, next) {
    let _id = req.params.id;
    try {
        //lấy giá trị name từ body
        let {title , chitiet, image } = req.body;
        let errors=[];
        if (title.length <= 0) {
            errors.push("Không để trống tiêu đề");
        }
        if (chitiet.length <= 0) {
            errors.push("Không để trống chi tiết");
        }
        
        if (image.length <= 0) {
            errors.push("Không để trống hình ảnh");
        }
        if (errors.length > 0) {
            res.render('newTinTuc', { errors, title, chitiet, image });
        }else{
            
            await tintucController.update(_id, title, chitiet, image);
            console.log("Đã thêm vào collection 'TinTuc'");
            res.redirect('/tintuc');
        }
       

    } catch (err) {
        console.error(err);
        res.status(500).send("Chưa thêm được");
    }
 });

module.exports = router;
