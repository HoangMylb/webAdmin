const DonHang = require('../model/donHangModel');


async function getAll() {
  try {
    let donHang = await DonHang.find({});
   
    return donHang;
  } catch (error) {
    console.log(error);
  }
}
async function getRapQT() {
  try {
    let donHang = await DonHang.find({ rapPhim: '651e955fb343d4ba2edfbf10'});
   
    return donHang;
  } catch (error) {
    console.log(error);
  }
}
async function getRapVT() {
  try {
    let donHang = await DonHang.find({ rapPhim: '651e9603b343d4ba2edfbf11'});
   
    return donHang;
  } catch (error) {
    console.log(error);
  }
}
async function getRapLD() {
  try {
    let donHang = await DonHang.find({ rapPhim: '651e9686b343d4ba2edfbf12'});
   
    return donHang;
  } catch (error) {
    console.log(error);
  }
}
async function getRapTC() {
  try {
    let donHang = await DonHang.find({ rapPhim: '6533de5948ad08feb38f018f'});
   
    return donHang;
  } catch (error) {
    console.log(error);
  }
}
async function getRapVL() {
  try {
    let donHang = await DonHang.find({ rapPhim: '6533dfb948ad08feb38f0190'});
   
    return donHang;
  } catch (error) {
    console.log(error);
  }
}
async function getRapND() {
  try {
    let donHang = await DonHang.find({ rapPhim: '6533e0ad48ad08feb38f0191'});
   
    return donHang;
  } catch (error) {
    console.log(error);
  }
}
async function getRapTB() {
  try {
    let donHang = await DonHang.find({ rapPhim: '6533e1b448ad08feb38f0192'});
   
    return donHang;
  } catch (error) {
    console.log(error);
  }
}
async function getDonHangUser(user) {
  try {
    let donHang = await DonHang.find({user});
    
    return { success: true, message: donHang };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Thất bại getDonHangUser" };
  }
}
async function createDonHang(user, phim,rapPhim, ngayDat, xuatChieu, ghe, soLuong, phongChieu, tien) {

  try {

      const donHang = new DonHang({ user, phim,rapPhim, ngayDat,xuatChieu, ghe, soLuong, phongChieu,tien });

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


module.exports = { createDonHang, getAll, getById,getDonHangUser,getRapQT,getRapVT, getRapLD, getRapTC, getRapVL, getRapND, getRapTB}