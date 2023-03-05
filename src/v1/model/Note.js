const { Schema, SchemaTypes, model } = require('mongoose');
const { Color } = require('../types');

const noteSchema = new Schema(
  {
    content: { required: true, type: SchemaTypes.String },
    backgroundColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
    textColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
    borderColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
  },
  { timestamps: true },
);

const Note = model('Note', noteSchema);

module.exports = {
  Note,
};
