import ComunicadoRepository from '../repository/ComunicadoRepository';
import moment from 'moment';

const comunicadoRepository = ComunicadoRepository.build({});

export default {
    
    buscarLista:() =>{
        return comunicadoRepository.getList();
    },

    buscarListaData:(dataInicio, dataFim) => {
        dataInicio = moment(dataInicio).format('YYYY-MM-DDT00:00');            
        dataFim    = moment(dataFim).format('YYYY-MM-DDT23:59');    
        return comunicadoRepository.buscaPorData(dataInicio, dataFim);
    },

    cadastroComunicado:(comunicado)=>{
        comunicado.data = moment(comunicado.data).format('YYYY-MM-DDTHH:mm');
        if (Object.entries(comunicado.pautaAssuntos).length === 0) {
            delete comunicado.pautaAssuntos;            
        }            
        return comunicadoRepository.save(comunicado);
    },

    atualizarComunicado:(comunicado) => {
        comunicado.data = moment(comunicado.data).format('YYYY-MM-DDTHH:mm');    
        if (comunicado.pautaAssuntos == null) {
            delete comunicado.pautaAssuntos;            
        }else if (Object.entries(comunicado.pautaAssuntos).length === 0) {
            delete comunicado.pautaAssuntos;            
        }                        
        return comunicadoRepository.update(comunicado);
    },

    delete:(id) =>{
        return comunicadoRepository.delete(id);
    }
}