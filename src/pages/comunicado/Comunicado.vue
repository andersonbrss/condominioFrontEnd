<template>
  <div class="app-container app-theme-white">
    <page-title-comum
      :nomeFuncionalidade="cabecalho"
      :subTituloFuncionalidade="subTitulo"
      :icon="icon"
      :idModal="idModal"
      v-on:configuraModal="limparListaPauta"
      
    />
    <!-- Component de pesquisa -->
    <pesquisa-data
      v-on:pesquisar="
        recuperarComunicadoData(filtroDatas.dataInicio, filtroDatas.dataFim)
      "
    >
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
          v-on:save="cadastrarComunicado"
          v-on:reset="limparFormulario"
        >
          <b-form>
            <div class="content">
              <b-row>
                <b-col md="12">
                  <b-card class="mb-3" no-body>
                    <b-tabs pills card>
                      <b-tab title="Comunicado" active>
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
                                  errors,
                                }"
                              >
                                <div class="control" :class="classes">
                                  <datetime
                                    v-model="comunicado.data"
                                    type="datetime"
                                    name="data"
                                    input-id="data"
                                    input-class="form-control"
                                    placeholder="Selecione a data e hora"
                                    value-zone="America/Sao_Paulo"
                                    :format="{
                                      weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
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
                              <label for="titulo">Titulo:</label>
                              <ValidationProvider
                                name="titulo"
                                rules="required|min:5|max:100"
                                :bails="false"
                                v-slot="{
                                  classes,
                                  errors,
                                }"
                              >
                                <div class="control" :class="classes">
                                  <b-form-input
                                    v-model="comunicado.titulo"
                                    name="titulo"
                                    id="titulo"
                                    placeholder="Digite o título"
                                    type="text"
                                    class="form-control"
                                    :minlength="5"
                                    :maxlength="100"
                                  />
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
                                  errors,
                                }"
                              >
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
                        <!-- esse component so seria exibido  caso seja vinculado um assunto de pauta -->
                        <div v-if="comunicado.pautaAssuntos">
                          <div class="form-row">
                            <div class="col-md-12">
                              <div class="position-relative form-group">
                                <label for="assuntosPauta">Assuntos Pauta:</label>
                                <b-form-textarea
                                  v-model="comunicado.pautaAssuntos.assuntos"
                                  name="assuntosPauta"
                                  id="assuntosPauta"                                  
                                  class="form-control"
                                  :minlength="5"
                                  :maxlength="1000"
                                  rows="4"
                                  max-rows="10"
                                  disabled
                                />
                              </div>
                            </div>
                          </div>

                <div v-if="comunicado.pautaAssuntos" align="right">
                  <b-button variant="warning" @click="retirarAssuntosComunicado">
                   <font-awesome-icon icon="times-circle" />
                  </b-button>          
                </div>
                        </div>
                      </b-tab>

                      <!-- Recupera Assuntos da Pauta -->
                      <b-tab title="Assuntos Pauta">
                        <pesquisa-data
                          v-on:pesquisar="recuperaPautas(filtroDatas.dataInicio,filtroDatas.dataFim)">
                          <div>
                            <div class="row">
                              <div class="col-md-6">
                                <h6>Data Inicio:</h6>
                                <datetime
                                  v-model="filtroDatasPauta.dataInicio"
                                  type="date"
                                  name="dataInicioPauta"
                                  input-id="dataInicioPauta"
                                  input-class="form-control"
                                  placeholder="Selecione a data e hora"
                                  value-zone="America/Sao_Paulo"
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
                                    v-model="filtroDatasPauta.dataFim"
                                    type="date"
                                    name="dataFimPauta"
                                    input-id="dataFimPauta"
                                    input-class="form-control"
                                    placeholder="Selecione a data e hora"
                                    value-zone="America/Sao_Paulo"
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


                  <br>
                        <tabela-selecao
                          :listaObjetos="listaPauta"
                          :camposFormulario="camposPauta"
                          v-on:select="recuperaIdPauta"
                           v-on:reset="retirarAssuntosComunicado"
                        />

                        <br />
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
import {confirmDialogObject, showError, showSuccess } from "@/global";
import {ValidationObserver,ValidationProvider,extend,localize} from "vee-validate";
import pt from "vee-validate/dist/locale/pt_BR.json";
import * as rules from "vee-validate/dist/rules";
import { Datetime } from "vue-datetime";
import moment from "moment";
import PesquisaData from "../components/PesquisaData.vue";
import TabelaSelecaoComponent from "../components/TabelaSelecaoComponent";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import ComunicadoService from "./service/ComunicadoService";
import Comunicado from "./domain/Comunicado";
import PautaService from "../pauta/service/PautaService";
import Pauta from "../pauta/domain/Pauta";

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize("pt_BR", pt);

library.add(faTimesCircle);

export default {
  name: "Comunicado",
  components: {
    PageTitleComum,
    ModalComponent,
    TabelaComponent,
    ValidationProvider,
    ValidationObserver,
    datetime: Datetime,
    "tabela-selecao": TabelaSelecaoComponent,
    "pesquisa-data": PesquisaData,
    "font-awesome-icon": FontAwesomeIcon
  },

  data: function() {
    return {
      cabecalho: "Comunicado",
      subTitulo: "Listas de comunicados",
      icon: "pe-7s-comment",
      idModal: "cadastrar-comunicado",
      tituloModal: "",
      comunicado: new Comunicado(),
      filtroDatas: {
        dataInicio: moment().format(), 
        dataFim: moment().add(7,"days").format()
      },
      listaComunicado: [],
      listaPauta: [],
      pauta: new Pauta(),
      filtroDatasPauta: {
        dataInicio: moment().format(), 
        dataFim: moment().add(7,"days").format()
      },
      camposPauta: [
        {
          key: "data",
          label: "Data",
          formatter: (value) => {
            return moment(value).format("LL");
          },
          sortable: true,
        },
        { key: "local", label: "Local" },
        { key: "assuntos", label: "Assunto(s)" },
        { key: "actions", label: "Ações" },
      ],
      camposComunicado: [
        {
          key: "data",
          label: "Data e Hora",
          formatter: (value) => {
            return moment(value).format("LLL");
          },
          sortable: true,
        },
        { key: "titulo", label: "Título" },
        { key: "descricao", label: "Descrição" },
        { key: "actions", label: "Ações" },
      ],
      context: null,
    };
  },

  methods: {
    limparFormulario: function() {
      this.comunicado = new Comunicado();
      this.$refs.form.reset();
    },

    limparListaPauta: function() {
      this.listaPauta = [];
      this.filtroDatas.dataInicio = moment().format();      
      this.filtroDatas.dataFim = moment().format();      
      this.tituloModal = "Cadastro de Comunicados";
    },

    retirarAssuntosComunicado: function(){
      this.comunicado.pautaAssuntos = '';
      showSuccess("O assunto de pauta foi desvinculado do comunicado");

    },

    recuperaPautas: function(dataInicio, dataFim) {
      PautaService.buscarPautaVinculoComunicado(dataInicio, dataFim)
        .then((res) => {
          this.listaPauta = res.data;
        })
        .catch(showError);
    },

    recuperarComunicadoData: function(dataInicio, dataFim) {
      ComunicadoService.buscarListaData(dataInicio, dataFim)
        .then((res) => {
          this.listaComunicado = res.data;
        })
        .catch(showError);
    },

    recuperaListaComunicado: function() {
      ComunicadoService.buscarLista()
        .then((res) => {
          this.listaComunicado = res.data;
        })
        .catch(showError);
    },

    cadastrarComunicado: function() {
      this.$refs.form.validate().then((sucesso) => {
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

    recuperaIdPauta: function(pauta) {
      this.comunicado.pautaAssuntos = { ...pauta };
      showSuccess("O assunto da pauta foi adicionado ao comunicado.");
    },

    loadComunicado: function(comunicado) {
      this.limparListaPauta();            
      this.$bvModal.show(this.idModal);
      this.tituloModal = "Alteração Comunicado";
      this.comunicado = { ...comunicado };
      this.comunicado.data = moment(comunicado.data).format();      
    },
    confirmModal: function(comunicado) {
      this.$bvModal
        .msgBoxConfirm(
          "Deseja realmente excluir o Comunicado: " + comunicado.titulo + "?",
          confirmDialogObject
        )
        .then((value) => {
          if (value) this.delete(comunicado);
        })
        .catch(showError);
    },
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

 &.btn-group button {
    background-color: #4CAF50; /* Green background */
    border: 1px solid green; /* Green border */
    color: white; /* White text */
    padding: 10px 24px; /* Some padding */
    cursor: pointer; /* Pointer/hand icon */
    float: left; /* Float the buttons side by side */
}
</style>
