import { contractLab } from '../config/contractInterface'

export default async function smartContractCall(
  contractIndex, callType, name, values
) {

  const subContract = Object.keys(contractLab)[contractIndex]
  const args = Object.values(values)

  if (typeof window.ethereum !== 'undefined') {

    return await contractLab[subContract][callType][name](...args)
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }
}
