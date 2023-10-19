const DienVien = require('../model/dienVienModel');

async function getAll (){
   try {
    let dienVien = await DienVien.find({});
    return dienVien;
   } catch (error) {
    console.log(error);
   }
}
async function insert (db){
    
  try {
      const item = new DienVien(db);
      await item.save();
     
  } catch (error) {
      console.log(error);
  }
}
async function update (_id, newData){
  try {
   await DienVien.updateOne({ _id}, newData);
  } catch (error) {
   console.log(error);
  }
}
async function del (_id){
 
  try {
      await DienVien.deleteOne({ _id: _id });
      console.log("xóa");
     } catch (error) {
      console.log(error);
     }
}
async function getById(_id) {
  try {
    let dienVien = await DienVien.findById(_id);
    return dienVien;
  } catch (error) {
    console.log(error);
  }
}

module.exports={getAll,insert,update, del, getById}