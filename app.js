var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

// kết nối mongodb 
async function connectDB(){
  const uri ="mongodb+srv://phuocnguyen1227:phuoc123456789@cluster0.pkevcxv.mongodb.net/Cinema"
  try{
    await mongoose.connect(uri);
    console.log("Connect success");
  }catch(e){
    console.error(e);
  }
 
}
connectDB();

var app = express();

// tạo biến chỉ đường tới router
var khachHangRoutes = require('./routes/khachHang')
var rapPhimRoutes = require('./routes/rapPhim')
var phimRoutes = require('./routes/phim')

var loginRoutes = require('./routes/login')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//thiết lặp địa chỉ cho biến router

app.use('/khachhang', khachHangRoutes);
app.use('/rapphim', rapPhimRoutes);
app.use('/phim', phimRoutes);
app.use('/login', loginRoutes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
