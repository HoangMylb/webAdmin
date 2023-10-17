const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const KhachHangSchema = new Schema({
    tenKhachHang: String,
    userName: String,
    passWord: String,
    SDT: String,
    ngaySinh: String,
    vaiTro: String,
    gioiTinh: String,
    hinhAnh: String,
});
// Khai báo model cho collection "sanpham"
const KhachHang = mongoose.model('Persons', KhachHangSchema,'Persons');
module.exports = KhachHang;
