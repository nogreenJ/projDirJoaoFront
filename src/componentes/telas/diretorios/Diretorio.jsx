import { useState, useEffect } from "react";
import DiretorioContext from "./DiretorioContext";
import {
    getDiretorioServico, getDiretorioServicoPorCodigoAPI,
    deleteDiretorioServico, cadastraDiretorioServico
}
    from '../../../servicos/DiretorioServico';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";
import { getUsuario } from "../../../seguranca/Autenticacao";

function Diretorio() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ codigo: "", nome: "", parent: "", usuario: "" });
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ codigo: 0, nome: "", parent: "", usuario: getUsuario().codigo });
    }

    const getListaObjetosSemSelf = () => {
        const newArr = listaObjetos.filter(obj => {
            return obj.codigo !== objeto.codigo;
        });
        return newArr
    }

    const getDiretorioList = (id) => {
        let dirList = [];
        if (id) {
            dirList = listaObjetos.filter(obj => obj.parent === id);
        } else {
            dirList = listaObjetos.filter(obj => !obj.codigo);
        }
        dirList.forEach(obj => {
            obj.children = getDiretorioList(obj.codigo);
        });
        return dirList;
    }

    const editarObjeto = async codigo => {
        try {
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setObjeto(await getDiretorioServicoPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            console.log(editar)
            console.log(objeto)
            let retornoAPI = await cadastraDiretorioServico(objeto, metodo);
            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/", { replace: true });
        }
        recuperaDiretorios();
    }

    const recuperaDiretorios = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getDiretorioServico());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/", { replace: true });
        }
    }

    const remover = async codigo => {
        try {
            if (window.confirm('Deseja remover este objeto')) {
                let retornoAPI = await deleteDiretorioServico(codigo);
                setAlerta({
                    status: retornoAPI.status,
                    message: retornoAPI.message
                });
                recuperaDiretorios();
            }
        } catch (err) {
            window.location.reload();
            navigate("/", { replace: true });
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaDiretorios();
    }, []);

    return (
        <DiretorioContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, getListaObjetosSemSelf,
            getDiretorioList, handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>

            <Form />
        </DiretorioContext.Provider>
    )
}

export default WithAuth(Diretorio);
