var express = require('express');
var router = express.Router();

const khachHangController = require('../controller/khachHangController');
/* GET users listing. */
// http://localhost:3000/khachhang
router.get('/', async function(req, res, next) {
    try {
      const startIndex = 1;
        let khachHang = await khachHangController.getByVaiTro();
        khachHang = khachHang.map((el,index) => {
            return {
                _id: el._id,
                tenKhachHang: el.tenKhachHang,
                userName: el.userName,
                passWord: el.passWord,
                SDT: el.SDT,
                ngaySinh: el.ngaySinh,
                vaiTro: el.vaiTro,
                gioiTinh: el.gioiTinh,
                hinhAnh: el.hinhAnh,
                indexPlusOne: index + 1,

            }
        });
        res.render('khachHang', { kh: khachHang ,startIndex})
        
    } catch (error) {
        console.log(error);
    }
});
router.post('/login', async function(req, res, next) {
    try {
        let { userName,passWord } = req.body;
        let khachHang = await khachHangController.login(userName,passWord);
      if (khachHang.success) {
        res.status(200).json({
          message: khachHang.message,
          username: userName,
          password: passWord,
          khachHang: khachHang.khachHang,
          success:  khachHang.success
        });
      } else {
        res.status(200).json({
          message: khachHang.message,
          username: userName,
          password: passWord,
          success:  khachHang.success
        });
      }
       
        
    } catch (error) {
        console.log(error);
    }
});

router.post('/newKhachHang',async function(req, res, next) {
  try {
      //lấy giá trị name từ body
      let { tenKhachHang, userName, passWord, rePassWord, SDT, ngaySinh, vaiTro, gioiTinh, hinhAnh } = req.body;
      
      
      let khachHang = await khachHangController.newKhachHang(tenKhachHang, userName, passWord, rePassWord, SDT, ngaySinh, vaiTro, gioiTinh, hinhAnh);
      if (khachHang.success) {
        res.status(200).json({
          message: khachHang.message,
          username: userName,
          password: passWord,
          success:  khachHang.success
        });
        console.log("Đã thêm vào collection 'Persons'");
      } else {
        res.status(200).json({
          message: khachHang.message,
          username: userName,
          password: passWord,
          success:  khachHang.success
        });
      }

  } catch (err) {
      console.error(err);
      res.status(500).send("Chưa thêm được");
  }
});
router.post('/SuaHoTen', async  (req, res, next)  =>{
  
  let { _id, tenKhachHang  } = req.body;
  try {
      let khachHang = await khachHangController.updateHoTen(_id,tenKhachHang);
      if(khachHang.success){
        res.status(200).json({
          message: khachHang.message,
          success:  khachHang.success
        });
      }else{
        res.status(200).json({
          message: khachHang.message,
          success:  khachHang.success
        });
      }
      
      
  } catch (error) {
      console.log('không sửa được'+error);
  }
});
router.post('/SuaSDT', async  (req, res, next)  =>{
  
  let { _id, SDT  } = req.body;
  try {
      let khachHang = await khachHangController.updateSDT(_id,SDT);
      if(khachHang.success){
        res.status(200).json({
          message: khachHang.message,
          success:  khachHang.success
        });
      }else{
        res.status(200).json({
          message: khachHang.message,
          success:  khachHang.success
        });
      }
      
      
  } catch (error) {
      console.log('không sửa được'+error);
  }
});
router.post('/SuaNgaySinh', async  (req, res, next)  =>{
  
  let { _id, ngaySinh  } = req.body;
  try {
      let khachHang = await khachHangController.updateNgaySinh(_id,ngaySinh);
      if(khachHang.success){
        res.status(200).json({
          message: khachHang.message,
          success:  khachHang.success
        });
      }else{
        res.status(200).json({
          message: khachHang.message,
          success:  khachHang.success
        });
      }
      
      
  } catch (error) {
      console.log('không sửa được'+error);
  }
});
router.post('/SuaEmail', async  (req, res, next)  =>{
  
  let { _id, userName  } = req.body;
  try {
      let khachHang = await khachHangController.updateEmail(_id,userName);
      if(khachHang.success){
        res.status(200).json({
          message: khachHang.message,
          success:  khachHang.success
        });
      }else{
        res.status(200).json({
          message: khachHang.message,
          success:  khachHang.success
        });
      }
      
      
  } catch (error) {
      console.log('không sửa được'+error);
  }
});
router.post('/SuaGioiTinh', async  (req, res, next)  =>{
  
  let { _id, gioiTinh  } = req.body;
  try {
      let khachHang = await khachHangController.updateGioiTinh(_id,gioiTinh);
      if(khachHang.success){
        res.status(200).json({
          message: khachHang.message,
          success:  khachHang.success
        });
      }else{
        res.status(200).json({
          message: khachHang.message,
          success:  khachHang.success
        });
      }
      
      
  } catch (error) {
      console.log('không sửa được'+error);
  }
});
router.post('/SuaPassWord', async  (req, res, next)  =>{
  
  let { _id, passWord, rePassWord  } = req.body;
  try {
      let khachHang = await khachHangController.updatePassWord(_id,passWord, rePassWord);
      if(khachHang.success){
        res.status(200).json({
          message: khachHang.message,
          success:  khachHang.success
        });
      }else{
        res.status(200).json({
          message: khachHang.message,
          success:  khachHang.success
        });
      }
      
      
  } catch (error) {
      console.log('không sửa được'+error);
  }
});
router.get('/getId', async  (req, res, next)  =>{
  
  const { _id } = req.query;
  try {
    const result = await khachHangController.getById(_id);
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
