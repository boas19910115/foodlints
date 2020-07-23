import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as admin from 'firebase-admin';

const app = admin.initializeApp(functions.config().firebase);
const firestore = app.firestore();

const corsHandler = cors({ origin: true });

enum ErrorCodeEnum {
  NOT_FOUND_DATA = 'NOT_FOUND_DATA',
  SERVER_ERROR = 'SERVER_ERROR',
}

type ErrorCode = ErrorCodeEnum.NOT_FOUND_DATA | ErrorCodeEnum.SERVER_ERROR;

type ErrorType = Record<ErrorCode, { message: string; status: number }>;

const errorMap: ErrorType = {
  NOT_FOUND_DATA: { message: 'data not found', status: 404 },
  SERVER_ERROR: { message: 'unknown server error', status: 500 },
};

const errorHandler = (
  req: functions.Request,
  res: functions.Response,
  code: ErrorCode
) => {
  const { message, status } = errorMap[code];
  res.status(status).send({ message, status });
};

function httpsHandler(
  callback: (req: functions.Request, res: functions.Response) => void
) {
  return functions.https.onRequest(async (request, response) => {
    corsHandler(request, response, () => {
      try {
        callback(request, response);
      } catch (error) {
        errorHandler(request, response, error.message);
      }
    });
  });
}

export const helloWorld = httpsHandler((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send({ data: 'Hello from Firebase!' });
});

export const allRestaurantNames = httpsHandler(async (_, response) => {
  const doc = await firestore.collection('restaurant').doc('INFO').get();
  const data = doc.data();
  functions.logger.info(data, { structuredData: true });
  response.send({ data });
});

export const restaurant = httpsHandler(async (requset, response) => {
  const {
    data: { where = 'name', is = '' },
  } = requset.body;
  functions.logger.info(`requset.body, ${JSON.stringify(requset.body)}`, {
    structuredData: true,
  });
  const query = await firestore
    .collection('restaurant')
    .where(where.toString(), '==', is)
    .get();
  try {
    const data = query.docs[0].data();
    response.send({ data: { ...data, id: query.docs[0].id } });
  } catch (error) {
    throw Error(ErrorCodeEnum.NOT_FOUND_DATA);
  }
});

// export const restaurantByDateTime = httpsHandler(
//   async (request, response) => {}
// );

export const openTimeListByRestaurantId = httpsHandler(
  async (request, response) => {
    const {
      data: { restaurantId },
    } = request.body;
    const res = await firestore
      .collection('opentime')
      .where('restaurantId', '==', restaurantId)
      .get();

    const list = res.docs.map((d) => d.data());
    response.send({ data: list });
  }
);

// export const addCollection = httpsHandler(async (request, response) => {});

// export const addFavorite = httpsHandler(async (request, response) => {});

export const addMember = httpsHandler(async (request, response) => {
  const {
    data: { email, name, photoURL, favoriteCollections = [] },
  } = request.body;
  const res = await firestore.collection('user').doc(email).set({
    name,
    photoURL,
    favoriteCollections,
  });
  response.send({ data: res });
});
