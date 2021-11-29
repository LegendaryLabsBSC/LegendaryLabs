import React from 'react'
import { legendaryLabs } from '../../../config/labInterface'


export default async function handleCall(contractIndex, callType, name, values) {

  const subContract = Object.keys(legendaryLabs)[contractIndex]
  const params = Object.values(values)

  if (typeof window.ethereum !== 'undefined') {
    console.log(subContract)
    console.log(params)
    const call = await legendaryLabs[subContract][callType][name](...params)
    console.log(call)
  }
}
