const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rapPhimSchema = new Schema({
    tenRapPhim: String,
    diaChi: String,
    SDT: String,
    hinh: String,
});
// Khai báo model cho collection "sanpham"
const RapPhim = mongoose.model('RapPhim', rapPhimSchema,'RapPhim');
module.exports = RapPhim;
