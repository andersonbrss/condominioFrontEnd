import Repository from '@/service/Repository'
import { urlApi } from '@/global'

export default class Funcionario extends Repository {
    /**
     * @param {*} options
     */
    constructor( options ) {
        super( options, `${ urlApi }/funcionario`)
    }
}