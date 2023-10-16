const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dienVienSchema = new Schema({
    tenDienVien: String,
    hinhAnh: String,
    
});
// Khai báo model cho collection "DienVien"
const DienVien = mongoose.model('DienVien', dienVienSchema,'DienVien');
module.exports = DienVien;
