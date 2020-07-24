import React, { useState } from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'
import GeneralButton from 'components/GeneralButton'
import useFav from 'hooks/useFav'

export default function InputToAddFavCollection() {
  const [favColName, setFavColName] = useState('')
  const { addFavCollection } = useFav()

  return (
    <InputGroup>
      <FormControl
        placeholder="Collection's name"
        aria-label="Collection's name"
        value={favColName}
        onChange={(e) => setFavColName(e.target.value)}
      />
      <InputGroup.Append>
        <GeneralButton onClick={() => addFavCollection(favColName)}>
          Add favorite collection
        </GeneralButton>
        <GeneralButton onClick={() => setFavColName('')}>
          Clear field
        </GeneralButton>
      </InputGroup.Append>
    </InputGroup>
  )
}
