import Repository from '@/service/Repository'
import { urlApi } from '@/global'
import axios from 'axios';


export default class Pauta extends Repository {
    /**
     * @param {*} options
     */
    constructor( options ) {
        super( options, `${ urlApi }/pauta`)
    }

    buscaPautaVinculoComunicado( dataInicio, dataFim ) {
        return axios.get( `${this.resource}/vinculoComunicado/${dataInicio}/${dataFim}` )
    }

    buscaPautaVinculoAta( dataInicio, dataFim ) {
        return axios.get( `${this.resource}/vinculoAta/${dataInicio}/${dataFim}` )
    }
}