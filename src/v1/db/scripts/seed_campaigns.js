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
  MobileMultiPlanUpgradeScreenCard,
} = require('../../model/Campaign');

const main = async () => {
  const devicesCouchImage = await Image.create({
    lightUrl: 'https://api.componentbox.io/assets/light/devices_couch.svg',
    darkUrl: 'https://api.componentbox.io/assets/dark/devices_couch.svg',
  });

  const workDeskPlantImage = await Image.create({
    lightUrl: 'https://api.componentbox.io/assets/light/work_desk_plant.svg',
    darkUrl: 'https://api.componentbox.io/assets/dark/work_desk_plant.svg',
  });

  const plusCard = await MobileMultiPlanUpgradeScreenCard.create({
    heading: 'Plus',
    subheading: '${PLUS_PRICE}/month',
    primaryLabeL: 'Most popular',
    trailingLabel: '2,000 GB',
    items: ['Sync across unlimited devices', 'Auto-upload more photos with ease', 'Revert any change within 30 days'],
    image: devicesCouchImage,
    button_label: 'Try free for 30 days',
  });

  const professionalCard = await MobileMultiPlanUpgradeScreenCard.create({
    heading: 'Professional',
    subheading: '${PRO_PRICE}/month',
    primaryLabeL: 'More space',
    trailingLabel: '3,000 GB',
    items: ['Add custom branding to shared files', 'Password protect your shared links', 'Revert any change within 180 days'],
    image: workDeskPlantImage,
    button_label: 'Try free for 30 days',
  });

  const mobileMultiPlanUpgradeScreen = await MobileMultiPlanUpgradeScreen.create({
    heading: 'Do more with Notes',
    subheading: "We'll send you a reminder before you are billed",
    items: [plusCard._id, professionalCard._id],
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

  const standardMobileAccountScreenCampaign = await Campaign.create({
    content: standardMobileAccountScreen._id,
  });

  const multiPlanUpgradeScreenCampaign = await Campaign.create({
    content: mobileMultiPlanUpgradeScreen._id,
  });
};

module.exports = main;
