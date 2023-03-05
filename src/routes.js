const NoteController = require('./v1/notes/NoteController');

const express = require('express');
const router = express.Router();

router.get('/v1/notes', new NoteController().getNotes);

module.exports = router;
