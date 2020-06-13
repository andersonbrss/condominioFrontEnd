import PautaRepository from '../repository/PautaRepository';
import moment from 'moment';


const pautaRepository = PautaRepository.build({})

export default {

    buscaLista:() => {
        return pautaRepository.getList();        
    },

    buscarListaData:(dataInicio, dataFim) => {
        dataInicio = moment(dataInicio).format('YYYY-MM-DD');    
        dataFim    = moment(dataFim).format('YYYY-MM-DD');    
        return pautaRepository.buscaPorData(dataInicio, dataFim);
    },

    buscarPautaVinculoComunicado:(dataInicio, dataFim) => {
        dataInicio = moment(dataInicio).format('YYYY-MM-DD');    
        dataFim    = moment(dataFim).format('YYYY-MM-DD');    
        return pautaRepository.buscaPautaVinculoComunicado(dataInicio, dataFim);
    },

    buscarPautaVinculoAta:(dataInicio, dataFim) => {
        dataInicio = moment(dataInicio).format('YYYY-MM-DD');    
        dataFim    = moment(dataFim).format('YYYY-MM-DD');    
        return pautaRepository.buscaPautaVinculoAta(dataInicio, dataFim);
    },

    cadastroPauta:( pauta ) => {
        pauta.data = moment(pauta.data).format('YYYY-MM-DD');    
        return pautaRepository.save(pauta);
    },
    
    atualizarPauta:(pauta) => {
        pauta.data = moment(pauta.data).format('YYYY-MM-DD');    
        return pautaRepository.update(pauta);
    },
 
    delete:( id ) => {        
        return pautaRepository.delete( id )
    }

}