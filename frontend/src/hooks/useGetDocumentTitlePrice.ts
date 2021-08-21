import { useEffect } from 'react'
import { usePriceBlzdBusd } from 'state/hooks'

const useGetDocumentTitlePrice = () => {
  const blzdPriceUsd = usePriceBlzdBusd()

  const blzdPriceUsdString = blzdPriceUsd.eq(0)
    ? ''
    : ` - $${blzdPriceUsd.toNumber().toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      })}`

  useEffect(() => {
    document.title = `BLIZZARD.MONEY${blzdPriceUsdString}`
  }, [blzdPriceUsdString])
}
export default useGetDocumentTitlePrice
