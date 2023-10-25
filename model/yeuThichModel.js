const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const yeuThichSchema = new Schema({
    persons: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Persons'
        }
      ],
    phim: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Phim'
      }
    ],
});
// Khai báo model cho collection "YeuThich"
const YeuThich = mongoose.model('YeuThich', yeuThichSchema,'YeuThich');
module.exports = YeuThich;
