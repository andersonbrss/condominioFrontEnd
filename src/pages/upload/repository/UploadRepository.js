import Repository from '@/service/Repository';
import { urlApi } from '@/global';
import axios from 'axios';


export default class Upload extends Repository {
    /**
     * @param {*} options
     */
    constructor( options ) {
        super( options, `${ urlApi }/upload`)
    }
   
     /**
      * @param {Object} record
      */
     saveArquivo( record ) {
        let formData = new FormData();
        formData.append('file',record.arquivo);           
        return axios.post( this.resource, formData,
            {
                headers: {
                    'Content-type': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
              }
            )
    }
}