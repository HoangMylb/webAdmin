const YeuThich = require('../model/yeuThichModel');
const RapPhim = require('../model/rapPhimModel');
const DienVien = require('../model/dienVienModel');

async function getAll() {
  try {
    let yeuThich = await YeuThich.find({});
    return yeuThich;
  } catch (error) {
    console.log(error);
  }
}

async function createYeuThich(persons, phim) {
  try {
      const yeuThich = new YeuThich({ persons,phim});
      await yeuThich.save();
      console.log(yeuThich)
      return yeuThich
  } catch (error) {
    console.error("Lỗi khi thêm YeuThich:", error);
  }
}


async function del (persons, phim){
 
  try {
      await YeuThich.deleteOne({ persons, phim});
      console.log("xóa");
     } catch (error) {
      console.log(error);
     }
}
async function getYeuthich(persons) {
  try {
    let yeuThich = await YeuThich.find({ persons: persons });
    return yeuThich;
  } catch (error) {
    console.log(error);
  }
}
// controller.js
async function kiemTraYeuThich(persons, phim) {
  try {
    // Tìm các dòng dữ liệu trong bảng yeuthich có persons và phim tương ứng
    const yeuThich = await YeuThich.find({ persons, phim });
    
    // Nếu có dòng dữ liệu phù hợp, trả về true
    if (yeuThich.length > 0) {
      return true;
    } else {
      // Nếu không có dòng dữ liệu phù hợp, trả về false
      return false;
    }
  } catch (error) {
    console.log(error);
    // Trả về false nếu có lỗi xảy ra trong quá trình truy vấn
    return false;
  }
}


module.exports = { getAll, del, getYeuthich,createYeuThich,kiemTraYeuThich}