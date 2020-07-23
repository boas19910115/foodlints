import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Dropdown, InputGroup, FormControl } from 'react-bootstrap'
import classes from './SearchInputField.module.scss'
import classNames from 'classnames'
import { useRestaurant } from 'hooks/useRestaurant'
import GeneralButton from 'components/GeneralButton/GeneralButton'
import { useHistory } from 'react-router-dom'

function SearchInputField(props: React.Props<any>) {
  const {
    allRestaurantNames: restaurantNames,
    setRestaurantNameList,
  } = useRestaurant()
  const [currentSearchTxt, setCurrentSearchTxt] = useState('')
  const [isInputting, setIsInputting] = useState(false)
  const history = useHistory()

  useEffect(() => {
    setRestaurantNameList()
  }, [setRestaurantNameList])

  const onChange = useCallback((e) => {
    setIsInputting(true)
    setCurrentSearchTxt(e.target.value)
  }, [])

  const onSearchButtonClick = useCallback(
    (e) => {
      e.stopPropagation()
      history.push(`/restaurant/${currentSearchTxt}`)
    },
    [currentSearchTxt, history]
  )

  const SearchList = useMemo(() => {
    const results = restaurantNames
      .filter((name: string) => {
        if (
          currentSearchTxt.length === 0 ||
          currentSearchTxt.trim().length === 0
        ) {
          return true
        }
        if (name.toUpperCase().includes(currentSearchTxt.toUpperCase())) {
          return true
        }
        return false
      })
      .filter((_, index) => index < 30)

    return results.length ? (
      results.map((name: string, index) => (
        <Dropdown.Item
          className={classes.dropdownItem}
          onClick={(e) => {
            e.stopPropagation()
            setCurrentSearchTxt(name)
          }}
          key={`${name}-${index}`}
          dangerouslySetInnerHTML={{
            __html: name.replace(
              new RegExp(`${currentSearchTxt}`, 'gi'),
              (substr) => `<span style="color:red;">${substr}</span>`
            ),
          }}
        ></Dropdown.Item>
      ))
    ) : (
      <Dropdown.Item disabled>Not Found</Dropdown.Item>
    )
  }, [currentSearchTxt, restaurantNames])

  return (
    <Dropdown className={classes.container}>
      <Dropdown.Toggle
        className={classes.clickPart}
        variant="success"
        id="dropdown-basic"
      >
        <InputGroup className={classNames('mb-3', classes.inputPart)}>
          <FormControl
            placeholder="Restaurant's name"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={onChange}
            value={currentSearchTxt}
          />
          <InputGroup.Append>
            <GeneralButton onClick={onSearchButtonClick}>Search</GeneralButton>
          </InputGroup.Append>
        </InputGroup>
      </Dropdown.Toggle>
      <Dropdown.Menu show={isInputting}>{SearchList}</Dropdown.Menu>
    </Dropdown>
  )
}

export default SearchInputField
