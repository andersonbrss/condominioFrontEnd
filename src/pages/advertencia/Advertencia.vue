<template>
    <div class="app-container app-theme-white">
        <page-title-comum :heading="heading" :subheading="subheading" :icon="icon" :idModal="idModal"></page-title-comum>

        <modal-component  :idModal="idModal" :titleModal="titleModal" v-on:save="save" v-on:reset="reset" >
            <b-form>
                <input type="hidden" v-model="advertencia.id" id="idAdvertencia" />
                <div class="form-row">
                    <div class="col-md-12">
                        <div class="position-relative form-group">
                            <label for="data">Data</label>
                            <date-picker id="data" v-model="advertencia.data" :config="options" />
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12">
                        <div class="position-relative form-group">
                            <label for="motivo">Motivo</label>
                            <b-form-input v-model="advertencia.motivo" name="motivo" id="motivo" placeholder="Digite o motivo da advertencia" type="text" class="form-control" minlength="5" maxlength="40" />
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12">
                        <div class="position-relative form-group">
                            <label for="dsAdvertencia">Descrição</label>
                            <b-form-input v-model="advertencia.descricao" name="descricao" id="descricao" placeholder="Digite a descrição da advertencia" type="text" class="form-control" maxlength="350" />
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12">
                        <div class="position-relative form-group">
                            <label for="anexo">Anexo</label>
                            <b-form-input v-model="advertencia.anexo" name="anexo" id="anexo" ></b-form-input>
                        </div>
                    </div>
                </div>
            </b-form>
        </modal-component>

        <tabela-component :list="advertenciaList" :cols="fields" v-on:load="loadAdvertencia" v-on:delete="confirmModal" />

    </div>
</template>

<script>
import PageTitleComum from '../../Layout/Components/PageTitleComum.vue';
import ModalComponent from '../components/ModalComponent.vue';
import TabelaComponent from '../components/TabelaComponent.vue';
import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

import { confirmDialogObject, showError, showSuccess, calendarConfigFormt } from '@/global';
import AdvertenciaService from './service/AdvertenciaService';

export default {
    name: 'Advertencia',
    components: {
        PageTitleComum,
        ModalComponent,
        TabelaComponent,
        'date-picker': datePicker
    },
    data: function() {
        return {
            options: calendarConfigFormt,
            heading: 'Advertencia',
            subheading: 'Tabela de advertencia do sistema',
            icon: 'pe-7s-wallet icon-gradient bg-plum-plate',
            idModal: 'cadastrar-advertencia',
            titleModal: 'Cadastro de advertencia',
            advertencia: {
                data: new Date()
            },
            advertenciaList: [],
            fields: [
                { key: 'descricao', label: 'Advertencia', sortable: true },
                { key: 'motivo', label: 'Motivo', sortable: true },
                { key: 'data', label: 'Data', formatter: value => {
                        return new Date(value).toLocaleString()
                    }, sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        reset: function() {
            this.advertencia = {
                data: new Date()
            }
        },
        save: function() {
            AdvertenciaService.save( this.advertencia ).then( (e) => {
                this.listAdvertencia()
                this.reset()
                showSuccess(e)
            }).catch( showError )
        },
        delete: function( advertencia ) {
            AdvertenciaService.delete( advertencia.id ).then( (e) => {
                let index = this.advertenciaList.indexOf( advertencia )
                this.advertenciaList.splice( index, 1 )
                showSuccess(e)
            }).catch( showError )
        },
        listAdvertencia: function() {
            AdvertenciaService.getList().then( res => {
                this.advertenciaList = res.data
            }).catch( showError )
        },
        loadAdvertencia: function( advertencia ) {
            this.$bvModal.show( this.idModal )
            this.advertencia = { ...advertencia }
            this.advertencia.data = new Date( advertencia.data ) 
        },
        confirmModal: function( advertencia ) {
            this.$bvModal.msgBoxConfirm('Deseja realmente excluir a advertencia: ' + advertencia.descricao, confirmDialogObject ).then( value => {
                if( value ) this.delete( advertencia )
            }).catch( showError )
        }
    },
    mounted: function() {
        this.listAdvertencia()
    }
}
</script>