import React, { useEffect } from 'react'
import classes from './MemberPage.module.scss'
import { Card } from 'react-bootstrap'
import useAuthManager from 'hooks/useAuthManager'
import GeneralButton from 'components/GeneralButton'
import useFav from 'hooks/useFav'
import InputToAddFavCollection from 'components/Fav/InputToAddFavCollection'

export default function MemberPage() {
  const { currentUser } = useAuthManager()
  const { getFav, currentFavCollections, delFavCollection } = useFav()

  useEffect(() => {
    getFav()
  }, [getFav])

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Card.Img alt="profile" src={currentUser?.photoURL || ''} />
        <Card.Body>
          <Card.Title>{currentUser?.name}</Card.Title>
          <Card.Text>{currentUser?.email}</Card.Text>
        </Card.Body>
      </Card>
      <div>
        <InputToAddFavCollection></InputToAddFavCollection>
        <div className={classes.favCols}>
          {currentFavCollections.map((fc) => (
            <Card key={fc.name} className={classes.card}>
              <Card.Header>{fc.name}</Card.Header>
              <Card.Body>
                {fc.list.map((fv) => (
                  <div key={fv.restaurantName}>
                    <span>{fv.restaurantName}</span>
                  </div>
                ))}
              </Card.Body>
              <Card.Footer>
                <GeneralButton
                  onClick={() => {
                    delFavCollection(fc.id)
                  }}
                >
                  Remove
                </GeneralButton>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
