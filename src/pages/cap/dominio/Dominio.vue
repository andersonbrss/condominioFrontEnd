<template>
    <div class="app-container app-theme-white">
        <page-title-comum :heading="heading" :subheading="subheading" :icon="icon" :idModal="idModal" />

        <modal-component  :idModal="idModal" :titleModal="titleModal" v-on:save="save" v-on:reset="reset" >
            <b-form>
                <input type="hidden" v-model="dominio.id" id="idDominio" />
                <div class="form-row">
                    <div class="col-md-12">
                        <div class="position-relative form-group">
                            <label for="nome">Nome</label>
                            <b-form-input v-model="dominio.nome" name="nome" id="nome" placeholder="Digite o nome do dominio" type="text" class="form-control" minlength="5" maxlength="40" />
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12">
                        <div class="position-relative form-group">
                            <label for="descricao">Descrição</label>
                            <b-form-input v-model="dominio.descricao" name="descricao" id="descricao" placeholder="Digite a descrição do dominio" type="text" class="form-control" />
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12">
                        <div class="position-relative form-group">
                            <label for="boss">Boss</label>
                            <b-form-input v-model="dominio.boss" name="boss" id="boss" placeholder="Digite o nome do responsavel do setor" type="text" class="form-control" />
                        </div>
                    </div>
                </div>
            </b-form>
        </modal-component>

    <tabela-component :list="dominioList" :cols="fields" v-on:load="loadDominio" v-on:delete="confirmModal" />

    </div>
</template>

<script>
import PageTitleComum from '../../../Layout/Components/PageTitleComum.vue';
import ModalComponent from '../../components/ModalComponent.vue';
import TabelaComponent from '../../components/TabelaComponent.vue';

import { confirmDialogObject, showError, showSuccess } from '@/global';
import DominioService from '../dominio/service/DominioService';

export default {
    name: 'Dominio',
    components: {
        PageTitleComum,
        ModalComponent,
        TabelaComponent
    },
    data: function() {
        return {
            heading: 'Dominio',
            subheading: 'Tabela de dominio do sistema',
            icon: 'pe-7s-wallet icon-gradient bg-plum-plate',
            idModal: 'cadastrar-dominio',
            titleModal: 'Cadastro de dominio',
            dominio: {},
            dominioList: [],
            fields: [
                { key: 'nome', label: 'Nome', sortable: true },
                { key: 'descricao', label: 'Descrição', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        reset: function() {
            this.dominio = {}
        },
        save: function() {
            DominioService.save( this.dominio ).then( (e) => {
                this.listDominio()
                this.reset()
                showSuccess(e)
            }).catch( showError )
        },
        delete: function( dominio ) {
            DominioService.delete( dominio.id ).then( (e) => {
                let index = this.dominioList.indexOf( dominio )
                this.dominioList.splice( index, 1 )
                showSuccess(e)
            }).catch( showError )
        },
        listDominio: function() {
            DominioService.getList().then( res => {
                this.dominioList = res.data
            }).catch( showError )
        },
        loadDominio: function( dominio ) {
            this.$bvModal.show( this.idModal )
            this.dominio = { ...dominio }
        },
        confirmModal: function( dominio ) {
            this.$bvModal.msgBoxConfirm('Deseja realmente excluir o dominio: ' + dominio.descricao, confirmDialogObject ).then( value => {
                if( value ) this.delete( dominio )
            }).catch( showError )
        }
    },
    mounted: function(){
        this.listDominio();
    }
    
}
</script>