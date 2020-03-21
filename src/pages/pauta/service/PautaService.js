import PautaRepository from '../repository/PautaRepository'

const pautaRepository = PautaRepository.build({})

export default {

    buscaLista:() => {
        return pautaRepository.getList();        
    },

    cadastroPauta:( pauta ) => {
        return pautaRepository.save(pauta);
    },
    
    atualizarPauta:(pauta) => {
        return pautaRepository.update(pauta);
    },
 
    delete:( id ) => {        
        return pautaRepository.delete( id )
    }

}