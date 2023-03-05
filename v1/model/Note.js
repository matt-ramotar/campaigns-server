const Models = require('../models');
const Colors = require('../type/colors');

const { Schema, SchemaTypes, model } = require('mongoose');

const noteSchema = new Schema(
  {
    content: { required: true, type: SchemaTypes.String },
    backgroundColor: { required: false, type: SchemaTypes.String, enum: Colors },
    textColor: { required: false, type: SchemaTypes.String, enum: Colors },
    borderColor: { required: false, type: SchemaTypes.String, enum: Colors },
  },
  { timestamps: true },
);

const Note = model(Models.refs.NOTE, noteSchema);

module.exports = {
  Note,
};
