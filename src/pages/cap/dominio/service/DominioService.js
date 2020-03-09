import DominioRepository from '../repository/DominioRepository'

const dominioRepository = DominioRepository.build({})

export default {

    getList: function() {
        return dominioRepository.getList();
    },
    save: function( dominio ) {
        if( dominio.id )
            return dominioRepository.update( dominio )
        return dominioRepository.save( dominio )
    },
    delete: function( id ) {
        return dominioRepository.delete( id )
    }
}