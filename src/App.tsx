/* eslint-disable react/react-in-jsx-scope */
import { Route, Routes } from "react-router-dom"
import GetBondPriceInfoPage from "./pages/GetBondPriceInfoPage"
import GetDomeBankGeneInfoPage from "./pages/GetDomeBankGeneInfoPage"

function App() {
  return (
    <Routes>
      <Route path="/get_bond_price_info" element={<GetBondPriceInfoPage />} />
      <Route path="/get_dome_bank_gene_info" element={<GetDomeBankGeneInfoPage />} />
    </Routes>
  )
}

export default App