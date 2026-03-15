import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PropertyPage from "./pages/PropertyPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/patio-hori"
          element={<PropertyPage slug="patio-hori" />}
        />
        <Route
          path="/patio-nattu"
          element={<PropertyPage slug="patio-nattu" />}
        />
        <Route
          path="/start-recife"
          element={<PropertyPage slug="start-recife" />}
        />
        <Route
          path="/start-costa-dourada"
          element={<PropertyPage slug="start-costa-dourada" />}
        />
        <Route
          path="/start-costa-dourada2"
          element={<PropertyPage slug="start-costa-dourada2" />}
        />
        <Route
          path="/direcional-paulista"
          element={<PropertyPage slug="direcional-paulista" />}
        />
        <Route
          path="/aurora-dos-passaros"
          element={<PropertyPage slug="aurora-dos-passaros" />}
        />
        <Route
          path="/bosque-das-acacias"
          element={<PropertyPage slug="bosque-das-acacias" />}
        />
        <Route
          path="/botanik-torre"
          element={<PropertyPage slug="botanik-torre" />}
        />
        <Route
          path="/brisas-dos-nobres"
          element={<PropertyPage slug="brisas-dos-nobres" />}
        />
        <Route
          path="/brisas-de-igarassu"
          element={<PropertyPage slug="brisas-de-igarassu" />}
        />
        <Route
          path="/candeias-garden"
          element={<PropertyPage slug="candeias-garden" />}
        />
        <Route
          path="/citta-san-martin"
          element={<PropertyPage slug="citta-san-martin" />}
        />
        <Route
          path="/condominio-rio-capibaribe"
          element={<PropertyPage slug="condominio-rio-capibaribe" />}
        />
        <Route
          path="/viva-vida-sao-lorenco"
          element={<PropertyPage slug="viva-vida-sao-lorenco" />}
        />
        <Route
          path="/residencial-real-prime"
          element={<PropertyPage slug="residencial-real-prime" />}
        />
        <Route
          path="/conquista-jaboatao"
          element={<PropertyPage slug="conquista-jaboatao" />}
        />
        <Route
          path="/like-boa-vista"
          element={<PropertyPage slug="like-boa-vista" />}
        />
        <Route
          path="/mada-studios"
          element={<PropertyPage slug="mada-studios" />}
        />
        <Route
          path="/morada-beberibe"
          element={<PropertyPage slug="morada-beberibe" />}
        />
        <Route
          path="/morada-capibaribe2"
          element={<PropertyPage slug="morada-capibaribe2" />}
        />
        <Route
          path="/nascente-do-capibaribe"
          element={<PropertyPage slug="nascente-do-capibaribe" />}
        />
        <Route path="/paco-deco" element={<PropertyPage slug="paco-deco" />} />
        <Route
          path="/patio-solare"
          element={<PropertyPage slug="patio-solare" />}
        />
        <Route
          path="/premier-residence"
          element={<PropertyPage slug="premier-residence" />}
        />
        <Route
          path="/rooftop-olinda-prime"
          element={<PropertyPage slug="rooftop-olinda-prime" />}
        />
        <Route
          path="/tivo-studio"
          element={<PropertyPage slug="tivo-studio" />}
        />
        <Route
          path="/torres-de-olinda"
          element={<PropertyPage slug="torres-de-olinda" />}
        />
        <Route
          path="/vale-caxanga"
          element={<PropertyPage slug="vale-caxanga" />}
        />
        <Route
          path="/varzea-prime"
          element={<PropertyPage slug="varzea-prime" />}
        />
        <Route
          path="/vila-das-palmeiras"
          element={<PropertyPage slug="vila-das-palmeiras" />}
        />
        <Route
          path="/vista-do-golf"
          element={<PropertyPage slug="vista-do-golf" />}
        />
        <Route
          path="/viva-casa-amarela"
          element={<PropertyPage slug="viva-casa-amarela" />}
        />
        <Route
          path="/viva-vida-jardim-botanico"
          element={<PropertyPage slug="viva-vida-jardim-botanico" />}
        />
        <Route
          path="/viva-vida-primavera"
          element={<PropertyPage slug="viva-vida-primavera" />}
        />
        <Route path="/properties/:slug" element={<PropertyPage />} />
      </Routes>
    </div>
  );
}

export default App;
