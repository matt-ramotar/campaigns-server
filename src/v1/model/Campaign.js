const { Color, ComponentBoxType, IconType, MobileActionType } = require('../types');

const { Schema, SchemaTypes, model } = require('mongoose');
const ObjectId = SchemaTypes.ObjectId;

const imageSchema = new Schema(
  {
    lightUrl: { required: true, type: SchemaTypes.String },
    darkUrl: { required: true, type: SchemaTypes.String },
    backgroundColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
  },
  { timestamps: true },
);

const Image = model('Image', imageSchema);

const iconSchema = new Schema(
  {
    type: { required: true, type: SchemaTypes.String, enum: Object.values(IconType) },
    backgroundColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
    textColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
    borderColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
  },
  { timestamps: true },
);

const Icon = model('Icon', iconSchema);

const mobileActionSchema = new Schema(
  {
    type: { required: true, type: SchemaTypes.String, enum: Object.values(MobileActionType) },
  },
  { timestamps: true },
);
const mobileNavigationActionSchema = new Schema({}, { timestamps: true });

const optionalSequencedCampaignSchema = new Schema(
  {
    campaignId: { required: false, type: ObjectId, ref: 'Campaign' },
  },
  { timestamps: true },
);

const MobileAction = model('MobileAction', mobileActionSchema);
const MobileNavigationAction = MobileAction.discriminator('MobileNavigationAction', mobileNavigationActionSchema);
const IapMobileNavigationAction = MobileAction.discriminator('IapMobileNavigationAction', optionalSequencedCampaignSchema);
const FeatureDiscoveryNavigationAction = MobileAction.discriminator('FeatureDiscoveryNavigationAction', optionalSequencedCampaignSchema);

const campaignSchema = new Schema(
  {
    content: { required: true, type: ObjectId, ref: 'CampaignContent' },
  },
  { timestamps: true },
);

const campaignContentSchema = new Schema({}, { timestamps: true });

const mobileBannerSchema = new Schema({}, { timestamps: true });

const standardMobileBannerSchema = new Schema(
  {
    heading: { required: true, type: SchemaTypes.String },
    leadingIcon: { required: false, type: iconSchema },
    trailingIcon: { required: false, type: iconSchema },
    action: { required: true, type: mobileActionSchema },
    backgroundColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
    textColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
    borderColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
  },
  { timestamps: true },
);

const CampaignContent = model('CampaignContent', campaignContentSchema);
const MobileBanner = CampaignContent.discriminator('MobileBanner', mobileBannerSchema);
const StandardMobileBanner = CampaignContent.discriminator('StandardMobileBanner', standardMobileBannerSchema);

const mobileButtonSchema = new Schema({}, { timestamps: true });
const primaryMobileButtonSchema = new Schema(
  {
    label: { required: true, type: SchemaTypes.String },
    action: { required: true, type: mobileActionSchema },
    backgroundColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
    textColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
    borderColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
  },
  { timestamps: true },
);

const multilineMobileButtonSchema = new Schema(
  {
    heading: { required: true, type: SchemaTypes.String },
    subheading: { required: true, type: SchemaTypes.String },
    leadingIcon: { required: false, type: iconSchema },
    trailingIcon: { required: false, type: iconSchema },
    backgroundColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
    textColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
    borderColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
  },
  { timestamps: true },
);

const MobileButton = CampaignContent.discriminator('MobileButton', mobileButtonSchema);
const PrimaryMobileButton = CampaignContent.discriminator('PrimaryMobileButton', primaryMobileButtonSchema);
const MultilineMobileButton = CampaignContent.discriminator('MultilineMobileButton', multilineMobileButtonSchema);

const mobilePopupModalSchema = new Schema({}, { timestamps: true });
const standardMobilePopupModalSchema = new Schema(
  {
    heading: { required: true, type: SchemaTypes.String },
    subheading: { required: true, type: SchemaTypes.String },
    button: { required: true, type: ObjectId, ref: 'PrimaryMobileButton' },
    image: { required: false, type: imageSchema },
    backgroundColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
    textColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
    borderColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
  },
  { timestamps: true },
);

const MobilePopupModal = CampaignContent.discriminator('MobilePopupModal', mobilePopupModalSchema);
const StandardMobilePopupModal = CampaignContent.discriminator('StandardMobilePopupModal', standardMobilePopupModalSchema);

const Campaign = model('Campaign', campaignSchema);

const standardMobileListModuleItemSchema = new Schema(
  {
    title: { required: true, type: SchemaTypes.String },
    subtitle: { required: false, type: SchemaTypes.String },
    action: { required: true, type: mobileActionSchema },
    leadingIcon: { required: false, type: iconSchema },
    trailingIcon: { required: false, type: iconSchema },
    backgroundColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
    textColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
    borderColor: { required: false, type: SchemaTypes.String, enum: Object.values(Color) },
  },
  { timestamps: true },
);

const mobileModuleSchema = new Schema({}, { timestamps: true });
const mobileListModuleSchema = new Schema({}, { timestamps: true });
const standardMobileListModuleSchema = new Schema(
  {
    heading: { required: true, type: SchemaTypes.String },
    subheading: { required: true, type: SchemaTypes.String },
    image: { required: false, type: imageSchema },
    items: { required: true, type: [ObjectId], ref: 'StandardMobileListModuleItem' },
    button: { required: false, type: ObjectId, ref: 'PrimaryMobileButton' },
  },
  { timestamps: true },
);

const mobileScreenSchema = new Schema({}, { timestamps: true });
const mobileAccountScreenSchema = new Schema({}, { timestamps: true });
const standardMobileAccountScreenSchema = new Schema(
  {
    title: { required: true, type: SchemaTypes.String },
    button: { required: true, type: ObjectId, ref: 'PrimaryMobileButton' },
    multilineButton: { required: true, type: ObjectId, ref: 'MultilineMobileButton' },
    modules: { required: true, type: [ObjectId], ref: 'MobileModule' },
  },
  { timestamps: true },
);

const mobileMultiPlanUpgradeScreenCardSchema = new Schema(
  {
    heading: { required: true, type: SchemaTypes.String },
    subheading: { required: true, type: SchemaTypes.String },
    primaryLabel: { required: false, type: SchemaTypes.String },
    trailingLabel: { required: false, type: SchemaTypes.String },
    items: { required: true, type: [SchemaTypes.String] },
    button_label: { required: true, type: SchemaTypes.String },
    image: { required: true, type: imageSchema },
  },
  { timestamps: true },
);

const mobileMultiPlanUpgradeScreenSchema = new Schema(
  {
    heading: { required: true, type: SchemaTypes.String },
    subheading: { required: true, type: SchemaTypes.String },
    items: { required: true, type: [ObjectId], ref: 'MobileMultiPlanUpgradeScreenCard' },
  },
  { timestamps: true },
);

const MobileMultiPlanUpgradeScreenCard = CampaignContent.discriminator('MobileMultiPlanUpgradeScreenCard', mobileMultiPlanUpgradeScreenCardSchema);

const MobileModule = CampaignContent.discriminator('MobileModule', mobileModuleSchema);
const MobileListModule = CampaignContent.discriminator('MobileListModule', mobileListModuleSchema);
const StandardMobileListModule = CampaignContent.discriminator('StandardMobileListModule', standardMobileListModuleSchema);
const StandardMobileListModuleItem = CampaignContent.discriminator('StandardMobileListModuleItem', standardMobileListModuleItemSchema);
const MobileScreen = CampaignContent.discriminator('MobileScreen', mobileScreenSchema);
const MobileAccountScreen = CampaignContent.discriminator('MobileAccountScreen', mobileAccountScreenSchema);
const StandardMobileAccountScreen = CampaignContent.discriminator('StandardMobileAccountScreen', standardMobileAccountScreenSchema);

const MobileMultiPlanUpgradeScreen = CampaignContent.discriminator('MobileMultiPlanUpgradeScreen', mobileMultiPlanUpgradeScreenSchema);

const componentBoxSchema = new Schema({
  content: { required: true, type: Object },
  type: { required: true, type: SchemaTypes.String, enum: Object.values(ComponentBoxType) },
});

const ComponentBox = CampaignContent.discriminator('ComponentBox', componentBoxSchema);

module.exports = {
  Campaign,

  CampaignContent,

  MobileBanner,
  StandardMobileBanner,

  MobileButton,
  PrimaryMobileButton,
  MultilineMobileButton,

  MobilePopupModal,
  StandardMobilePopupModal,

  MobileScreen,
  MobileAccountScreen,
  StandardMobileAccountScreen,
  MobileMultiPlanUpgradeScreen,
  MobileMultiPlanUpgradeScreenCard,

  MobileModule,
  MobileListModule,
  StandardMobileListModule,

  StandardMobileListModuleItem,

  MobileAction,
  MobileNavigationAction,
  IapMobileNavigationAction,
  FeatureDiscoveryNavigationAction,

  Image,
  Icon,
};
