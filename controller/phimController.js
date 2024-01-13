const Phim = require('../model/phimModel');
const RapPhim = require('../model/rapPhimModel');
const DienVien = require('../model/dienVienModel');
const BinhLuan = require('../model/binhLuanModel');
async function createPhim(tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, dienVien, rapPhim, iconStart, trangThai,ngay) {

  try {

    let errors = [];
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
      const phimMoi = new Phim({
        tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon,
        rapPhim: existingRapPhim.map((rapPhim) => rapPhim._id), dienVien: existingDienVien.map((dienVien) => dienVien._id), iconStart, trangThai,ngay
      });

      await phimMoi.save();

      console.log('idddđ: ', phimMoi._id)
      const binhLuan = new BinhLuan({
        phim: phimMoi._id,
        binhluan: {
          userID: '1',
          ngay: '1',
          noiDung: '1',
          hinhAnh: '1',
          userTen: '1',
        },
      });
      await binhLuan.save();
      // Xóa tất cả dữ liệu trong mảng binhluan
      binhLuan.binhluan = [];

      // Lưu lại bình luận sau khi đã xóa tất cả dữ liệu
      await binhLuan.save();
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
async function getAll() {
  try {
    let phim = await Phim.find({});
    return phim;
  } catch (error) {
    console.log(error);
  }
}
async function getFirstThree() {
  try {
    let phim = await Phim.find({ trangThai: "Đang chiếu" });
    // Sử dụng slice để lấy 3 phần tử đầu tiên
    let firstThree = phim.slice(0, 5);
    return firstThree;
  } catch (error) {
    console.log(error);
  }
}
async function getPhimDangChieu() {
  try {
    let phim = await Phim.find({ trangThai: "Đang chiếu" });

    return phim;
  } catch (error) {
    console.log(error);
  }
}
async function getFirstThreeSC() {
  try {
    let phim = await Phim.find({ trangThai: "Sắp chiếu" });
    // Sử dụng slice để lấy 3 phần tử đầu tiên
    let firstThree = phim.slice(0, 5);
    return firstThree;
  } catch (error) {
    console.log(error);
  }
}
async function getPhimSapChieu() {
  try {
    let phim = await Phim.find({ trangThai: "Sắp chiếu" });

    return phim;
  } catch (error) {
    console.log(error);
  }
}
async function getMangPhim(_id) {
  try {

    // Sử dụng Phim.find với $in operator để tìm tất cả các mục có _id trong mảng _ids
    const phims = await Phim.find({ _id: { $in: _id } });

    return phims;

  } catch (error) {
    console.log(error);
  }
}


async function update(_id, tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon, dienVien, rapPhim, iconStart, trangThai,ngay) {
  try {

    let errors = [];
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
      const phimMoi = await Phim.updateOne({ _id: _id }, {
        tenPhim, theLoaiPhim, trailer, poster, thoiLuongPhim, noiDungPhim, icon,
        dienVien: existingDienVien.map((dienVien) => dienVien._id), rapPhim: existingRapPhim.map((rapPhim) => rapPhim._id), iconStart, trangThai,ngay
      });
      console.log(phimMoi)
      return { success: true, message: "Cập nhật phim thành công" };
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
    console.error("Lỗi khi Sửa phim:", error);
  }
}
async function del(_id) {

  try {
    await Phim.deleteOne({ _id: _id });
    await BinhLuan.deleteMany({ phim: _id });
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


module.exports = { getPhimSapChieu, getFirstThreeSC, getPhimDangChieu, createPhim, getAll, update, del, getById, getFirstThree, getMangPhim }