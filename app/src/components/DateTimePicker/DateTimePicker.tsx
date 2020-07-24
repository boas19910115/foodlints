import React, { useCallback, useState } from 'react'
import * as lux from 'luxon'
import { useHistory } from 'react-router-dom'
import GeneralButton from 'components/GeneralButton'

interface DateTimePickerProps extends React.Props<any> {
  other?: string
}

export default function DateTimePicker(props: DateTimePickerProps) {
  const history = useHistory()
  const [currentDateTime, setCurrentDateTime] = useState<string>()
  const onPickerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setCurrentDateTime(value)
    },
    []
  )

  const onPickerSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (currentDateTime) {
        const luxDateTime = lux.DateTime.fromISO(currentDateTime)
        const millis = luxDateTime.toMillis()
        history.replace(`/?millis=${millis}`, {
          millis,
        })
      }
    },
    [currentDateTime, history]
  )

  return (
    <form onSubmit={onPickerSubmit}>
      <label>
        Search by date time:{' '}
        <input
          value={currentDateTime}
          onChange={onPickerChange}
          type="datetime-local"
          name="dateTimeToSearch"
        ></input>
      </label>
      <GeneralButton type="submit">Submit</GeneralButton>
    </form>
  )
}
