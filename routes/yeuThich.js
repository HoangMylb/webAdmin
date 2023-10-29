var express = require('express');
var router = express.Router();

const yeuThichController = require('../controller/yeuThichController');
/* GET users listing. */
// http://localhost:3000/

router.get('/', async function(req, res, next) {
    try {
        let yeuthich = await yeuThichController.getAll();
        res.status(200).json({
            success: true,
             message: yeuthich,
          });
    } catch (error) {
        console.log(error);
    }
 });
 router.post('/newYeuThich', async function(req, res, next) {
    try {
        let { persons,  phim } = req.body;
        let yeuthich = await yeuThichController.createYeuThich(persons,  phim);
        res.status(200).json({
            success: true,
             message: yeuthich,
          });
    } catch (error) {
        console.log(error);
    }
 });
 router.get('/getYeuThich', async function(req, res, next) {
    try {
        const { persons } = req.query;
        let yeuthich = await yeuThichController.getYeuthich(persons);
        res.status(200).json({
            success: true,
             message: yeuthich,
          });
    } catch (error) {
        console.log(error);
    }
 });
 router.post('/xoaYeuThich', async (req, res, next) => {
    let { persons, phim } = req.body;
    try {
        await yeuThichController.del( persons, phim );
        res.status(200).json({
            success: true,
             message: "Xoá thành công",
          });
    } catch (error) {
        console.error();
    }
})
router.get('/kiemTraYeuThich', async function(req, res, next) {
    try {
        const { persons,phim } = req.query;
        let yeuthich = await yeuThichController.kiemTraYeuThich(persons,phim);
        if (yeuthich) {
            res.status(200).json({
                success: true,
            });
        } else {
            res.status(200).json({
                success: false,
            });
        }
    } catch (error) {
        console.log(error);
    }
 });

module.exports = router;
