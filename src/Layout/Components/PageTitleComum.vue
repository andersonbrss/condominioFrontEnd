<template>
    <div class="app-page-title">
        <div class="page-title-wrapper">
            <div class="page-title-heading">
                <div class="page-title-icon">
                    <i :class="icon"/>
                </div>
                <div>
                    {{ nomeFuncionalidade }} 
                    <div
                        class="page-title-subheading">
                        {{ subTituloFuncionalidade }} 
                    </div>
                </div>
            </div>
            <div class="page-title-actions">
                <b-button v-b-modal="idModal" class="btn-shadow d-inline-flex align-items-center btn btn-success"  @click="$emit( 'configuraModal' )">
                    <font-awesome-icon class="mr-2" icon="plus"/>
                    Novo
                </b-button>
               
            </div>
        </div>

        <slot></slot>

    </div>
</template>

<script>
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faStar,
        faPlus
    } from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(
        faStar,
        faPlus,
    );

    export default {
        components: {
            'font-awesome-icon': FontAwesomeIcon,
        },
        props: {           
            nomeFuncionalidade:{
            required: true,
            type: String
            },

            subTituloFuncionalidade:{
            required: true,
            type: String
            },

            idModal:{
            required: true,
            type: String
            },
            
            icon: String,
            
        },

        }
    
</script>
