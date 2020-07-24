import React, { Fragment, useState, useCallback } from 'react'
import useFav from 'hooks/useFav'
import GeneralButton from 'components/GeneralButton'
import { Modal, ListGroup } from 'react-bootstrap'
import classes from './InputToAddFav.module.scss'
import useAuthManager from 'hooks/useAuthManager'
import { useHistory, useLocation } from 'react-router-dom'
import InputToAddFavCollection from './InputToAddFavCollection'
import classnames from 'classnames'
import { FavCollection } from 'types/favorite.type'
import { Restaurant } from 'types/restaurant.type'

interface InputToAddFavProps extends React.Props<any> {
  restaurantData: Restaurant | null
}

export default function InputToAddFav(props: InputToAddFavProps) {
  const { restaurantData } = props
  const [show, setShow] = useState(false)
  const hs = useHistory()
  const location = useLocation()
  const { currentUser } = useAuthManager()
  const [choosenCollection, setChoosenCollecion] = useState<
    FavCollection | any
  >({
    name: '[PICK ONE]',
  })

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { addFav, currentFavCollections } = useFav()

  const onLikeButtonClick = useCallback(() => {
    handleShow()
  }, [])

  const onAddButtonClick = useCallback(() => {
    if (restaurantData && choosenCollection.id) {
      addFav(choosenCollection.id, restaurantData.id, restaurantData.name).then(
        handleClose
      )
    }
  }, [addFav, choosenCollection.id, restaurantData])

  return (
    <Fragment>
      <GeneralButton onClick={onLikeButtonClick}>
        Like{' '}
        <span aria-label="" role="img">
          ❤️
        </span>
      </GeneralButton>
      <Modal show={show} onHide={handleClose}>
        {currentUser ? (
          <Fragment>
            <Modal.Header closeButton>
              <Modal.Title>Favorite collections</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ListGroup className={classes.ListGroup}>
                {currentFavCollections.map((fc) => {
                  return (
                    <ListGroup.Item
                      className={classnames(
                        classes.ListGroupItem,
                        choosenCollection && choosenCollection?.name === fc.name
                          ? classes.isSelected
                          : ''
                      )}
                      onClick={() => {
                        setChoosenCollecion(fc)
                      }}
                      key={fc.name}
                    >
                      {fc.name}
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
              <InputToAddFavCollection></InputToAddFavCollection>
            </Modal.Body>
            <Modal.Footer>
              <GeneralButton variant="primary" onClick={onAddButtonClick}>
                {`Add into ${choosenCollection.name}`}
              </GeneralButton>
              <GeneralButton variant="secondary" onClick={handleClose}>
                Close
              </GeneralButton>
            </Modal.Footer>
          </Fragment>
        ) : (
          <Fragment>
            <Modal.Header closeButton>
              <Modal.Title>Login first</Modal.Title>
            </Modal.Header>
            <Modal.Body>Become a member to do it.</Modal.Body>
            <Modal.Footer>
              <GeneralButton
                onClick={() => {
                  hs.push('/login', { from: location })
                }}
              >
                Log in
              </GeneralButton>
            </Modal.Footer>
          </Fragment>
        )}
      </Modal>
    </Fragment>
  )
}
