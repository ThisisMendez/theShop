import React, { useState } from 'react'
import { Collapse, Radio }from 'antd';
const { Panel } = Collapse; 

const price = [
  {
    "id": 0, 
    "name": "Any", 
    "array":[]
  }, 
    {
    "id": 1, 
    "name": "$0 to $199", 
    "array":[0, 199]
  }, 
      {
    "id": 2, 
    "name": "$200 to $249", 
    "array":[200, 249]
  }, 
      {
    "id": 3, 
    "name": "$250 to $279", 
    "array":[250, 279]
  }, 
      {
    "id": 4, 
    "name": "$280 to $299", 
    "array":[280, 299]
  }, 
      {
    "id": 5, 
    "name": "More than $300",
    "array":[300, 1500000]
  }
]


function RadioBox(props) {
  
  const [Value, setValue] = useState('0')

  const renderRadioBox = () => ( 
    price.map((value) => ( 
      <Radio key={value._id} value={`${value._id}`}>{value.name}</Radio>
      ))
    )

  const handleChange = (e) => { 
    setValue(e.target.value)
    props.handleFilter(e.target.value)

  }
  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header="Price" key="1">
          <Radio.Group 
            onChange ={handleChange}
            value ={Value}
          >

              {renderRadioBox()}

          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  )
}

export default RadioBox
