const Campaigns = require('../type/campaigns');
const Models = require('../models');

const { Schema, SchemaTypes, model } = require('mongoose');
const ObjectId = SchemaTypes.ObjectId;

const campaignSchema = new Schema(
  {
    type: { required: true, type: SchemaTypes.String, enum: Campaigns },
    content: { required: true, type: SchemaTypes.String },
    sequencedCampaignIds: { required: false, type: [ObjectId], ref: Models.refs.CAMPAIGN },
    childrenCampaignIds: { required: false, type: [ObjectId], ref: Models.refs.CAMPAIGN },
  },
  { timestamps: true },
);

const Campaign = model(Models.refs.CAMPAIGN, campaignSchema);

module.exports = {
  Campaign,
};
