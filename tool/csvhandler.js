const fs = require('fs');
const luxon = require('luxon');

const day = luxon.DateTime.fromFormat('1PM', 'ha').hour;

console.log(day);

const weekdayMap = {
  MON: 1,
  TUE: 2,
  TUES: 2,
  WED: 3,
  WEDS: 3,
  THU: 4,
  THURS: 4,
  FRI: 5,
  SAT: 6,
  SUN: 7,
};

function handleName(name) {
  return name;
}

const regToMatchTime = /((\d+(:\d+){0,1} (am|pm|AM|PM)) *- *(\d+(:\d+){0,1} (am|pm|AM|PM)))/g;
const regToMatchWeekdays = /(([A-Z]{3,5}) *- *([A-Z]{3,5}))|([A-Z]{3,5})/g;

function handleDateTime(dateTime = '') {
  const originString = dateTime;
  const upperCaseTemp = dateTime.toUpperCase();

  const weekdayMatches = upperCaseTemp
    .match(regToMatchWeekdays)
    .map((mh) => mh.replace(/ /g, ''));

  const timeMatches = upperCaseTemp
    .match(regToMatchTime)
    .map((mh) => mh.replace(/ /g, ''));

  const weekdayList = weekdayMatches
    .map((mh) => {
      if (mh.indexOf('-') > -1) {
        const weekdaySplit = mh.split('-');
        const startWd = weekdaySplit[0];
        const endWd = weekdaySplit[1];
        const rangeTemp = weekdayMap[endWd] - weekdayMap[startWd];
        const range = rangeTemp > 0 ? rangeTemp + 1 : rangeTemp + 7 + 1;
        const rangeArray = new Array(range)
          .fill(null)
          .map((nil, idx) => (weekdayMap[startWd] + idx) % 7);

        return rangeArray;
      }
      return weekdayMap[mh];
    })
    .flat();

  const timePeriodSplit = timeMatches[0].split('-');

  const startDateTime = generateLuxonDateTime(timePeriodSplit[0]);
  const endDateTime = generateLuxonDateTime(timePeriodSplit[1]);

  const duration = (() => {
    const temp = endDateTime.toMillis() - startDateTime.toMillis();
    return (temp > 0 ? temp : temp + 3600 * 24 * 1000) / (1000 * 60);
  })();

  try {
    return {
      weekdayMatches,
      weekdayList,
      timeMatches,
      duration,
      startTime: startDateTime.toFormat('HH:mm'),
    };
  } catch (error) {
    console.log(error);

    console.log(upperCaseTemp, matches);
  }

  function generateLuxonDateTime(timeString) {
    let op;
    op = luxon.DateTime.fromFormat(timeString, 'ha');
    if (op.hour === NaN) {
      op = luxon.DateTime.fromFormat(timeString, 'h:ma');
    }

    return op;
  }
}

fs.readFile('../resturants.csv', { encoding: 'utf-8' }, (exp, res) => {
  const DATA = [];
  res.split('\n').forEach((row) => {
    const rowObj = {
      originString: row,
    };
    DATA.push(rowObj);

    row.match(/"[^"]+"/g).forEach((col, idx) => {
      if (idx === 0) {
        rowObj.name = handleName(col);
      }
      if (idx === 1) {
        const openTimeList = col
          .replace(/"/g, '')
          .split(/\//)
          .map((timeStr) => timeStr.trim());
        rowObj.openTimeList = openTimeList
          .map((item) => {
            return handleDateTime(item);
          })
          .flat();
      }
    });
  });
  const sampleNumber = 473;
  console.log(DATA[sampleNumber]);
  console.log(DATA[sampleNumber].openTimeList);
});
