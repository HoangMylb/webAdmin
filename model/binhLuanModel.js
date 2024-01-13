const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BinhLuanSchema = new Schema({
 
phim: [
  {
    type: Schema.Types.ObjectId,
    ref: 'Phim'
  }
],
binhluan: [
  {
    userID: String,
    ngay: String,
    noiDung: String,
    hinhAnh: String,
    userTen: String, 
  },
],
});
// Khai báo model cho collection "sanpham"
const BinhLuan = mongoose.model('BinhLuan', BinhLuanSchema,'BinhLuan');
module.exports = BinhLuan;

