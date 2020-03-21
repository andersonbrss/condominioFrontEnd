<template>
    <div class="app-container app-theme-white">
        <page-title-comum :nomeFuncionalidade="cabecalho" :subTituloFuncionalidade="subTitulo" :icon="icon" :idModal="idModal" />

        <modal-component :idModal="idModal" :tituloModal="tituloModalCadastro" v-on:save="cadastrarPauta" v-on:reset="limparFormulario" >
            <b-form>
                <div class="form-row">
                    <div class="col-md-12">
                        <div class="position-relative form-group">
                            <label for="data">Data</label>
                            <date-picker id="data" v-model="pauta.data" :config="options" />
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12">
                        <div class="position-relative form-group">
                            <label for="local">Local</label>
                            <b-form-input v-model="pauta.local" name="local" id="local" placeholder="Digite o local" type="text" class="form-control" />
                        </div>
                    </div>
                </div>
                              <div class="form-row">
                   <div class="col-md-12">
                        <div class="position-relative form-group">
                            <label for="assunto">Assunto(s)</label>
                            <b-form-input v-model="pauta.assunto" name="assunto" id="assunto" placeholder="Digite o assunto(s) da pauta" type="text" class="form-control" />
                        </div>
                    </div>             
                    </div>             

            </b-form>
        </modal-component>

    <tabela-component :listaObjetos="listaPauta" :camposFormulario="camposPauta" v-on:load="loadPauta" v-on:delete="confirmModal" />

    </div>
</template>

<script>
import PageTitleComum from '../../Layout/Components/PageTitleComum.vue';
import ModalComponent from '../components/ModalComponent.vue';
import TabelaComponent from '../components/TabelaComponent.vue';
import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import { confirmDialogObject, showError, showSuccess, calendarConfigFormt } from '@/global';
import PautaService from './service/PautaService';
import Pauta from './domain/Pauta';

export default {
    name: 'Pauta',
    components: {
        PageTitleComum,
        ModalComponent,
        TabelaComponent,
        'date-picker': datePicker
    },
    data: function() {
        return {
            options: calendarConfigFormt,
            cabecalho: 'Pauta',
            subTitulo: 'Listas de pautas',
            icon: 'pe-7s-wallet icon-gradient bg-plum-plate',
            idModal: 'cadastrar-pauta',
            tituloModalCadastro: 'Cadastro de Pautas',            
            pauta: new Pauta(),                        
            listaPauta: [],
            camposPauta: [
                {key: 'data', label: 'Data', formatter: value => {
                        return new Date(value).toLocaleString().substr(0,10)
                    }, sortable: true },
                { key: 'local', label: 'Local', sortable: true },
                { key: 'assunto', label: 'Assunto' },
                {key: 'actions', label: 'Ações' }
            ],
             value: '',
            context: null,
        }
    },

    methods: {
         onContext(ctx) {
        this.context = ctx
      },
        limparFormulario: function() {
            this.pauta = new Pauta();
        },        

         recuperaListaPauta: function() {
            PautaService.buscaLista().then( res => {
                this.listaPauta = res.data                   
            }).catch( showError )
        },
        
        cadastrarPauta: function() {
            if(!this.pauta.id){
                PautaService.cadastroPauta( this.pauta ).then(() => {                               
                this.listaPauta.push({...this.pauta});
                this.limparFormulario()
                showSuccess("Pauta cadastrada com sucesso!")
            }).catch( showError )
            } else{
             PautaService.atualizarPauta( this.pauta ).then(() => {                                                                                         
                showSuccess("Pauta atualizada com sucesso!")                                
                this.limparFormulario()
                this.recuperaListaPauta()
            }).catch( showError )
            }
        },

        delete: function( pauta ) {
            PautaService.delete( pauta.id )
            .then(() => {
                let index = this.listaPauta.indexOf( pauta )
                this.listaPauta.splice( index, 1 )          
                showSuccess("Pauta excluida com sucesso!")                      
            }).catch( showError )                
            }, 
       
       
        loadPauta: function( pauta ) {
            this.$bvModal.show( this.idModal )
            this.pauta = { ...pauta }
        },
        confirmModal: function( pauta ) {
            this.$bvModal.msgBoxConfirm('Deseja realmente excluir a Pauta: ' + pauta.data, confirmDialogObject ).then( value => {
                if( value ) this.delete( pauta )
            }).catch( showError )
        }    
    },    
    mounted: function(){
        this.recuperaListaPauta();
    }      
}
</script>
