import UploadRepository from '../repository/UploadRepository';

const uploadRepository = UploadRepository.build({})

export default {

    buscarArquivoId:(id) => {    
        return uploadRepository.getId(id);
    },

    cadastroArquivo:( arquivo ) => {          
        return uploadRepository.saveArquivo(arquivo);
    },
    
    atualizarArquivo:(arquivo) => { 
        return uploadRepository.update(arquivo);
    },
 
    delete:( id ) => {        
        return uploadRepository.delete( id )
    }   
       
}