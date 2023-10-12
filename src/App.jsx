import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from "./componentes/telas/Home";
import Diretorio from "./componentes/telas/diretorios/Diretorio";
import Usuario from "./componentes/telas/usuarios/Usuario";
import Menu from "./componentes/telas/Menu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      /*{
        index: true,
        element: <Home />
      },*/
      {
        path: "diretoriomenu",
        element: <Diretorio />
      },
      {
        path: "usuariomenu",
        element: <Usuario />
      }
    ]
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
