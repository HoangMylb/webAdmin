const DonHang = require('../model/donHangModel');


async function getAll() {
  try {
    let donHang = await DonHang.find({});
    console.log("donhangControl: "+ donHang);
    return donHang;
  } catch (error) {
    console.log(error);
  }
}
async function getDonHangUser(user) {
  try {
    let donHang = await DonHang.find({user});
    console.log("donhangControl: "+ donHang);
    return { success: true, message: donHang };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Thất bại getDonHangUser" };
  }
}
async function createDonHang(user, phim,rapPhim, ngayDat, xuatChieu, ghe, soLuong, tien) {

  try {

      const donHang = new DonHang({ user, phim,rapPhim, ngayDat,xuatChieu, ghe, soLuong, tien });

      await donHang.save();
      
      return { success: true, message: donHang };


  } catch (error) {
    console.error("Lỗi khi thêm DonHang:", error);
    return { success: false, message: "Thất bại DonHang" };
  }
}

async function getById(_id) {
  try {
    let donHang = await DonHang.findById(_id);
    return donHang;
  } catch (error) {
    console.log(error);
  }
}


module.exports = { createDonHang, getAll, getById,getDonHangUser}