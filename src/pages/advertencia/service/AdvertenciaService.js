import AdvertenciaRepository from '../repository/AdvertenciaRepository'

const advertenciaRepository = AdvertenciaRepository.build({})

export default {

    getList: function() {
        return advertenciaRepository.getList();
    },
    save: function( advertencia ) {
        if( advertencia.id )
            return advertenciaRepository.update( advertencia )
        return advertenciaRepository.save( advertencia )
    },
    delete: function( id ) {
        return advertenciaRepository.delete( id )
    }

}