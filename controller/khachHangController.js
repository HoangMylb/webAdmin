const KhachHang = require('../model/khachHangModel');

async function getAll (){
   try {
    let khachHang = await KhachHang.find({});
    return khachHang;
   } catch (error) {
    console.log(error);
   }
}
async function login(userName, passWord) {
  try {
    let khachHang = await KhachHang.find({ userName, passWord});
    if (khachHang.length > 0) {
      console.log("vaiTro: " + khachHang[0].vaiTro);
    }else{
      console.log("vaiTro: không có trong bảng khachhang ");
    }
      
      if (khachHang.length > 0 && khachHang[0].vaiTro === 'Khách hàng') {
        console.log("khachhang: "+  khachHang[0]);
        return { success: true, khachHang: khachHang[0], message: 'Đăng nhập thành công' }; // Trả về true nếu là khách hàng
      } else {  
        return { success: false, khachHang: null, message: 'Đăng nhập thất bại' }; // Trả về false nếu không là khách hàng
      }
    
  } catch (error) {
    return { success: false, khachHang: null, message: 'Lỗi trong quá trình đăng nhập' };
  }
}

async function updateUser (_id, newData){
  try {
   await KhachHang.updateOne({ _id}, newData);
  } catch (error) {
   console.log(error);
  }
}
async function getById(_id) {
  try {
    let khachHang = await KhachHang.findById(_id);
    return rapphim;
  } catch (error) {
    console.log(error);
  }
}
async function getByVaiTro() {
    try {
      const khachHang = await KhachHang.find({vaiTro: 'Khách hàng'});
      return khachHang;
    } catch (error) {
      console.log(error);
    }
  }
module.exports={getAll,getByVaiTro,login,updateUser,getById}