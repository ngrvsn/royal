import { GetMarketBlock } from '@components/get-market-block/GetMarketBlock'
import { CreateMarketPlatform } from '@components/create-market-platform/CreateMarketPlatform'
import { CreateMarketFunctions } from '@components/create-market-functions/CreateMarketFunctions'
import { CreateMarketStartSell } from '@components/create-market-start-sell/CreateMarketStartSell'
import { GetDemoBlock } from '@components/get-demo-block/GetDemoBlock'
import { RealiseIdea } from '@components/realise-idea/RealiseIdea'
import { CalculateCostBlock } from '@components/caltulate-cost-block/CalculateCostBlock'
import { MarketplaceRemoteControle } from '@components/marketplace-remote-controle/MarketplaceRemoteControle'
import { ConnectFormBlock } from '@components/connect-form-block/ConnectFormBlock'
import { PlatformDropdownBlock } from '@components/platform-dropdown-block/PlatformDropdownBlock'
import { Footer } from '@components/footer/Footer'
import { CasesBlock } from '@components/cases-block/CasesBlock'

import './App.css'

function App() {
  return (
    <main>
      <GetMarketBlock />
      <CreateMarketPlatform />
      <CreateMarketFunctions />
      <CreateMarketStartSell />
      <GetDemoBlock />
      <PlatformDropdownBlock />
      <RealiseIdea />
      <CalculateCostBlock />
      <CasesBlock />
      <MarketplaceRemoteControle />
      <ConnectFormBlock />
      <Footer />
    </main>
  )
}

export default App
