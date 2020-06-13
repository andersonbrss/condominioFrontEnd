<template> 
  <div class="app-container app-theme-white">
    <page-title-comum
      :nomeFuncionalidade="cabecalho"
      :subTituloFuncionalidade="subTitulo"
      :icon="icon"
      :idModal="idModal"/>

<div>
      <modal-component
        :idModal="idModal"
        :tituloModal="tituloModal"
        v-on:save="cadastrarArquivos"
        v-on:reset="limparFormulario">

         <b-form>
            <b-form-file             
            placeholder="Selecione ou arraste os arquivos"
            accept=".jpg, .png, .pdf "
            browse-text="Selecione o(s) arquivo(s)"
            drop-placeholder="Arraste e solte arquivo(s)"                                    
            v-model="arquivo.arquivo"  
            ></b-form-file>
        </b-form>    
      </modal-component>
    <div>
    
    </div>
  </div>
  </div>
</template>

<script>
import PageTitleComum from "../../Layout/Components/PageTitleComum.vue";
import ModalComponent from "../components/ModalComponent.vue";
import {confirmDialogObject,showError,showSuccess} from "@/global";
import {extend,localize} from "vee-validate";
import pt from "vee-validate/dist/locale/pt_BR.json";
import * as rules from "vee-validate/dist/rules";
import moment from 'moment';


import UploadService from "./service/UploadService";
import Upload from "./domain/Upload";

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("pt_BR", pt);

export default {
  name: "Upload",
  components: {
    PageTitleComum,
    ModalComponent    
  },

  data: function() {
    return {      
      cabecalho: "Upload",
      subTitulo: "Listas de arquivos",
      icon: "pe-7s-note2",
      idModal: "cadastrar-arquivos",
      tituloModal: "Cadastro de Arquivos",
      arquivo: new Upload(),     
      listaArquivo: [],
      camposArquivo: [
        {
          key: "data",
          label: "Data",
          formatter: value => {
            return moment(value).format('DD/MM/YYYY');
          },
          sortable: true
        },
        { key: "local", label: "Local" },
        { key: "assuntos", label: "Assunto(s)" },
        { key: "actions", label: "Ações" }
      ],
      value: "",
      context: null,
      
      
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: []
    };
  },

  methods: {
    onContext(ctx) {
      this.context = ctx;
    },
    limparFormulario: function() {
      this.arquivo = new Upload();
      //this.$refs.form.reset();
    },   
    cadastrarArquivos: function() {         
            UploadService.cadastroArquivo(this.arquivo)
              .then(() => {
                this.limparFormulario();
                //this.recuperaListaPauta();                
                showSuccess();
              })
              .catch(showError);
          },

    delete: function(arquivo) {
      UploadService.delete(arquivo.id)
        .then(() => {
          let index = this.listaArquivo.indexOf(arquivo);
          this.listaArquivo.splice(index, 1);
          showSuccess();
        })
        .catch(showError);
    },

    loadArquivo: function() {    
      // this.$bvModal.show(this.idModal);      
      // this.arquivo = { ...arquivo };
    },
    confirmModal: function(arquivo) {
      this.$bvModal
        .msgBoxConfirm(
          "Deseja realmente excluir a Pauta do dia: " +         + "?"
            ,
          confirmDialogObject
        )
        .then(value => {
          if (value) this.delete(arquivo);
        })
        .catch(showError);
    }
  },
  mounted: function() {
    //this.recuperaListaArquivo();
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
