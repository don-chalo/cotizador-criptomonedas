import CriptoSearchForm from "./component/CriptoSearchForm"
import CryptoPriceDisplay from "./component/CryptoPriceDisplay"

function App() {
  return (
    <div className="container">
      <h1 className="app-title">Cotizador de <span>Criptomonedas</span></h1>
      <div className="content">
        <CriptoSearchForm />
        <CryptoPriceDisplay />
      </div>
    </div>
  )
}

export default App
