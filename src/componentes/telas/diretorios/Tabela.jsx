import { useContext } from "react";
import DiretorioContext from "./DiretorioContext";
import Alerta from '../../comuns/Alerta';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto, getDiretorioList } = useContext(DiretorioContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Diretorios</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {listaObjetos.length === 0 && <h1>Nenhum diretório encontrado</h1>}
            {listaObjetos.length > 0 && (
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    {getDiretorioList()}
                </TreeView>
            )}
        </div>
    )
}

export default Tabela;