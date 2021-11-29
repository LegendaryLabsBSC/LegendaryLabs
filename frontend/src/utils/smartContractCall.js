import { contract } from '../config/contractInterface'

export default async function smartContractCall(
  contractIndex, callType, name, values
) {

  const subContract = Object.keys(contract)[contractIndex]
  const args = Object.values(values)

  if (typeof window.ethereum !== 'undefined') {
    await contract[subContract][callType][name](...args)
      .then((data) => {
        console.log(data.toString())
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
