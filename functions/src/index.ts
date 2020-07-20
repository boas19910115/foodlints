import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as admin from 'firebase-admin';

const app = admin.initializeApp(functions.config().firebase);
const firestore = app.firestore();

const corsHandler = cors({ origin: true });

type ErrorCode = 'NOT_FOUND_DATA' | 'SERVER_ERROR';

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
  const data = await doc.data();
  functions.logger.info(data, { structuredData: true });
  response.send({ data });
});
