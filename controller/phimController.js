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

async function createPhim(tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, dienVien, rapPhim) {

  try {


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
      const phimMoi = new Phim({ tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, rapPhim: existingRapPhim.map((rapPhim) => rapPhim._id), dienVien: existingDienVien.map((dienVien) => dienVien._id) });
      await phimMoi.save();
      console.log(phimMoi)
    } else {
     
      if (nonExistingRapPhim.length != 0) {
        console.log("những Rạp phim này chưa có: " + nonExistingRapPhim)
        console.log("lọc còn lại tên rạpphim: " + existingRapPhimNames)
        console.log("những thể loại này có trong bang: " + JSON.stringify(existingRapPhim))
       
      }
      if (nonExistingDienVien.length != 0) {  
        console.log("những Diễn viên này chưa có: " + nonExistingDienVien)
        console.log("lọc còn lại tên dienvien: " + existingDienVienNames)
        console.log("những thể loại này có trong bang: " + JSON.stringify(existingDienVien))
      }
    }


  } catch (error) {
    console.error("Lỗi khi thêm phim:", error);
  }


}


module.exports = { createPhim, getAll }