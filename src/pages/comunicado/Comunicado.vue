<template> 
  <div class="app-container app-theme-white">
    <page-title-comum
      :nomeFuncionalidade="cabecalho"
      :subTituloFuncionalidade="subTitulo"
      :icon="icon"
      :idModal="idModal"/>

<!-- Component de pesquisa -->
<pesquisa-data  v-on:pesquisar = "recuperarComunicadoData(filtroDatas.dataInicio, filtroDatas.dataFim)"> 
<div>
        <div class="row">
          <div class="col-md-6">
            <h6>Data Inicio:</h6>
                    <datetime
                        v-model="filtroDatas.dataInicio"      
                        type="date"
                        name="dataInicio"                        
                        input-id="dataInicio"
                        input-class="form-control"  
                        placeholder="Selecione a data e hora"
                        value-zone="America/Sao_Paulo"                               
                        :format="{weekday: 'long',year: 'numeric', month: 'long', day: 'numeric' }">
                    </datetime> 

          </div>
          <div class="col-md-6">
            <div class="position-relative form-group">
              <h6>Data Fim:</h6>
                    <datetime
                        v-model="filtroDatas.dataFim"      
                        type="date"
                        name="dataFim"                        
                        input-id="dataFim"
                        input-class="form-control"  
                        placeholder="Selecione a data e hora"
                        value-zone="America/Sao_Paulo"                               
                        :format="{weekday: 'long',year: 'numeric', month: 'long', day: 'numeric'}">
                    </datetime>             
            </div>
          </div>
        </div>
</div>
</pesquisa-data>

<!-- Component de cadastro e alteracao -->
<div>
    <ValidationObserver ref="form">
      <modal-component
        :idModal="idModal"
        :tituloModal="tituloModal"
        v-on:save="cadastrarComunicado"
        v-on:reset="limparFormulario">

        <b-form >
        
          <div class="form-row">
            <div class="col-md-12">
              <div class="position-relative form-group">
                <label for="data">Data e Hora:</label>
                <ValidationProvider
                  name="data"
                  rules="required"
                  :bails="false"
                  v-slot="{
                    classes,
                    errors}">
                  <div class="control" :class="classes">                       
                    <datetime
                        v-model="comunicado.data"  
                        type="datetime"
                        name="data"                        
                        input-id="data"
                        input-class="form-control"  
                        placeholder="Selecione a data e hora"
                        value-zone="America/Sao_Paulo"                               
                        :format="{weekday: 'long',year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }">
                    </datetime> 
                     <span id="error">{{ errors[!errors] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>
          </div>
                  


          <div class="form-row">
            <div class="col-md-12">
              <div class="position-relative form-group">
                <label for="titulo">Titulo:</label>
                <ValidationProvider
                  name="titulo"
                  rules="required|min:5|max:100"
                  :bails="false"
                  v-slot="{
                    classes,
                    errors}">

                  <div class="control" :class="classes">
                    <b-form-input
                      v-model="comunicado.titulo"
                      name="titulo"
                      id="titulo"
                      placeholder="Digite o título"
                      type="text"
                      class="form-control"
                      :minlength="5"
                      :maxlength="100"/>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col-md-12">
              <div class="position-relative form-group">
                <label for="descricao">Descrição:</label>

                <ValidationProvider
                  name="descricao"
                  rules="required|min:5|max:1000"
                  :bails="false"
                  v-slot="{
                    classes,
                    errors
                  }">

                  <div class="control" :class="classes">
                    <b-form-textarea
                      v-model="comunicado.descricao"
                      name="descricao"
                      id="descricao"
                      placeholder="Digite o(s) assunto(s) do comunicado"                      
                      class="form-control"
                      :minlength="5"
                      :maxlength="1000"
                      rows="4"
                      max-rows="10" 
                    />
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>
          </div>
        </b-form>
      </modal-component>
    </ValidationObserver>
    <div>
    
    <tabela-component
      :listaObjetos="listaComunicado"
      :camposFormulario="camposComunicado"
      v-on:load="loadComunicado"
      v-on:delete="confirmModal"     
    />
    
    </div>
  </div>
  </div>
</template>

<script>
import PageTitleComum from "../../Layout/Components/PageTitleComum.vue";
import ModalComponent from "../components/ModalComponent.vue";
import TabelaComponent from "../components/TabelaComponent.vue";
import {confirmDialogObject,showError,showSuccess} from "@/global";
import {ValidationObserver,ValidationProvider,extend,localize} from "vee-validate";
import pt from "vee-validate/dist/locale/pt_BR.json";
import * as rules from "vee-validate/dist/rules";
import { Datetime } from 'vue-datetime';
import moment from 'moment';
import PesquisaData from "../components/PesquisaData.vue"

import ComunicadoService from "./service/ComunicadoService";
import Comunicado from "./domain/Comunicado";

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("pt_BR", pt);


export default {
  name: "Comunicado",
  components: {
    PageTitleComum,
    ModalComponent,
    TabelaComponent,
    ValidationProvider,
    ValidationObserver,
    datetime: Datetime,
    'pesquisa-data': PesquisaData
  },

  data: function() {
    return {      
      cabecalho: "Comunicado",
      subTitulo: "Listas de comunicados",
      icon: "pe-7s-comment",
      idModal: "cadastrar-comunicado",
      tituloModal: "Cadastro de Comunicados",
      comunicado: new Comunicado(),
       filtroDatas:{dataInicio: new Date().toISOString().substring(0,10), dataFim: new Date().toISOString().substring(0,10)},      
      listaComunicado: [],
      camposComunicado: [
        {
          key: "data",
          label: "Data e Hora",
          formatter: value => { 
            return moment(value).format('DD/MM/YYYY HH:mm');
          },
          sortable: true          
        },
        { key: "titulo", label: "Título" },
        { key: "descricao", label: "Descrição" },
        { key: "actions", label: "Ações" }
      ],
      value: "",
      context: null,
    };
  },

  methods: {
    onContext(ctx) {
      this.context = ctx;
    },
    limparFormulario: function() {
      this.comunicado = new Comunicado();
      this.$refs.form.reset();     
    },
    
  recuperarComunicadoData: function(dataInicio, dataFim){      
      ComunicadoService.buscarListaData(dataInicio, dataFim)
      .then(res => {
        this.listaComunicado = res.data;                
      }).catch(showError);
    },

    recuperaListaComunicado: function() {
      ComunicadoService.buscarLista()
        .then(res => {
          this.listaComunicado = res.data;          
        })
        .catch(showError);
    },

    cadastrarComunicado: function() {         
      this.$refs.form.validate().then(sucesso => {
        if (!sucesso) {
          showError("Realize o preenchimento de todos os campos obrigatórios");
        } else {
          if (!this.comunicado.id) {                                        
            ComunicadoService.cadastroComunicado(this.comunicado)
              .then(() => {
                this.limparFormulario();
                this.recuperaListaComunicado();
                showSuccess();
              })
              .catch(showError);
          } else {            
            ComunicadoService.atualizarComunicado(this.comunicado)
              .then(() => {
                showSuccess();
                this.limparFormulario();
                this.recuperaListaComunicado();                
              })
              .catch(showError);
          }
        }
      });
    },

    delete: function(comunicado) {
      ComunicadoService.delete(comunicado.id)
        .then(() => {
          let index = this.listaComunicado.indexOf(comunicado);
          this.listaComunicado.splice(index, 1);
          showSuccess();
        })
        .catch(showError);
    },

    loadComunicado: function(comunicado) {    
      this.$bvModal.show(this.idModal);      
      this.comunicado = { ...comunicado };
      this.comunicado.data = new Date(comunicado.data).toISOString();
    },
    confirmModal: function(comunicado) {
      this.$bvModal
        .msgBoxConfirm(
          "Deseja realmente excluir o Comunicado: " +
            comunicado.titulo+ "?"
            ,
          confirmDialogObject
        )
        .then(value => {
          if (value) this.delete(comunicado);
        })
        .catch(showError);
    }
  },
  mounted: function() {
    this.recuperaListaComunicado();
  },

};
</script>

<style lang="stylus" scoped>
.control
 width: 100%
 span
   display: block
   input,textarea,datetime
   padding: 5px 10px

 &.invalid
   input,textarea,span,datetime
     color: #EB0600
   input,textarea,datetime
     border: 1px #EB0600 solid

 &.valid
   input,textarea,span,datetime
     color: #045929
   input,textarea,datetime
     border: 1px #045929 solid
</style>
