import { contract } from '../config/contractInterface'

export default async function smartContractCall(
  contractIndex, callType, name, values
) {

  const subContract = Object.keys(contract)[contractIndex]
  const args = Object.values(values)

  if (typeof window.ethereum !== 'undefined') {

    return await contract[subContract][callType][name](...args)
      .then((data) => {
        console.log(data)
        return data.toString() // ? only return view/pure functions to console?
      })
      .catch((err) => {
        console.log(err)
        return err.toString() //todo: make error return more user-friendly
      })
  }
}
