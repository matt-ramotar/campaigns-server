const { Note } = require('../model/Note');

class NoteController {
  getNotes = async (_, res) => {
    const notes = await Note.find();
    return res.json(notes ?? []);
  };
}

module.exports = NoteController;
