import Home from './components/home';
import Login from './components/login';
import Registro from './components/registro';
import TiendaAutos from './components/shop';
import CrudAutos from './components/crudAutos';
import CrudPiezas from './components/crudPiezas';
import { BrowserRouter, Route, Routes , Link  } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/shop" element={<TiendaAutos />} />
        <Route path="/crudAutos" element={<CrudAutos />} />
        <Route path="/crudPiezas" element={<CrudPiezas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
