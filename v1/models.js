const Campaign = require('./model/Campaign');
const Note = require('./model/Note');

module.exports = {
  refs: {
    CAMPAIGN: 'Campaign',
    NOTE: 'Note',
  },
  Campaign,
  Note,
};
