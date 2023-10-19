const Phim = require('../model/phimModel');
const RapPhim = require('../model/rapPhimModel');
const DienVien = require('../model/dienVienModel');

async function getAll() {
  try {
    let phim = await Phim.find({});
    return phim;
  } catch (error) {
    console.log(error);
  }
}

async function createPhim(tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, dienVien, rapPhim, iconStart) {

  try {

    let errors=[];
    const rapPhimArray = rapPhim.split(',').map((item) => item.trim()); // Tách chuỗi thành mảng và loại bỏ khoảng trắng
    const dienVienArray = dienVien.split(',').map((item) => item.trim()); // Tách chuỗi thành mảng và loại bỏ khoảng trắng

    const existingRapPhim = await RapPhim.find({ tenRapPhim: { $in: rapPhimArray } });// kiểm tra xem phần thêm vào đã có trong bảng thể loại chưa nếu cái nào chưa thì sẽ không được thêm vào
    const existingDienVien = await DienVien.find({ tenDienVien: { $in: dienVienArray } });

    //lọc _id và những thứ khác ngoài rapPhim
    const existingRapPhimNames = existingRapPhim.map((rapPhim) => rapPhim.tenRapPhim);
    const existingDienVienNames = existingDienVien.map((dienVien) => dienVien.tenDienVien);

    const nonExistingRapPhim = rapPhimArray.filter((rapPhim) => !existingRapPhimNames.includes(rapPhim));
    const nonExistingDienVien = dienVienArray.filter((dienVien) => !existingDienVienNames.includes(dienVien));


    if (nonExistingRapPhim.length === 0 && nonExistingDienVien.length === 0) {
      const phimMoi = new Phim({ tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, 
        rapPhim: existingRapPhim.map((rapPhim) => rapPhim._id), dienVien: existingDienVien.map((dienVien) => dienVien._id), iconStart });

      await phimMoi.save();
      console.log(phimMoi)
      return { success: true, message: "Thêm phim thành công" };
    } else {
      if (nonExistingRapPhim.length != 0) {
        errors.push("những Rạp phim này chưa có: " + nonExistingRapPhim);
      }
      if (nonExistingDienVien.length != 0) {  
        errors.push("những Diễn viên này chưa có: " + nonExistingDienVien);
      }
      if (errors.length > 0) {
        return { success: false, message: errors };
      }
    }


  } catch (error) {
    console.error("Lỗi khi thêm phim:", error);
  }
}
async function update (_id, newData){
  try {
   await Phim.updateOne({ _id}, newData);
  } catch (error) {
   console.log(error);
  }
}
async function del (_id){
 
  try {
      await Phim.deleteOne({ _id: _id });
      console.log("xóa");
     } catch (error) {
      console.log(error);
     }
}
async function getById(_id) {
  try {
    let phim = await Phim.findById(_id);
    return phim;
  } catch (error) {
    console.log(error);
  }
}


module.exports = { createPhim, getAll, update, del, getById}