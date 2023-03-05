const { Color, ComponentBoxType, IconType, MobileActionType } = require('../../types');

const {
  MobileAction,
  StandardMobileListModuleItem,
  Icon,
  StandardMobileListModule,
  Image,
  PrimaryMobileButton,
  IapMobileNavigationAction,
  MobileMultiPlanUpgradeScreen,
  StandardMobileAccountScreen,
  Campaign,
} = require('../../model/Campaign');

const mongoose = require('mongoose');
require('dotenv').config();

const mongoDbConnectionString = process.env.MONGODB;

const main = async () => {
  await mongoose.connect(mongoDbConnectionString);

  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  for (const collection of collections) {
    await db.dropCollection(collection.name);
  }

  const mobileMultiPlanUpgradeScreen = await MobileMultiPlanUpgradeScreen.create({
    title: 'Do more with Notes',
  });

  const fileRequestsStandardMobileListModuleItem = await StandardMobileListModuleItem.create({
    title: 'File requests',
    subtitle: '${FILE_REQUESTS_COUNT} file requests',
    action: await MobileAction.create({ type: MobileActionType.FileRequestsNavigation }),
    leadingIcon: await Icon.create({ type: IconType.FileRequestLine }),
    trailingIcon: await Icon.create({ type: IconType.RightChevronLine }),
  });

  const backupStandardMobileListModuleItem = await StandardMobileListModuleItem.create({
    title: 'Backup',
    subtitle: 'All your backups in one easy place',
    action: await MobileAction.create({ type: MobileActionType.BackupNavigation }),
    leadingIcon: await Icon.create({ type: IconType.BackupLine }),
    trailingIcon: await Icon.create({ type: IconType.RightChevronLine }),
  });

  const deletedFilesStandardMobileListModuleItem = await StandardMobileListModuleItem.create({
    title: 'Recover deleted files',
    subtitle: '${DELETED_FILES_COUNT} deleted files',
    action: await MobileAction.create({ type: MobileActionType.RecoverDeletedFilesNavigation }),
    leadingIcon: await Icon.create({ type: IconType.RevertFileLine }),
    trailingIcon: await Icon.create({ type: IconType.RightChevronLine }),
  });

  const offlineFilesStandardMobileListModuleItem = await StandardMobileListModuleItem.create({
    title: 'Manage offline files',
    subtitle: '${OFFLINE_FILE_COUNT} offline files',
    action: await MobileAction.create({ type: MobileActionType.ManageOfflineFilesNavigation }),
    leadingIcon: await Icon.create({ type: IconType.CloudOfflineLine }),
    trailingIcon: await Icon.create({ type: IconType.RightChevronLine }),
  });

  const upgradePrimaryMobileButton = await PrimaryMobileButton.create({
    label: '${PRICE} / month',
    action: await IapMobileNavigationAction.create({
      type: MobileActionType.IapNavigation,
      campaignId: mobileMultiPlanUpgradeScreen._id,
    }),
  });

  const makeTheMostOfYourPlanStandardMobileListModule = await StandardMobileListModule.create({
    heading: 'Make the most of your plan',
    subheading: 'Your plan gives you access to these features',
    image: await Image.create({
      lightUrl: 'https://api.componentbox.io/assets/light/security_archive.svg',
      darkUrl: 'https://api.componentbox.io/assets/dark/security_archive.svg',
    }),
    items: [
      fileRequestsStandardMobileListModuleItem._id,
      backupStandardMobileListModuleItem._id,
      deletedFilesStandardMobileListModuleItem._id,
      offlineFilesStandardMobileListModuleItem._id,
    ],
    button: upgradePrimaryMobileButton._id,
  });

  const standardMobileAccountScreen = await StandardMobileAccountScreen.create({
    title: 'Personal',
    button: upgradePrimaryMobileButton._id,
    multilineButton: upgradePrimaryMobileButton._id,
    modules: [makeTheMostOfYourPlanStandardMobileListModule._id],
  });

  const accountTabCampaign = await Campaign.create({
    content: standardMobileAccountScreen._id,
  });

  mongoose.disconnect();
};

main();
