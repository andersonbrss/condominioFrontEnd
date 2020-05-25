import FuncionarioRepository from '../repository/FuncionarioRepository'

const funcionarioRepository = FuncionarioRepository.build({})

export default {

    buscaLista:() => {
        return funcionarioRepository.getList();        
    },

    buscarListaData:(dataInicio, dataFim) => {
        return funcionarioRepository.buscaPorData(dataInicio, dataFim);
    },

    cadastroFuncionario:( funcionario ) => {
        return funcionarioRepository.save(funcionario);
    },
    
    atualizarFuncionario:(funcionario) => {
        return funcionarioRepository.update(funcionario);
    },
 
    delete:( id ) => {        
        return funcionarioRepository.delete( id )
    }

}