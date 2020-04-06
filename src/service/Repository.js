import axios from 'axios'

import Service from '@/service/Service'

/**
 * @type {Api}
 */

 export default class Repository extends Service {
     /**
      * @param {Object} options
      * @param {string} resource
      */
     constructor( options, resource ) {
         super( options )
         this.resource = resource
     }

     /**
      * @param {Object} record
      */
     save( record ) {
         return axios.post( this.resource, record )
     }

     getList() {
         return axios.get( this.resource )
     }

     /**
      * @param {long} id
      */
     getId( id ) {
         return axios.get( `${this.resource}/${id}` )
     }

     /**
      * @param {Date} dataInicio
      * @param {Date} dataFim
      */
     buscaPorData( dataInicio, dataFim ) {
        return axios.get( `${this.resource}/${dataInicio}/${dataFim}` )
    }

     /**
      * @param {Object} record
      */
     update( record ) {
         return axios.put( `${this.resource}`, record )
     }

     /**
      * @param {long} id
      */
     delete( id ) {
         return axios.delete( `${this.resource}/${id}` )
     }
 }