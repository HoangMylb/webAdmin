const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DienVien = require('./dienVienModel');
const RapPhim = require('./rapPhimModel');

const PhimSchema = new Schema({
    tenPhim: String,
    theLoaiPhim: [String],
    trailer: String,
    poster: String,
    thoiLuongPhim: String,
    noiDungPhim: String,
    icon: String,
    rapPhim: [
      {
        type: Schema.Types.ObjectId,
        ref: 'RapPhim'
      }
    ],
  dienVien: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DienVien'
    }
  ],
  iconStart: String
    
});
// Khai báo model cho collection "sanpham"
const Phim = mongoose.model('Phim', PhimSchema,'Phim');
module.exports = Phim;

