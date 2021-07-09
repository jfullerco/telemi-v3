import React, {useEffect} from 'react'
import atClient from '../Services/atClient'

const AirtableTest = () => {
  useEffect(() => {
    airtableGet()
  },[])
  const airtableGet = async () => {
    const response = await atClient.getClient()
    const {data: {records}} = response
    console.log("loading")
    console.log(records[0].fields)
  }
  return (
    <div>
  Testing
  </div>
  )
}
export default AirtableTest