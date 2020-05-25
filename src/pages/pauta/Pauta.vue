<template> 
  <div class="app-container app-theme-white">
    <page-title-comum
      :nomeFuncionalidade="cabecalho"
      :subTituloFuncionalidade="subTitulo"
      :icon="icon"
      :idModal="idModal"
      v-on:configuraModal="recuperaNomeModal"/>

<pesquisa-data  v-on:pesquisar = "recuperarPautaData(filtroDatas.dataInicio, filtroDatas.dataFim)"> 
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
                        :format="{weekday: 'long',year: 'numeric', month: 'long', day: 'numeric'}">
                    </datetime>             
            </div>
          </div>
        </div>
</div>
</pesquisa-data>



<div>
    <ValidationObserver ref="form">
      <modal-component
        :idModal="idModal"
        :tituloModal="tituloModal"
        v-on:save="cadastrarPauta"
        v-on:reset="limparFormulario">

        <b-form>
          <div class="form-row">
            <div class="col-md-12">
              <div class="position-relative form-group">
                <label for="data">Data:</label>
                <ValidationProvider
                  name="data"
                  rules="required"
                  :bails="false"
                  v-slot="{
                    classes,
                    errors}">

                 <div class="control" :class="classes">                  
                       <datetime
                        v-model="pauta.data"  
                        type="date"
                        name="data"                        
                        input-id="data"
                        input-class="form-control"  
                        placeholder="Selecione a data"
                        value-zone="America/Sao_Paulo"                               
                        :format="{weekday: 'long',year: 'numeric', month: 'long', day: 'numeric'}">
                    </datetime>
                    <span id="error">{{ errors[1] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col-md-12">
              <div class="position-relative form-group">
                <label for="local">Local:</label>
                <ValidationProvider
                  name="local"
                  rules="required|min:5|max:100"
                  :bails="false"
                  v-slot="{
                    classes,
                    errors}">

                  <div class="control" :class="classes">
                    <b-form-input
                      v-model="pauta.local"
                      name="local"
                      id="local"
                      placeholder="Digite o local"
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
                <label for="assuntos">Assunto(s):</label>

                <ValidationProvider
                  name="assuntos"
                  rules="required|min:5|max:1000"
                  :bails="false"
                  v-slot="{
                    classes,
                    errors
                  }">

                  <div class="control" :class="classes">
                    <b-form-textarea
                      v-model="pauta.assuntos"
                      name="assuntos"
                      id="assuntos"
                      placeholder="Digite o assunto(s) da pauta"                      
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
      :listaObjetos="listaPauta"
      :camposFormulario="camposPauta"
      v-on:load="loadPauta"
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

import PautaService from "./service/PautaService";
import Pauta from "./domain/Pauta";

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("pt_BR", pt);

export default {
  name: "Pauta",
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
      cabecalho: "Pauta",
      subTitulo: "Listas de pautas",
      icon: "pe-7s-note2",
      idModal: "cadastrar-pauta",
      tituloModal: "Cadastro de Pautas",
      pauta: new Pauta(),
      filtroDatas:{
        dataInicio: moment().format(), 
        dataFim: moment().add(7,"days").format()},
      listaPauta: [],
      camposPauta: [
        {
          key: "data",
          label: "Data",
          formatter: value => {
            return moment(value).format('LL');
          },
          sortable: true
        },
        { key: "local", label: "Local" },
        { key: "assuntos", label: "Assunto(s)" },
        { key: "actions", label: "Ações" }
      ],            
    };
  },

  methods: {
    limparFormulario: function() {
      this.pauta = new Pauta();
      this.$refs.form.reset();
    },

    recuperaNomeModal:function(){
     this.tituloModal = "Cadastro de Pauta";
    },
    
  recuperarPautaData: function(dataInicio, dataFim){
        PautaService.buscarListaData(dataInicio, dataFim)
      .then(res => {
        this.listaPauta = res.data;         
      }).catch(showError);
    },

    recuperaListaPauta: function() {      
      PautaService.buscaLista()
        .then(res => {
          this.listaPauta = res.data;
        })
        .catch(showError);
    },

    cadastrarPauta: function() {         
      this.$refs.form.validate().then(sucesso => {
        if (!sucesso) {
          showError("Realize o preenchimento de todos os campos obrigatórios");
        } else {
          if (!this.pauta.id) {
            PautaService.cadastroPauta(this.pauta)
              .then(() => {
                this.limparFormulario();
                this.recuperaListaPauta();
                showSuccess();
              })
              .catch(showError);
          } else {
            PautaService.atualizarPauta(this.pauta)
              .then(() => {
                showSuccess();
                this.limparFormulario();
                this.recuperaListaPauta();                
              })
              .catch(showError);
          }
        }
      });
    },

    delete: function(pauta) {
      PautaService.delete(pauta.id)
        .then(() => {
          let index = this.listaPauta.indexOf(pauta);
          this.listaPauta.splice(index, 1);
          showSuccess();
        })
        .catch(showError);
    },

    loadPauta: function(pauta) {    
      this.$bvModal.show(this.idModal);     
      this.tituloModal = "Alteração Pauta"; 
      this.pauta = { ...pauta };
     this.pauta.data = moment(pauta.data).format();     
    },

    confirmModal: function(pauta) {
      this.$bvModal
        .msgBoxConfirm(
          "Deseja realmente excluir a Pauta do dia: " +
          moment(pauta.data).format("DD/MM/YYYY") + "?",
          confirmDialogObject
        )
        .then(value => {
          if (value) this.delete(pauta);
        })
        .catch(showError);
    }
  },
  mounted: function() {
    this.recuperaListaPauta();
  }
};
</script>

<style lang="stylus" scoped>
.control
 width: 100%
 span
   display: block
   input,textarea,datepicker
   padding: 5px 10px

 &.invalid
   input,textarea,datepicker,span
     color: #EB0600
   input,textarea,datepicker
     border: 1px #EB0600 solid

 &.valid
   input,textarea,datepicker,span
     color: #045929
   input,textarea,datepicker
     border: 1px #045929 solid
</style>
