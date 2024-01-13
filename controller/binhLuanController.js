const BinhLuan = require('../model/binhLuanModel');


async function getAll() {
  try {
    let binhluan = await BinhLuan.find({});
    
    return binhluan;
  } catch (error) {
    console.log(error);
  }
}

async function createBinhLuanPhim(phim,userID,ngay,noiDung,hinhAnh,userTen) {
    try {
        const binhLuan = new BinhLuan({
            phim,
            binhluan: {
                userID,
              ngay,
              noiDung,
              hinhAnh,
              userTen,
            },
          });
      await binhLuan.save();
       // Xóa tất cả dữ liệu trong mảng binhluan
    binhLuan.binhluan = [];

    // Lưu lại bình luận sau khi đã xóa tất cả dữ liệu
    await binhLuan.save();

      return { success: true, message: binhLuan };
    } catch (error) {
      console.error("Lỗi khi thêm BinhLuan:", error);
      return { success: false, message: "Thất bại BinhLuan" };
    }
  }
  
  async function addCommentToBinhLuan(_id, userID,ngay,noiDung,hinhAnh,userTen) {
    try {
      const binhLuan = await BinhLuan.findById(_id);
  
      if (!binhLuan) {
        return { success: false, message: "Không tìm thấy bình luận" };
      }
      const newComment = {
        userID,
        ngay,
        noiDung,
        hinhAnh,
        userTen,
      };
      binhLuan.binhluan.push(newComment);
      await binhLuan.save();
  
      return { success: true, message: binhLuan };
    } catch (error) {
      console.error("Lỗi khi thêm bình luận:", error);
      return { success: false, message: "Thất bại khi thêm bình luận" };
    }
  }
  
 
  async function removeBinhLuanFromPhim(_id, binhLuanId) {
    try {
      // Tìm bộ phim theo ID
      const binhLuan = await BinhLuan.findById(_id);
  
      if (!binhLuan) {
        return { success: false, message: "Không tìm thấy id" };
      }
  
      // Sử dụng $pull để xóa bình luận theo ID từ mảng binhluan
      binhLuan.binhluan.pull({ _id: binhLuanId });
  
      // Lưu lại phim đã được cập nhật
      await binhLuan.save();
  
      return { success: true, message: "Xóa bình luận thành công" };
    } catch (error) {
      console.error("Lỗi khi xóa bình luận:", error);
      return { success: false, message: "Thất bại khi xóa bình luận" };
    }
  }
  async function getBinhLuanPhim(_id ) {
    try {
      // Tìm bộ phim theo ID
      const binhLuan = await BinhLuan.find({phim: _id});
  
      if (!binhLuan) {
        return { success: false, message: "Không tìm thấy id" };
      }else{
        return { success: false, message: binhLuan };
      }
    } catch (error) {
      console.error("Lỗi khi tìm bình luận:", error);
      return { success: false, message: "Thất bại khi tìm bình luận" };
    }
  }
  


module.exports = { createBinhLuanPhim, getAll,addCommentToBinhLuan,removeBinhLuanFromPhim,getBinhLuanPhim}