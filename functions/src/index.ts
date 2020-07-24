import * as functions from 'firebase-functions'
import * as cors from 'cors'
import * as admin from 'firebase-admin'

const app = admin.initializeApp(functions.config().firebase)
const firestore = app.firestore()

const corsHandler = cors({ origin: true })

enum ErrorCodeEnum {
  NOT_FOUND_DATA = 'NOT_FOUND_DATA',
  SERVER_ERROR = 'SERVER_ERROR',
}

type ErrorCode = ErrorCodeEnum.NOT_FOUND_DATA | ErrorCodeEnum.SERVER_ERROR

type ErrorType = Record<ErrorCode, { message: string; status: number }>

const errorMap: ErrorType = {
  NOT_FOUND_DATA: { message: 'data not found', status: 404 },
  SERVER_ERROR: { message: 'unknown server error', status: 500 },
}

const errorHandler = (
  req: functions.Request,
  res: functions.Response,
  code: ErrorCode
) => {
  const { message, status } = errorMap[code]
  res.status(status).send({ message, status })
}

function httpsHandler(
  callback: (req: functions.Request, res: functions.Response) => void
) {
  return functions.https.onRequest(async (request, response) => {
    corsHandler(request, response, () => {
      try {
        callback(request, response)
      } catch (error) {
        errorHandler(request, response, error.message)
      }
    })
  })
}

export const helloWorld = httpsHandler((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send({ data: 'Hello from Firebase!' })
})

export const allRestaurantNames = httpsHandler(async (_, response) => {
  const doc = await firestore.collection('restaurant').doc('INFO').get()
  const data = doc.data()
  functions.logger.info(data, { structuredData: true })
  response.send({ data })
})

export const restaurant = httpsHandler(async (requset, response) => {
  const {
    data: { where = 'name', is = '' },
  } = requset.body
  functions.logger.info(`requset.body, ${JSON.stringify(requset.body)}`, {
    structuredData: true,
  })
  const query = await firestore
    .collection('restaurant')
    .where(where.toString(), '==', is)
    .get()
  try {
    const data = query.docs[0].data()
    response.send({ data: { ...data, id: query.docs[0].id } })
  } catch (error) {
    throw Error(ErrorCodeEnum.NOT_FOUND_DATA)
  }
})

export const restaurantWeekdayTime = httpsHandler(async (request, response) => {
  const {
    data: { weekdayTxt, absoluteMinutes: diffMinutes },
  } = request.body

  const collecOptm = firestore.collection('opentime_weekday')
  const weekdayRestaurants = await (
    await collecOptm.doc(weekdayTxt).get()
  ).data()

  if (weekdayRestaurants) {
    const result = Object.values(weekdayRestaurants)
      .filter((data) => {
        const isCondition = () => {
          if (
            !data.isOverNight &&
            diffMinutes >= data.startTime &&
            diffMinutes <= data.endTime
          ) {
            return true
          }
          if (data.isOverNight && diffMinutes >= data.startTime) {
            return true
          }
          if (data.isOverNight && diffMinutes <= data.endTime) {
            return true
          }
          return false
        }
        return isCondition()
      })
      .sort((a, b) => {
        if (a.name > b.name) {
          return 1
        }
        if (b.name < a.name) return -1
        return 0
      })

    response.send({ data: result })
  } else {
    response.send({ data: null })
  }
})

export const openTimeListByRestaurantId = httpsHandler(
  async (request, response) => {
    const {
      data: { restaurantId },
    } = request.body
    const res = await firestore
      .collection('opentime')
      .where('restaurantId', '==', restaurantId)
      .get()

    const list = res.docs.map((d) => d.data())
    response.send({ data: list })
  }
)

export const addFavCollection = httpsHandler(async (request, response) => {
  const {
    data: { userEmail, favCollectionName },
  } = request.body

  const res = await firestore.collection('favCollection').add({
    name: favCollectionName,
    collaborators: [],
    list: [],
    owner: userEmail,
  })

  response.send({
    data: {
      ...res,
      id: res.id,
    },
  })
})

export const addFav = httpsHandler(async (request, response) => {
  const {
    data: { favCollectionId, restaurantId, restaurantName },
  } = request.body

  const doc = await firestore
    .collection('favCollection')
    .doc(favCollectionId)
    .get()

  const newData = { restaurantId, restaurantName }

  const data = doc.data()
  if (data) {
    if (data.list.length) {
      const updated = await firestore
        .collection('favCollection')
        .doc(favCollectionId)
        .update({
          list: [...data?.list, newData],
        })
      response.send({
        data: updated.writeTime,
      })
    } else {
      const updated = await firestore
        .collection('favCollection')
        .doc(favCollectionId)
        .update({
          list: [newData],
        })
      response.send({
        data: updated.writeTime,
      })
    }
  } else {
    response.send({
      data: null,
    })
  }
})

export const getFav = httpsHandler(async (request, response) => {
  const {
    data: { userEmail },
  } = request.body

  const docs = await (
    await firestore
      .collection('favCollection')
      .where('owner', '==', userEmail)
      .get()
  ).docs

  if (docs && docs.length > 0) {
    response.send({
      data: docs.map((d) => ({ ...d.data(), id: d.id })),
    })
  } else {
    response.send({
      data: null,
    })
  }
})

export const delFavCollection = httpsHandler(async (request, response) => {
  const {
    data: { favCollectionId },
  } = request.body

  const res = await firestore
    .collection('favCollection')
    .doc(favCollectionId)
    .delete()

  response.send({
    data: res.writeTime,
  })
})

export const delFav = httpsHandler(async (request, response) => {
  const {
    data: { favCollectionId, restaurantId },
  } = request.body

  const data = await (
    await firestore.collection('favCollection').doc(favCollectionId).get()
  ).data()
  const updated = await firestore
    .collection('favCollection')
    .doc(favCollectionId)
    .update({
      list: data?.list.filter(
        (d: { restaurantId: string }) => d.restaurantId !== restaurantId
      ),
    })
  response.send({
    data: updated.writeTime,
  })
})

export const addMember = httpsHandler(async (request, response) => {
  const {
    data: { email, name, photoURL, favoriteCollections = [] },
  } = request.body
  const res = await firestore.collection('user').doc(email).set({
    name,
    photoURL,
    favoriteCollections,
  })
  response.send({ data: res })
})
