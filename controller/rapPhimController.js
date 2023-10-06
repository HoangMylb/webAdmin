const RapPhim = require('../model/rapPhimModel');

async function getAll (){
   try {
    let rapPhim = await RapPhim.find({});
    return rapPhim;
   } catch (error) {
    console.log(error);
   }
}
async function insert (db){
    
  try {
      const item = new RapPhim(db);
      await item.save();
     
  } catch (error) {
      console.log(error);
  }
}
async function update (_id, newData){
  try {
   await RapPhim.updateOne({ _id}, newData);
  } catch (error) {
   console.log(error);
  }
}
async function del (_id){
 
  try {
      await RapPhim.deleteOne({ _id: _id });
      console.log("xóa");
     } catch (error) {
      console.log(error);
     }
}
async function getById(_id) {
  try {
    let rapphim = await RapPhim.findById(_id);
    return rapphim;
  } catch (error) {
    console.log(error);
  }
}

module.exports={getAll,insert,update, del, getById}