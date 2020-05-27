<template>
  <div class="app-container app-theme-white">
    <page-title-comum
      :nomeFuncionalidade="cabecalho"
      :subTituloFuncionalidade="subTitulo"
      :icon="icon"
      :idModal="idModal"      
      v-on:configuraModal="recuperaNomeModal"
    />
    <!-- Component de pesquisa  -->
    <pesquisa-data
      v-on:pesquisar="recuperarAtaData(filtroDatas.dataInicio, filtroDatas.dataFim)">
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
              :format="{
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }"
            >
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
                :format="{
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }"
              >
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
          v-on:save="cadastrarAta"
          v-on:reset="limparFormulario"
        >
          <b-form>
            <div class="content">
              <b-row>
                <b-col md="12">
                  <b-card class="mb-3" no-body>
                    <b-tabs pills card>
                      <b-tab title="Ata" active>
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
                                  errors,
                                }"
                              >
                                <div class="control" :class="classes">
                                  <datetime
                                    v-model="ata.data"
                                    type="date"
                                    name="data"
                                    input-id="data"
                                    input-class="form-control"
                                    placeholder="Selecione a data"
                                    value-zone="America/Sao_Paulo"
                                    :format="{
                                      weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'                                      
                                    }"
                                  >
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
                              <label for="descricao">Considerações Finais:</label>

                              <ValidationProvider
                                name="considerações finais"
                                rules="required|min:5|max:1000"
                                :bails="false"
                                v-slot="{
                                  classes,
                                  errors,
                                }"
                              >
                                <div class="control" :class="classes">
                                  <b-form-textarea
                                    v-model="ata.consideracoesFinais"
                                    name="consideracoesFinais"
                                    id="consideracoes Finais"
                                    placeholder="Digite as considerações finais da ata"
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
                    </b-tab>  

                    <b-tab title="Pauta">                       
                    </b-tab>   

                    <b-tab title="Upload">                       
                    </b-tab>   


                    </b-tabs>
                  </b-card>
                </b-col>
              </b-row>
            </div>
          </b-form>
        </modal-component>
      </ValidationObserver>
      <div>
        <tabela-component
          :listaObjetos="listaAta"
          :camposFormulario="camposAta"
          v-on:load="loadAta"
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
import {confirmDialogObject, showError, showSuccess } from "@/global";
import {ValidationObserver,ValidationProvider,extend,localize} from "vee-validate";
import pt from "vee-validate/dist/locale/pt_BR.json";
import * as rules from "vee-validate/dist/rules";
import { Datetime } from "vue-datetime";
import moment from "moment";
import PesquisaData from "../components/PesquisaData.vue";
//import TabelaSelecaoComponent from "../components/TabelaSelecaoComponent";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import ataService from "./service/AtaService";
import Ata from "./domain/Ata";

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize("pt_BR", pt);

library.add(faTimesCircle);

export default {
  name: "Ata",
  components: {
    PageTitleComum,
    ModalComponent,
    TabelaComponent,
    ValidationProvider,
    ValidationObserver,
    datetime: Datetime,
    //"tabela-selecao": TabelaSelecaoComponent,
    "pesquisa-data": PesquisaData,
    //"font-awesome-icon": FontAwesomeIcon
  },

  data: function() {
    return {
      cabecalho: "Atas",
      subTitulo: "Listas de atas",
      icon: "pe-7s-news-paper",
      idModal: "cadastrar-ata",
      tituloModal: "",
      ata: new Ata(),
      filtroDatas: {
        dataInicio: moment().format(), 
        dataFim: moment().add(7,"days").format()
      },
      listaAta: [],      
      camposAta: [
        {
          key: "data",
          label: "Data",
          formatter: (value) => {
            return moment(value).format("LL");
          },
          sortable: true,
        },
        { key: "consideracoesFinais", label: "Considerações Finais" },    
        { key: "actions", label: "Ações" }    
      ],
      context: null,
    };
  },

  methods: {
    limparFormulario: function() {
      this.ata = new Ata();
      this.$refs.form.reset();
    },

    recuperaNomeModal:function(){
     this.tituloModal = "Cadastro de Ata";
    },
    
    recuperarAtaData: function(dataInicio, dataFim) {
      ataService.buscarListaData(dataInicio, dataFim)
        .then((res) => {
          this.listaAta = res.data;
        })
        .catch(showError);
    },

    recuperaListaAta: function() {      
      ataService.buscaLista()
        .then(res => {
          this.listaAta = res.data;
        })
        .catch(showError);
    },

    cadastrarAta: function() {
      this.$refs.form.validate().then((sucesso) => {
        if (!sucesso) {
          showError("Realize o preenchimento de todos os campos obrigatórios");
        } else {
          if (!this.ata.id) {
            ataService.cadastroAta(this.ata)
              .then(() => {
                this.limparFormulario();
                this.recuperaListaAta();
                showSuccess();
              })
              .catch(showError);
          } else {
            ataService.atualizarAta(this.ata)
              .then(() => {
                showSuccess();
                this.limparFormulario();
                this.recuperaListaAta();
              })
              .catch(showError);
          }
        }
      });
    },

    delete: function(ata) {
      ataService.delete(ata.id)
        .then(() => {
          let index = this.listaAta.indexOf(ata);
          this.listaAta.splice(index, 1);
          showSuccess();
        })
        .catch(showError);
    },

    loadAta: function(ata) {
      //this.limparListaAta();            
      this.$bvModal.show(this.idModal);
      this.tituloModal = "Alteração de Ata";
      this.ata = { ...ata };
      this.ata.data = moment(ata.data).format();      
    },
    confirmModal: function(ata) {
      this.$bvModal
        .msgBoxConfirm(
          "Deseja realmente excluir a Ata: " + ata.consideracoesFinais + "?",
          confirmDialogObject
        )
        .then((value) => {
          if (value) this.delete(ata);
        })
        .catch(showError);
    },
  },
  mounted: function() {
    this.recuperaListaAta();
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

 &.btn-group button {
    background-color: #4CAF50; /* Green background */
    border: 1px solid green; /* Green border */
    color: white; /* White text */
    padding: 10px 24px; /* Some padding */
    cursor: pointer; /* Pointer/hand icon */
    float: left; /* Float the buttons side by side */
}
</style>
