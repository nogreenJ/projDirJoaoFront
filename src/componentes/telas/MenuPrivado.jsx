import { NavLink, Outlet } from 'react-router-dom';
import { getUsuario, logout } from '../../seguranca/Autenticacao';


const MenuPrivado = () => {

    const usuario = getUsuario();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" aria-current="page" exact="true" to="/">APP Diretórios</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" exact="true" to="diretoriomenu">Diretórios</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" exact="true" to="usuariomenu">Usuários</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {usuario ? "Usuário: " + usuario.nome : "Usuário"}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <NavLink className="dropdown-item"
                                            onClick={() => logout()}
                                            exact="true" to="/">Logout</NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
        /*<div>
            <Sidebar aria-label="Menu">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            href="/diretoriomenu"
                        >
                            <p>
                                Diretórios
                            </p>
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="/usuariomenu"
                        >
                            <p>
                                Usuários
                            </p>
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                        >
                            <p>
                                Configurações
                            </p>
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>*/
    )
};

export default MenuPrivado;