import React, {useState} from 'react'
import { Typography, Button, Form, Input} from 'antd'; 
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios'

const { Title } = Typography; 
const { TextArea } = Input; 

const Continents = [ 
  {key:1, value: "Africa"}, 
  {key:2, value: "Europe"}, 
  {key:3, value: "Asia"}, 
  {key:4, value: "North America"}, 
  {key:5, value: "South America"}, 
  {key:6, value: "Australia"}, 
  {key:7, value: "Antarctica"}
]

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("")
  const [DescriptionValue, setDescriptionValue] = useState("")
  const [PriceValue, setPriceValue ] = useState(0)
  const [ContinentValue, setContinentValue] = useState(1)

//Have to manage our image information in the parent component. Than when you click submit. All the information will go to the backend. 
  const[Images, setImages] = useState([])

  const onTitleChange = (e) => { 
    setTitleValue(e.currentTarget.value)
  }

  const onDescriptionChange = (e) => { 
    setDescriptionValue(e.currentTarget.value)
  }

  const onPriceChange = (e) => { 
    setPriceValue(e.currentTarget.value)
  }

  const onContinentsSelectChange = (e) => { 
    setContinentValue(e.currentTarget.value)
  }

  const updateImages = (newImages) => { 
    
    console.log(newImages)
    setImages(newImages)
  }

  const onSubmit = (e) => { 
    e.preventDefault(); 

    if(!TitleValue || !DescriptionValue || !PriceValue || !ContinentValue || !Images ) { 
      return alert('Fill all the fields first!')
    }

    const variables = { 
      writer: props.user.userData._id, // Can come from the redux information, added props into the uploadpage function
      title: TitleValue, //values are pulled from this page 
      description: DescriptionValue, 
      price: PriceValue, 
      images: Images, 
      continents: ContinentValue
    }

    Axios.post('/api/product/uploadProduct', variables)
      .then(response => { 
        if (response.data.success) { 
            alert('Product Successfully Uploaded')
            props.history.push('/') //After the alert we will move the post to a different page
        } else { 
          alert('Failed to upload Product')
        }
      })


  }


  return (
    <div style = {{ maxWidth: '700px', margin: '2rem auto' }} >
      <div style = {{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>UploadProductPage</Title>
    </div>
    
    <Form onSubmit={onSubmit} > 

      { /* DropZone */ }
      <FileUpload refreshFunction={updateImages}/>

      <br /> <br />

      <label>Title</label>
      <Input 
        onChange = {onTitleChange}
        value = {TitleValue}
      />

      <br /> <br />

      <label>Description</label>
      <TextArea
        onChange={onDescriptionChange}
        value={DescriptionValue}
      />

      <br /> <br />

      <label>Price($)</label>
      <Input 
        onChange ={onPriceChange}
        value={PriceValue}
        type="number"
      />

      <br /><br />

      <select onChange={onContinentsSelectChange}>
        {Continents.map(item=> (
          <option key ={item.key} value={item.key}>{item.value} </option>
        ))}
      </select>

      <br /> <br />

      <Button
        onClick={onSubmit}
      >
        Submit
      </Button>


    </Form>


    </div>
  )
}

export default UploadProductPage
