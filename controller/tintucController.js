const Tintuc = require('../model/tintucModel');


async function getAll (){
   try {
    let tintuc = await Tintuc.find({});
    return tintuc;
   } catch (error) {
    console.log(error);
   }
}
async function insert (title, chitiet, image,phim){
  try {
      const item = new Tintuc({
          title,
          chitiet,
          image,
          phim
      });
      await item.save();
  } catch (error) {
      console.log(error);
  }
}

async function update (_id, title, chitiet, image){
  try {
   await Tintuc.updateOne({ _id},{ title, chitiet, image});
  } catch (error) {
   console.log(error);
  }
}
async function del (_id){
 
  try {
      await Tintuc.deleteOne({ _id: _id });
      console.log("xóa");
     } catch (error) {
      console.log(error);
     }
}
async function getById(_id) {
  try {
    let tintuc = await Tintuc.findById(_id);
    return tintuc;
  } catch (error) {
    console.log(error);
  }
}

module.exports={getAll,insert,update, del, getById}