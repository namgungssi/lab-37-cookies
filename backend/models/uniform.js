'use strict';



const mongoose = require('mongoose');
const Accessory = require('./accessory');
const uniformSchema = new mongoose.Schema({

  name: {type: String, required: true},
  description: String,
  parts: {type: mongoose.Schema.Types.ObjectId, ref: 'Accessory'},
  createDate: {type: Date, default: Date.now}
});


uniformSchema.pre('save', function(done) {

  Accessory.findById(this.parts)
    .then( acc => {
      if (! acc) {
        let newAcc = new Accessory({uniform: this._id, parts:[]});
        return newAcc.save();
      }
      else { return acc; }
    })
    .then(acc => {
      this.parts = acc._id;
      done();
    })
    .catch(done);
});


uniformSchema.pre('findOne', function(done) {
  this.populate({

    path: 'parts',
  });
  done();
});



const Uniform = module.exports = mongoose.model('Uniform', uniformSchema);
