<template>
  <div>
      <div class="content">
        <div class="main-card mb-3 card">
          <div class="card-body">
            <h5 class="card-title">Realizar Pesquisa:</h5>
           <slot></slot>
            <div>
            <br>
              <b-button variant="primary" @click="$emit('pesquisar')">
                <font-awesome-icon icon="search" /> Pesquisar
              </b-button>
            </div>
          </div>
        </div>
      </div>    
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSearch);
export default {
  name: "PesquisaPorData",
    components: {
    "font-awesome-icon": FontAwesomeIcon
  },
  props: ["dataInicio", "dataFim"]
};
</script>

<style>
</style>
