import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import DiretorioContext from './DiretorioContext';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(DiretorioContext);

    return (
        <Dialogo id="modalEdicao" titulo="Diretorio" idformulario="formEdicao"
            acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                name="codigo" value={objeto.codigo}
                handlechange={handleChange}
                requerido={false} readonly={true}
                maximocaracteres={5} />
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                name="nome" value={objeto.nome}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Nome OK" textoinvalido="Informe o nome"
                maximocaracteres={40} />
            <CampoEntrada id="txtParent" label="Parent" tipo="text"
                name="parent" value={objeto.parent}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Diretório Pai OK" textoinvalido="Informe o diretório pai"
                maximocaracteres={40} />
        </Dialogo>
    )
}

export default Form;
