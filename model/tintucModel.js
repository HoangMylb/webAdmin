const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tintucSchema = new Schema({
    title: String,
    chitiet: String,
    image: String,
    phim: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Phim'
        }
      ],
});
// Khai báo model cho collection "tintuc"
const Tintuc = mongoose.model('TinTuc', tintucSchema,'TinTuc');
module.exports = Tintuc;