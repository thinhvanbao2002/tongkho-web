/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, InputProps } from 'antd'
import React, { useCallback, useState } from 'react'

interface ISearch extends InputProps {
  onInputSearch?: any
  enterButton?: boolean
  defaultValue?: string
}

const RJSearch = ({ onInputSearch, placeholder, defaultValue, enterButton, ...props }: ISearch) => {
  const [value, setValue] = useState<string>()

  const handleChangeText = useCallback(
    (value: string) => {
      setValue(value)
      onInputSearch(value)
    },
    [value]
  )

  return (
    <div>
      <Input
        {...props}
        allowClear
        style={{ borderRadius: 4 }}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          handleChangeText(e.target?.value)
        }}
      />
    </div>
  )
}

export default RJSearch
