import React, { useState } from 'react';
import {Checkbox, Collapse} from 'antd';

const { Panel } = Collapse; 

const Continents = [
  {"_id":1, "name": "Africa"}, 
  {"_id":2, "name": "Europe"}, 
  {"_id":3, "name": "Asia"}, 
  {"_id":4, "name": "North America"}, 
  {"_id":5, "name": "South America"}, 
  {"_id":6, "name": "Australia"}, 
  {"_id":7, "name": "Antarctica"}
]


function CheckBox(props) {

  const [Checked, setChecked] = useState([])

    const handleToggle = (value) => { 
        const currentIndex = Checked.indexOf(value); 
        const newChecked = [...Checked]; 

        if(currentIndex === -1){ //if the value is unchecked
          newChecked.push(value)
        } else { 
          newChecked.splice(currentIndex, 1) //when the value is checked 
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)

      //update this checked information into Parent Component 

  }

const renderCheckboxLists = () => Continents.map((value, index) => (
   <React.Fragment key={index}>
              <Checkbox
                onChange= {() => handleToggle(value.id)}
                type="checkbox"
                checked
              />
              <span>{value.name}</span>
    </React.Fragment>
))

  return (
    <div>
      <Collapse defaultActiveKey={['0']} >
        <Panel header key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  )
}

export default CheckBox