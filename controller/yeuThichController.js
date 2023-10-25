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


module.exports = { getAll, del, getYeuthich,createYeuThich}