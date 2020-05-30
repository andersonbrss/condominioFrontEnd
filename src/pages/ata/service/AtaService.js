import Ata from'../repository/AtaRepository';
import moment from 'moment';

const ataRepository = Ata.build({});

export default {

    buscaLista:() => {
        return ataRepository.getList();        
    },
        
    buscarListaData:(dataInicio, dataFim) => {
        dataInicio = moment(dataInicio).format('YYYY-MM-DD');            
        dataFim    = moment(dataFim).format('YYYY-MM-DD');    
        return ataRepository.buscaPorData(dataInicio, dataFim);
    },
   
    cadastroAta:( ata ) => {
        ata.data = moment(ata.data).format('YYYY-MM-DD');  
        if (Object.entries(ata.pauta).length === 0) {
            delete ata.pauta;            
        }              
        return ataRepository.save(ata);
    },
    
    atualizarAta:(ata) => {
        ata.data = moment(ata.data).format('YYYY-MM-DD');    
        return ataRepository.update(ata);
    },
 
    delete:( id ) => {        
        return ataRepository.delete( id )
    }
}