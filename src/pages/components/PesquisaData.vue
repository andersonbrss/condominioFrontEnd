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
                Pesquisar
              </b-button>
            </div>
          </div>
        </div>
      </div>    
  </div>
</template>

<script>
export default {
  name: "PesquisaPorData",
  props: ["dataInicio", "dataFim"]
};
</script>

<style>
</style>
