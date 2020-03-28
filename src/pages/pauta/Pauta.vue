<template>
  <div class="app-container app-theme-white">
    <page-title-comum
      :nomeFuncionalidade="cabecalho"
      :subTituloFuncionalidade="subTitulo"
      :icon="icon"
      :idModal="idModal"/>

    <ValidationObserver ref="form">
      <modal-component
        :idModal="idModal"
        :tituloModal="tituloModalCadastro"
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
                    <b-form-datepicker  
                         class="form-control"
                         v-model="pauta.data"                          
                         id="data" 
                         name="data"
                         locale="pt-BR" 
                         placeholder="Selecione a data" 
                         hide-header
                         label-help="Selecione uma data"
                         calendar-width="350px"                           
                         >
                    </b-form-datepicker>
                    <span id="error">{{ errors[0] }}</span>
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
                <label for="assunto">Assunto(s):</label>

                <ValidationProvider
                  name="assuntos"
                  rules="required|min:5|max:250"
                  :bails="false"
                  v-slot="{
                    classes,
                    errors
                  }">

                  <div class="control" :class="classes">
                    <b-form-textarea
                      v-model="pauta.assunto"
                      name="assunto"
                      id="assunto"
                      placeholder="Digite o assunto(s) da pauta"                      
                      class="form-control"
                      :minlength="5"
                      :maxlength="250"
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
    <tabela-component
      :listaObjetos="listaPauta"
      :camposFormulario="camposPauta"
      v-on:load="loadPauta"
      v-on:delete="confirmModal"
    />
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
  },

  data: function() {
    return {      
      cabecalho: "Pauta",
      subTitulo: "Listas de pautas",
      icon: "pe-7s-wallet icon-gradient bg-plum-plate",
      idModal: "cadastrar-pauta",
      tituloModalCadastro: "Cadastro de Pautas",
      pauta: new Pauta(),
      listaPauta: [],
      camposPauta: [
        {
          key: "data",
          label: "Data",
          formatter: value => {
            return new Date(value).toLocaleString().substr(0, 10);
          },
          sortable: true
        },
        { key: "local", label: "Local" },
        { key: "assunto", label: "Assunto(s)" },
        { key: "actions", label: "Ações" }
      ],
      value: "",
      context: null
    };
  },

  methods: {
    onContext(ctx) {
      this.context = ctx;
    },
    limparFormulario: function() {
      this.pauta = new Pauta();
      this.$refs.form.reset();
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
          showError("Realize o preenchimento de todos os campos obrigatórios.");
        } else {
          if (!this.pauta.id) {
            PautaService.cadastroPauta(this.pauta)
              .then(() => {
                this.limparFormulario();
                this.recuperaListaPauta();
                showSuccess("Pauta cadastrada com sucesso!");
              })
              .catch(showError);
          } else {
            PautaService.atualizarPauta(this.pauta)
              .then(() => {
                showSuccess("Pauta atualizada com sucesso!");
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
          showSuccess("Pauta excluida com sucesso!");
        })
        .catch(showError);
    },

    loadPauta: function(pauta) {
      this.$bvModal.show(this.idModal);      
      this.pauta = { ...pauta };
    },
    confirmModal: function(pauta) {
      this.$bvModal
        .msgBoxConfirm(
          "Deseja realmente excluir a Pauta do dia: " +
            new Date(pauta.data).toLocaleString().substr(0, 10),
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
