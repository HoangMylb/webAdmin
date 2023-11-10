const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DonHangSchema = new Schema({
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Person'
    }
  ],
phim: [
  {
    type: Schema.Types.ObjectId,
    ref: 'Phim'
  }
],
rapPhim: [
  {
    type: Schema.Types.ObjectId,
    ref: 'RapPhim'
  }
],
    ngayDat: String,
    xuatChieu: String,
    ghe: String,
    soLuong: Number,
    phongChieu: String,
    tien: Number,
    
});
// Khai báo model cho collection "sanpham"
const DonHang = mongoose.model('DonHang', DonHangSchema,'DonHang');
module.exports = DonHang;

