import { getToken } from "../../seguranca/Autenticacao";
import MenuPrivado from "./MenuPrivado";
import Login from "./login/Login";

const Menu = () => {

    if (getToken() != null) {
        return MenuPrivado();
    } else {
        return Login();
    }
};

export default Menu;