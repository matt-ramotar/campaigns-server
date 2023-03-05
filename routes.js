const NoteController = require('./v1/notes/NoteController');

const express = require('express');
const router = express.Router();

router.get('/notes', new NoteController().getNotes);

module.exports = router;
