<template>
    <b-modal :id="idModal" :title="tituloModal" hide-footer size="lg" @hidden="$emit( 'reset' )">
        <div class="main-card mb-3 card">
        <div class="card-body">
            <slot></slot>

            <b-button variant="primary" @click="$emit( 'save' )" > Gravar </b-button>
            <b-button class="ml-2" @click="$emit( 'reset' )"> Limpar </b-button>                  
        </div>
        </div>
    </b-modal>    
</template>

<script>

export default {
    name: 'ModalComponent',
         
    props: {
        
        idModal: {
            required: true,
            type: String
        },

        tituloModal: {
            required: true,
            type: String
        },
    }
}

</script>