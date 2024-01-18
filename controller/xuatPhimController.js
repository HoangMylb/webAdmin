const XuatPhim = require('../model/phongModel');
const mongoose = require('mongoose');
async function getAll() {
  try {
    let xuatPhim = await XuatPhim.find({});
    return xuatPhim;
  } catch (error) {
    console.log(error);
  }
}
async function createXuatPhim(Phong,ngay,gio,Rap,Phim) {
  try {

      const xuatPhim = new XuatPhim({ Phong,ngay,gio,Rap,Phim});

      await xuatPhim.save();
      
      return { success: true, message: "Thành công XuatPhim" };


  } catch (error) {
    console.error("Lỗi khi thêm XuatPhim:", error);
    return { success: false, message: "Thất bại XuatPhim" };
  }
}


async function update(_id, ojDB) {
  try {
    await XuatPhim.updateOne({ _id }, ojDB);
  } catch (error) {
    console.log(error);
  }
}
async function insert (db){
    
  try {
      const item = new XuatPhim(db);
      await item.save();
     
  } catch (error) {
      console.log(error);
  }
}
async function getById(_id) {
  try {
    let xuatPhim = await XuatPhim.findById(_id);
    return xuatPhim;
  } catch (error) {
    console.log(error);
  }
}
async function del(_id) {

  try {
    await XuatPhim.deleteOne({ _id: _id });
    console.log("xóa");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getAll,createXuatPhim,insert,update,getById,del }