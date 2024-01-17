var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const PhongChieu = require('./model/phongModel');
const Phim = require('./model/phimModel');
const RapPhim = require('./model/rapPhimModel');
// kết nối mongodb 
const phongNames = ['Cinema 1', 'Cinema 2'];
const gioChieu = ['13:00', '16:00', '19:00', '21:00'];
const soNgay = 7;
const startDate = new Date();

   

async function connectDB() {
  const uri = "mongodb+srv://phuocnguyen1227:phuoc123456789@cluster0.pkevcxv.mongodb.net/Cinema";
  try {
    await mongoose.connect(uri);
    console.log("Connect success");
  

  } catch (e) {
    console.error(e);
  }
}


connectDB();


var app = express();

// tạo biến chỉ đường tới router
var khachHangRoutes = require('./routes/khachHang')
var rapPhimRoutes = require('./routes/rapPhim')
var phimRoutes = require('./routes/phim')
var dienVienRoutes = require('./routes/dienVien')
var tintucRoutes = require('./routes/tintuc')
var loginRoutes = require('./routes/login')
var yeuThichRoutes = require('./routes/yeuThich')
var paymentRoutes = require('./routes/paymentRoutes')
var donHangRoutes = require('./routes/donHang')
var otpRouter = require('./routes/User')
var xuatPhimRoutes = require('./routes/xuatPhim')
var binhLuanRoutes= require('./routes/binhluan')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
const hbs = require('hbs');

hbs.registerHelper('totalTien', function (donHang) {
  // Sử dụng hàm reduce để tính tổng tiền
  const total = donHang.reduce((accumulator, item) => accumulator + item.tien, 0);
  return total;
});

hbs.registerHelper('formatNumber', function (number) {
  return number.toLocaleString('en-US');
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//thiết lặp địa chỉ cho biến router

app.use('/khachhang', khachHangRoutes);
app.use('/rapphim', rapPhimRoutes);
app.use('/phim', phimRoutes);
app.use('/dienVien', dienVienRoutes);
app.use('/login', loginRoutes);
app.use('/tintuc', tintucRoutes);
app.use('/yeuthich', yeuThichRoutes);
app.use('/payments', paymentRoutes);
app.use('/donhang', donHangRoutes);
app.use('/xuatPhim', xuatPhimRoutes);
app.use('/otp', otpRouter);
app.use('/binhluan', binhLuanRoutes);

app.get('/lichchieu', async (req, res) => {
  try {
    const { Phim,Rap,ngay } = req.query; // Lấy tham số ngày và giờ từ query string
    const phongChieu = await PhongChieu.find({  Phim,Rap,ngay});

    if (phongChieu.length > 0) {
      res.json(phongChieu); // Trả về dữ liệu dưới dạng JSON nếu tìm thấy kết quả
    } else {
      res.status(404).json({ message: 'Không tìm thấy lịch chiếu cho ngày  đã chỉ định' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Lỗi khi truy vấn dữ liệu lịch chiếu' });
  }
});

app.put('/updateGhe', async (req, res) => {
  try {
    const { phongId, gheIds, Phim, Rap, ngay, gio } = req.body;
    const empty = false; // Giá trị empty từ máy khách (true hoặc false)
    const selected = false;

    // Tìm tài liệu phòng dựa trên nhiều điều kiện
    const phongChieu = await PhongChieu.findOne({ _id: phongId, Phim, Rap, ngay, gio });

    if (!phongChieu) {
      return res.status(404).json({ message: 'Không tìm thấy phòng chiếu' });
    }

    // Duyệt qua từng ID ghế và cập nhật biến empty và selected của từng ghế
    for (const gheId of gheIds) {
      const gheToUpdate = phongChieu.ghe.find((ghe) => ghe._id.toString() === gheId);

      if (gheToUpdate) {
        gheToUpdate.empty = empty;
        gheToUpdate.selected = selected;
      }
    }

    // Lưu lại tài liệu phòng đã cập nhật
    await phongChieu.save();

    res.json({ message: 'Cập nhật thành công', updatedPhongChieu: phongChieu });
  } catch (error) {
    res.status(404).json({ message: 'Lỗi khi cập nhật dữ liệu lịch chiếu' });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 404);
  res.render('error');
});

module.exports = app;
