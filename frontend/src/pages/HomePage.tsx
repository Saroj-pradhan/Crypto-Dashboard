import Nav from '../components/Nav'
import CryptoData from "../components/CryptoData"
import Cryptos from '../components/Cryptos'
function HomePage() {
  return (
    <div>
        <Nav/>
        <div className='sm:grid grid-cols-[30%_70%] '>
            <Cryptos/>
            <CryptoData/>
         
        </div>
        
    </div>
  )
}

export default HomePage