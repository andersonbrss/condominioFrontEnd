import UsuarioRepository from '../repository/UsuarioRepository'

const repository = UsuarioRepository.build({ })

export default {
    save: function( usuario ) {
        if( usuario.id )
            return repository.update( usuario )
        return repository.save( usuario )
    }
}