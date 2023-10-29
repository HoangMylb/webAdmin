const DienVien = require('../model/dienVienModel');
const mongoose = require('mongoose');
async function getAll() {
  try {
    let dienVien = await DienVien.find({});
    return dienVien;
  } catch (error) {
    console.log(error);
  }
}
async function insert(tenDienVien, hinhAnh) {
  try {
    const count = await DienVien.countDocuments({ tenDienVien });

    if (count > 0) {
      console.log(count);
      return { success: false, message: "Diễn viên này đã có rồi" };
      
    } else {
      const item = new DienVien({ tenDienVien, hinhAnh });
      await item.save();
      return { success: true, message: "Thêm phim thành công" };
    }
  } catch (error) {
    console.log(error);
  }
}

async function update(_id, newData) {
  try {
    await DienVien.updateOne({ _id }, newData);
  } catch (error) {
    console.log(error);
  }
}
async function del(_id) {

  try {
    await DienVien.deleteOne({ _id: _id });
    console.log("xóa");
  } catch (error) {
    console.log(error);
  }
}
async function getById(_id) {
  try {
    let dienVien = await DienVien.findById(_id);
    return dienVien;
  } catch (error) {
    console.log(error);
  }
}
async function getDienVien(_id) {
  try {
    // Sử dụng Promise.all để truy vấn dữ liệu cho tất cả _id
    const dienViensPromises = _id.map(async (_ids) => {
      const dienVien = await DienVien.findById(_ids);
      return dienVien;
    });

    // Chờ cho tất cả các truy vấn hoàn thành
    const dienViens = await Promise.all(dienViensPromises);

    return dienViens;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { getAll, insert, update, del, getById, getDienVien }