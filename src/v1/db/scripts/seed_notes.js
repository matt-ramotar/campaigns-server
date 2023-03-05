const { Note } = require('../../model/Note');
const { Color } = require('../../types');

const main = async () => {
  const skiedKillingtonNote = await Note.create({
    content: 'Skied Killington',
    backgroundColor: Color.Amber,
    textColor: Color.Amber,
  });

  const skiedVailNote = await Note.create({
    content: 'Skied Vail',
    backgroundColor: Color.Blue,
    textColor: Color.Blue,
  });

  const skiedBeaverCreekNote = await Note.create({
    content: 'Skied Beaver Creek',
    backgroundColor: Color.Cyan,
    textColor: Color.Cyan,
  });

  const skiedSteamboatnNote = await Note.create({
    content: 'Skied Steamboat',
    backgroundColor: Color.Emerald,
    textColor: Color.Emerald,
  });

  const skiedJacksonHoleNote = await Note.create({
    content: 'Skied Jackson Hole',
    backgroundColor: Color.Fuchsia,
    textColor: Color.Fuchsia,
  });

  const skiedSundayRiverNote = await Note.create({
    content: 'Skied Sunday River',
    backgroundColor: Color.Gray,
    textColor: Color.Gray,
  });

  const skiedWinterParkNote = await Note.create({
    content: 'Skied Winter Park',
    backgroundColor: Color.Green,
    textColor: Color.Green,
  });

  const skiedPalisadesTahoeNote = await Note.create({
    content: 'Skied Palisades Tahoe',
    backgroundColor: Color.Indigo,
    textColor: Color.Indigo,
  });

  const skiedMammothNote = await Note.create({
    content: 'Skied Mammoth',
    backgroundColor: Color.Lime,
    textColor: Color.Lime,
  });

  const skiedSunValleyNote = await Note.create({
    content: 'Skied Sun Valley',
    backgroundColor: Color.Orange,
    textColor: Color.Orange,
  });
  const skiedCrystalMountainNote = await Note.create({
    content: 'Skied Crystal Mountain',
    backgroundColor: Color.Pink,
    textColor: Color.Pink,
  });
  const skiedSnoqualmieNote = await Note.create({
    content: 'Skied Snoqualmie',
    backgroundColor: Color.Purple,
    textColor: Color.Purple,
  });
  const skiedBachelorNote = await Note.create({
    content: 'Skied Bachelor',
    backgroundColor: Color.Red,
    textColor: Color.Red,
  });
  const skiedSchweitzerNote = await Note.create({
    content: 'Skied Schweitzer',
    backgroundColor: Color.Rose,
    textColor: Color.Rose,
  });
  const skiedValleNevadoNote = await Note.create({
    content: 'Skied Valle Nevado',
    backgroundColor: Color.Sky,
    textColor: Color.Sky,
  });
  const skiedSkiBig3Note = await Note.create({
    content: 'Skied Ski Big 3',
    backgroundColor: Color.Teal,
    textColor: Color.Teal,
  });

  const workingOnStore = await Note.create({
    content: 'Working on Store',
    backgroundColor: Color.Violet,
    textColor: Color.Violet,
  });

  const workingOnComponentBox = await Note.create({
    content: 'Working on Component Box',
    backgroundColor: Color.Yellow,
    textColor: Color.Yellow,
  });
};

module.exports = main;
