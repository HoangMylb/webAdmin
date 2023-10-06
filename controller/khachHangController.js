const KhachHang = require('../model/khachHangModel');

async function getAll (){
   try {
    let khachHang = await KhachHang.find({});
    return khachHang;
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
module.exports={getAll,getByVaiTro}