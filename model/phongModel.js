const mongoose = require('mongoose');

const phongChieuSchema = new mongoose.Schema({
  Phong: String,
  ghe: [{
    tenGhe: String,
    empty: Boolean,
    selected: Boolean
  }],
  ngay: String,
  gio: String,
  Rap: String,
  Phim: String,
});

const PhongChieu = mongoose.model('PhongChieu', phongChieuSchema);

module.exports = PhongChieu;
