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
      if (rePassWord != passWord) {
        errors2.push('Mật khẩu không trùng nhau');
      }
      if (errors2.length > 0) {
        return { success: false, message: errors2 };
      }
      else {
        const item = new KhachHang({ tenKhachHang, userName, passWord, SDT, ngaySinh, vaiTro, gioiTinh, hinhAnh });
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
    if (khachHang.length > 0 && khachHang[0].vaiTro === 'Khách hàng') {
      console.log("vaiTro: " + khachHang[0].vaiTro);
      console.log("khachhang: " + khachHang[0]);
      return { success: true, khachHang: khachHang[0], message: 'Đăng nhập thành công' };
    } else {
      console.log("vaiTro: không có trong bảng khachhang ");
      return { success: false, khachHang: null, message: 'Sai email hoặc password' };
    }

  } catch (error) {
    return { success: false, khachHang: null, message: 'Lỗi trong quá trình đăng nhập' };
  }
}
async function loginAdmin(userName, passWord) {
  try {
    if (userName.length <= 0 || passWord.length <= 0) {
      return { success: false, message: 'Không để trống Email hoặc Password' };
    } else {
      let khachHang = await KhachHang.find({ userName, passWord });
      if (khachHang.length > 0) {
        console.log("vaiTro: " + khachHang[0].vaiTro);
        if (khachHang.length > 0 && khachHang[0].vaiTro === 'Quản trị viên') {
          console.log("khachhang: " + khachHang[0]);
          return { success: true, khachHang: khachHang[0], message: 'Đăng nhập thành công' }; // Trả về true nếu là khách hàng
        } else {
          return { success: false, khachHang: null, message: 'Đăng nhập thất bại' }; // Trả về false nếu không là khách hàng
        }
      } else {
        return { success: false, message: 'Sai mật khẩu hoặc Email' };
      }
    }


  } catch (error) {
    return { success: false, khachHang: null, message: 'Lỗi trong quá trình đăng nhập' };
  }
}
async function getById(_id) {
  try {
    let khachHang = await KhachHang.findById(_id);
    return khachHang;
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
async function updateHoTen(_id, tenKhachHang) {
  try {
    const errors = [];
    if (!tenKhachHang) {
      errors.push('Không để trống Họ và tên');
    }

    if (errors.length > 0) {
      return { success: false, message: errors };
    }
    else {
      await KhachHang.findOneAndUpdate({ _id }, {tenKhachHang});
      return { success: true, message: 'Cập nhật thành công' };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Lỗi trong quá trình cập nhật' };
  }
}
async function updateSDT(_id, SDT) {
  try {
    const errors = [];
    const errors2 = [];
    if (!SDT) {
      errors.push('Không để trống Số điện thoại');
    }
    if (!isPhoneNumber(SDT)) {
      errors2.push('Nhập sai dịnh dạng Số điện thoại');
    }

    if (errors.length > 0) {
      return { success: false, message: errors };
    }
    else {
      const existingUserWithSDT = await KhachHang.findOne({ SDT });
      if (existingUserWithSDT) {
        errors2.push('Số điện thoại này đã được sử dụng');
      }
      if (errors2.length > 0) {
        return { success: false, message: errors2 };
      }else{
        await KhachHang.findOneAndUpdate({ _id }, {SDT});
        return { success: true, message: 'Cập nhật thành công' };
      }
      
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Lỗi trong quá trình cập nhật' };
  }
}
async function updateNgaySinh(_id, ngaySinh) {
  try {
    const errors = [];
    if (!ngaySinh) {
      errors.push('Không để trống Ngày sinh');
    }

    if (errors.length > 0) {
      return { success: false, message: errors };
    }
    else {
      await KhachHang.findOneAndUpdate({ _id }, {ngaySinh});
      return { success: true, message: 'Cập nhật thành công' };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Lỗi trong quá trình cập nhật' };
  }
}
async function updateEmail(_id, userName) {
  try {
    const errors = [];
    const errors2 = [];
    if (!userName) {
      errors.push('Không để trống Email');
    }
    if (!isEmail(userName)) {
      errors2.push('Nhập không đúng định dạng Email');
    }
    if (errors.length > 0) {
      return { success: false, message: errors };
    }
    else {
      const existingUserWithEmail = await KhachHang.findOne({ userName });
      if (existingUserWithEmail) {
        errors2.push('Email này đã được sử dụng');
      }
      if (errors2.length > 0) {
        return { success: false, message: errors2 };
      }else{
        await KhachHang.findOneAndUpdate({ _id }, {userName});
        return { success: true, message: 'Cập nhật thành công' };
      }
      
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Lỗi trong quá trình cập nhật' };
  }
}
async function updateGioiTinh(_id, gioiTinh) {
  try {
    const errors = [];
    if (!gioiTinh) {
      errors.push('Không để trống Giới tính');
    }

    if (errors.length > 0) {
      return { success: false, message: errors };
    }
    else {
      await KhachHang.findOneAndUpdate({ _id }, {gioiTinh});
      return { success: true, message: 'Cập nhật thành công' };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Lỗi trong quá trình cập nhật' };
  }
}
async function updatePassWord(_id, passWord,rePassWord) {
  try {
    const errors = [];
    const errors2 = [];
    if (!passWord) {
      errors.push('Không để trống PassWord');
    }
    if (!isPassWord(passWord)) {
      errors2.push('Nhập mật khẩu chỉ được nhập ít nhất 6 ký tự và dài nhất 20 ký tự');
    }
    if (errors.length > 0) {
      return { success: false, message: errors };
    }
    else {
      if (rePassWord != passWord) {
        errors2.push('Mật khẩu không trùng nhau');
      }
      if (errors2.length > 0) {
        return { success: false, message: errors2 };
      }else{
        await KhachHang.findOneAndUpdate({ _id }, {passWord});
        return { success: true, message: 'Cập nhật thành công' };
      }
      
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Lỗi trong quá trình cập nhật' };
  }
}
async function updateHinhAnh(_id, hinhAnh) {
  try {
    const errors = [];
    if (!hinhAnh) {
      errors.push('Không để trống Hình ảnh');
    }

    if (errors.length > 0) {
      return { success: false, message: errors };
    }
    else {
      await KhachHang.findOneAndUpdate({ _id }, {hinhAnh});
      return { success: true, message: 'Cập nhật thành công' };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Lỗi trong quá trình cập nhật' };
  }
}
module.exports = { newKhachHang, getByVaiTro, login, loginAdmin,updateHinhAnh, updateHoTen, getById,updateSDT,updateNgaySinh,updateEmail,updateGioiTinh,updatePassWord }