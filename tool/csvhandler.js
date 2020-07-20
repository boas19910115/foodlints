const fs = require('fs');
const luxon = require('luxon');

const firebaseConfig = {
  type: 'service_account',
  project_id: 'foodlints',
  private_key_id: 'b39716b6cbc4651e07642f27a9bff1b733e75480',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxCAonL8vn1EvF\nvdumaKMNC9nlubzsUU0VRfbq8FTMbat/aimE9EMCADUfT1+T8Q159FA6tx4O9XFn\nuWfpV8nRr/0vnkzWfqUjVUTN54/2ARakUltcQGRsHJlQEw5/ourWuTUqPA+ZSlkf\nw7s1uyG7C0vWitk/iEMPqU4ZDhCMyvsjYvJyWJNJlfXSW4COOE0yN7GgFLXslfaY\nLAGAMciKOl2qstA80SP0qvOAnjUHSVRE/FMBrVKOx/9NuG+UkFxSpK7l5QZdZwXA\nGmqJ9na++O7ogIUb7IjUlc3MkhyEa20Mt+h8HrpK80sNKW8q+2ORq6VuI4avirKC\nxwCFyHo1AgMBAAECggEAA7IOBN7lzrSwZz6XyaZuCZfu0sbuPMWpX7FlSTwT8mzd\n/gvWiuC5ebQiPRbVq9uF7emNzN1P5T02QpV3fULDTbCy5ENVnyBSLLBl6QwgMHZk\nhVt1w5wm1y3qp7taG7Z9g1bRl2HdFn9bkxhC0x6RV/D8AozFTQ2jDr44no5xWysE\nTANoR4D+HqIub6KEZUtAa5AFrbUrlW2yZjRJUWCz2QA8eZtewuSA2Ip/gnSNE+3f\nSgoo+CoVmS+eSH1kq0rKQfBxSfokO+Q+2yw+3N2gx5Rym7SspetbhLv5ODUeZRjI\n21xM8UJD3QMioe6R87CTTRWW7EVN3uhIbm/jMRB4AQKBgQDu+iE/LKPVSrOHgK/n\nncqfl3WRiFIxPgGVYZc7c48/81eFhavYTSsEdlCMiBmThW/yOyMMMsgL2uBe1T+x\nHppWT3Zk5m6cpKuD2QVbnr48TVJU9oQiTUJBNMrgQb8ym6Dxbcb3+c0ScXMYcjg3\nFEuKk+PLFKGG5p1rzkaqTrvSNQKBgQC9pExzrsGFefiDl4XS85T7D7yTYUfd79FG\nFVED7NnxMy46beDV7JMB53uvYWugzyfrD2zWSVePKZCO2F7UMdsZgh86zyaotqmP\nRBw1hfjgIjyjjaqMBOoJu00gn8vcoUq7tu0D/Ww4SbZntFZlfszaeVli9caFqb36\n1RA91e8IAQKBgQCIUKd8SLNfbBACIBa20JwO8q8+h3sS2aK/mf5RDDbPLLhk0n3W\nkRYTooWJ0+x66KeVjcQNJj5T/NL1ZUDCgIla6FLJdWPs+EVZnQZgX6l17kkja8at\nZlJ/rWR4DSjJ7locvRi8xIIEnjAf5q9IQ8xfTMKoSallsNBk+TH33ZdnbQKBgEJI\n+jv5GkVIQ7fjL3BzmWBDuNsexprpZxGDA+VGVUs8Y20i2NKNNTkWKyI6//6eScqc\ngqNH0WYF1jRHpqWuo3GADOBmZZHU/uFHokCHCl11OhLEwpbcZN1v7V543C3K5q9E\nGgYp/ziRc0M+QnCJaJr4jWjMlU5E7VWOQXYLn9gBAoGASoR15raeHLULp4wBDiXl\nTl6oVN6hP96gkFPxhvGilfUy/hk18JavEbhExq5+WSsofvX8e84q6WDik8Tcryw0\nnbAMLJB/36NQJa41VZDyDbySx6LQjHDeeSV+dpc42Ju467MxO1OpYmw2yn3mVbMD\ngk0nO4CLGVTTrPFbAlitPB8=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-1cy9t@foodlints.iam.gserviceaccount.com',
  client_id: '114517222653662388355',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1cy9t%40foodlints.iam.gserviceaccount.com',
};

const admin = require('firebase-admin');

const app = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: 'https://foodlints.firebaseio.com',
});

const Firestore = app.firestore();

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
      //   weekdayMatches,
      weekdayList,
      //   timeMatches,
      duration,
      startTime: startDateTime.toFormat('HH:mm'),
      endTime: endDateTime.toFormat('HH:mm'),
    };
  } catch (error) {
    console.log(error);

    console.log(upperCaseTemp, matches);
  }

  function generateLuxonDateTime(timeString) {
    let op;
    op = luxon.DateTime.fromFormat(timeString, 'ha');
    if (op.invalidReason === 'unparsable') {
      op = luxon.DateTime.fromFormat(timeString, 'h:ma');
    }

    return op;
  }
}

const G = {
  progress: 0,
  total: null,
  current: 0,
};

fs.readFile('./restaurant.csv', { encoding: 'utf-8' }, (exp, res) => {
  const collecRest = Firestore.collection('restaurant');
  const collecOptm = Firestore.collection('opentime');

  const rows = res.split('\n');

  G.total = rows.length;

  const allNames = rows.map((row) => {
    const matches = row.match(/"[^"]+"/g);
    const colName = matches[0];
    return colName;
  });

  collecRest.doc('INFO').set({
    names: allNames,
  });

  const promises = rows.map(async (row) => {
    const rowObj = {
      originString: row,
    };

    const matches = row.match(/"[^"]+"/g);

    const colName = matches[0];
    const colOpenTime = matches[1];

    rowObj.name = handleName(colName);
    const ref = await collecRest.add({ name: rowObj.name });
    rowObj.restaurantRef = ref;

    const openTimeList = colOpenTime
      .replace(/"/g, '')
      .split(/\//)
      .map((timeStr) => timeStr.trim());
    rowObj.openTimeList = openTimeList
      .map((item) => {
        return handleDateTime(item);
      })
      .flat();

    const opentTimeIdList = await Promise.all(
      rowObj.openTimeList.map(async (ot) => {
        const ref = await collecOptm.add({
          restaurantName: colName,
          ...ot,
          restaurantId: rowObj.restaurantRef.id,
        });
        return ref.id;
      })
    );
    await rowObj.restaurantRef.update({
      openTimeList: opentTimeIdList,
    });

    G.current += 1;
    G.progress = Math.floor((G.current / G.total) * 10000) / 100;
    console.log(G.progress);
    return;
  });

  const devidedPromises = promises.reduce((pre, cur, index) => {
    if (index % 20 === 0) {
      const newArr = [cur];
      pre.push(newArr);
      return [...pre];
    }
    pre[pre.length - 1].push(cur);
    return [...pre];
  }, []);

  Promise.all(devidedPromises);
});
