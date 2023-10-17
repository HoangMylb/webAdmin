const KhachHang = require('../model/khachHangModel');
function isEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/; // Biểu thức chính quy kiểm tra định dạng email
  return emailRegex.test(email);
}
function isPhoneNumber(phoneNumber) {
  const phoneRegex = /^[0-9]{10}$/; // Biểu thức chính quy kiểm tra số điện thoại 10 chữ số
  return phoneRegex.test(phoneNumber);
}
function isPassWord(passWord) {
  return passWord.length >= 6 && passWord.length <= 20;
}
async function newKhachHang(tenKhachHang, userName, passWord, rePassWord, SDT, ngaySinh, vaiTro, gioiTinh, hinhAnh) {

  try {
    const errors = [];
    const errors2 = [];
    if (!tenKhachHang) {
      errors.push('Không để trống Họ và tên');
    }
    if (!userName) {
      errors.push('Không để trống Email');
    }
    if (!SDT) {
      errors.push('Không để trống Số điện thoại');
    }
    if (!gioiTinh) {
      errors.push('Không để trống Giới tính');
    }
    if (!ngaySinh) {
      errors.push('Không để trống Ngày Sinh');
    }
    if (!passWord) {
      errors.push('Không để trống Mật khẩu');
    }
    if (!rePassWord) {
      errors.push('Không để trống Xác nhận mật khẩu');
    }
    if (!vaiTro) {
      errors.push('Trống vaitro');
    }
   
    if (!hinhAnh) {
      errors.push('Trống hinhAnh');
    }
    if (!isEmail(userName)) {
      errors2.push('Nhập không đúng định dạng Email');
    }
    if (!isPhoneNumber(SDT)) {
      errors2.push('Nhập sai dịnh dạng Số điện thoại');
    }
    if (!isPassWord(passWord)) {
      errors2.push('Nhập mật khẩu chỉ được nhập ít nhất 6 ký tự và dài nhất 20 ký tự');
    }
    if (errors.length > 0) {
      return { success: false, message: errors };
    }
    else {
      const existingUserWithEmail = await KhachHang.findOne({ userName });
      const existingUserWithSDT = await KhachHang.findOne({ SDT });
      // Kiểm tra xem email và SDT đã tồn tại trong cơ sở dữ liệu chưa
      if (existingUserWithEmail) {
        errors2.push('Email này đã được sử dụng');
      }
      if (existingUserWithSDT) {
        errors2.push('Số điện thoại này đã được sử dụng');
      }
      if (rePassWord!=passWord) {
        errors2.push('Mật khẩu không trùng nhau');
      }
      if (errors2.length > 0) {
        return { success: false, message: errors2 };
      } 
      else {
        const item = new KhachHang({tenKhachHang, userName, passWord, SDT, ngaySinh, vaiTro, gioiTinh, hinhAnh});
        await item.save();
      }

      return { success: true, message: 'Đăng ký thành công' };
    }

  } catch (error) {
    console.log(error);
    return { success: false, message: 'Lỗi trong quá trình đăng ký' };
  }
}
async function login(userName, passWord) {
  try {
    let khachHang = await KhachHang.find({ userName, passWord });
    if (khachHang.length > 0) {
      console.log("vaiTro: " + khachHang[0].vaiTro);
    } else {
      console.log("vaiTro: không có trong bảng khachhang ");
    }

    if (khachHang.length > 0 && khachHang[0].vaiTro === 'Khách hàng') {
      console.log("khachhang: " + khachHang[0]);
      return { success: true, khachHang: khachHang[0], message: 'Đăng nhập thành công' }; // Trả về true nếu là khách hàng
    } else {
      return { success: false, khachHang: null, message: 'Đăng nhập thất bại' }; // Trả về false nếu không là khách hàng
    }

  } catch (error) {
    return { success: false, khachHang: null, message: 'Lỗi trong quá trình đăng nhập' };
  }
}

async function updateUser(_id, newData) {
  try {
    await KhachHang.updateOne({ _id }, newData);
  } catch (error) {
    console.log(error);
  }
}
async function getById(_id) {
  try {
    let khachHang = await KhachHang.findById(_id);
    return rapphim;
  } catch (error) {
    console.log(error);
  }
}
async function getByVaiTro() {
  try {
    const khachHang = await KhachHang.find({ vaiTro: 'Khách hàng' });
    return khachHang;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { newKhachHang, getByVaiTro, login, updateUser, getById }