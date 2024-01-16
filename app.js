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
    // let phim = await Phim.find({ trangThai: "Đang chiếu" });
    // let rapPhim = await RapPhim.find({});
    // let phimArray = phim.map((phim) => phim._id);
    // let rapArray = rapPhim.map((rapPhim) => rapPhim._id);
    //const phimArray = ["652bc4ca47d84ead606478d1,6533f3d47d1b54efa9102ba7,6534818b7d1b54efa9102beb,653488bb7d1b54efa9102c0b,65373946fac858c102a14abb,65373f29fac858c102a14ad2,65374477fac858c102a14af5,65374dd1fac858c102a14b1e"]; // Sắp xếp danh sách phimArray sao cho mỗi rạp phim sẽ chiếu hết 8 phim
   // const rapArray = ["651e955fb343d4ba2edfbf10,651e9603b343d4ba2edfbf11,651e9686b343d4ba2edfbf12,6533de5948ad08feb38f018f,6533dfb948ad08feb38f0190,6533e0ad48ad08feb38f0191,6533e1b448ad08feb38f0192"];
    // Bây giờ bạn có thể tạo dữ liệu ở đây
    // console.log("Phim: " + phimArray);
    // console.log("rapPhim: " + rapArray);
    // let phongIndex = 0; // Biến đếm để chọn xen kẽ giữa các phòng chiếu

    // for (let day = 0; day < soNgay; day++) {
    //   const currentDate = new Date(startDate);
    //   currentDate.setDate(startDate.getDate() + day);
    
    //   for (const gio of gioChieu) {
    //     for (const rapId of rapArray) {
    //       for (const phimId of phimArray) {
    //         const existingRecord = await PhongChieu.findOne({
    //           ngay: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
    //           gio,
    //           Rap: rapId,
    //           Phim: phimId,
    //         });
    
    //         if (!existingRecord) {
    //           const phongName = phongNames[phongIndex]; // Chọn xen kẽ giữa các phòng chiếu
    //           phongIndex = (phongIndex + 1) % phongNames.length; // Tăng biến đếm và wrap nó lại nếu cần
    
    //           // Tạo lịch chiếu và lưu vào cơ sở dữ liệu
    //           const ghe = [
    //             { tenGhe: 'A01', empty: true, selected: false },
    //             { tenGhe: 'A02', empty: true, selected: false },
    //             { tenGhe: 'A03', empty: true, selected: false },
    //             { tenGhe: 'A04', empty: true, selected: false },
    //             { tenGhe: 'A05', empty: true, selected: false },
    //             { tenGhe: 'A06', empty: true, selected: false },
    //             { tenGhe: 'B01', empty: true, selected: false },
    //             { tenGhe: 'B02', empty: true, selected: false },
    //             { tenGhe: 'B03', empty: true, selected: false },
    //             { tenGhe: 'B04', empty: true, selected: false },
    //             { tenGhe: 'B05', empty: true, selected: false },
    //             { tenGhe: 'B06', empty: true, selected: false },
    //             { tenGhe: 'C01', empty: true, selected: false },
    //             { tenGhe: 'C02', empty: true, selected: false },
    //             { tenGhe: 'C03', empty: true, selected: false },
    //             { tenGhe: 'C04', empty: true, selected: false },
    //             { tenGhe: 'C05', empty: true, selected: false },
    //             { tenGhe: 'C06', empty: true, selected: false },
    //             { tenGhe: 'D01', empty: true, selected: false },
    //             { tenGhe: 'D02', empty: true, selected: false },
    //             { tenGhe: 'D03', empty: true, selected: false },
    //             { tenGhe: 'D04', empty: true, selected: false },
    //             { tenGhe: 'D05', empty: true, selected: false },
    //             { tenGhe: 'D06', empty: true, selected: false },
    //             { tenGhe: 'E01', empty: true, selected: false },
    //             { tenGhe: 'E02', empty: true, selected: false },
    //             { tenGhe: 'E03', empty: true, selected: false },
    //             { tenGhe: 'E04', empty: true, selected: false },
    //             { tenGhe: 'E05', empty: true, selected: false },
    //             { tenGhe: 'E06', empty: true, selected: false },
    //             { tenGhe: 'F01', empty: true, selected: false },
    //             { tenGhe: 'F02', empty: true, selected: false },
    //             { tenGhe: 'F03', empty: true, selected: false },
    //             { tenGhe: 'F04', empty: true, selected: false },
    //             { tenGhe: 'F05', empty: true, selected: false },
    //             { tenGhe: 'G06', empty: true, selected: false },
    //             { tenGhe: 'G01', empty: true, selected: false },
    //             { tenGhe: 'G02', empty: true, selected: false },
    //             { tenGhe: 'G03', empty: true, selected: false },
    //             { tenGhe: 'G04', empty: true, selected: false },
    //             { tenGhe: 'G05', empty: true, selected: false },
    //             { tenGhe: 'G06', empty: true, selected: false },
    //             { tenGhe: 'H01', empty: true, selected: false },
    //             { tenGhe: 'H02', empty: true, selected: false },
    //             { tenGhe: 'H03', empty: true, selected: false },
    //             { tenGhe: 'H04', empty: true, selected: false },
    //             { tenGhe: 'H05', empty: true, selected: false },
    //             { tenGhe: 'H06', empty: true, selected: false },

    //           ]; // Dữ liệu ghế
    //           const phongChieu = new PhongChieu({
    //             Phong: phongName,
    //             ghe,
    //             ngay: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
    //             gio,
    //             Rap: rapId,
    //             Phim: phimId,
    //           });
    
    //           try {
    //             await phongChieu.save();
    //             console.log(`Đã tạo lịch chiếu cho ${phongName} vào ngày ${phongChieu.ngay} lúc ${phongChieu.gio}`);
    //           } catch (error) {
    //             console.error(`Lỗi khi lưu lịch chiếu: ${error}`);
    //           }
    //         }
    //       }
    //     }
    //   }
    // }


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
var binhLuanRoutes = require('./routes/binhluan')
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
app.use('/otp', otpRouter);
app.use('/binhluan', binhLuanRoutes);

app.get('/lichchieu', async (req, res) => {
  try {
    const { Phim,Rap,ngay, gio } = req.query; // Lấy tham số ngày và giờ từ query string
    const phongChieu = await PhongChieu.find({  Phim,Rap,ngay, gio });

    if (phongChieu.length > 0) {
      res.json(phongChieu); // Trả về dữ liệu dưới dạng JSON nếu tìm thấy kết quả
    } else {
      res.status(404).json({ message: 'Không tìm thấy lịch chiếu cho ngày và giờ đã chỉ định' });
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
