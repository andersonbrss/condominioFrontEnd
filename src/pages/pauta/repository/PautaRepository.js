import Repository from '@/service/Repository'
import { urlApi } from '@/global'

export default class Pauta extends Repository {
    /**
     * @param {*} options
     */
    constructor( options ) {
        super( options, `${ urlApi }/pauta`)
    }
}