<template>
<div>
    <div class="h-100 bg-plum-plate bg-animation">
        <div class="d-flex h-100 justify-content-center align-items-center">
            <b-col md="8" class="mx-auto app-login-box">
                <div class="modal-dialog w-100 mx-auto">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="h5 modal-title text-center">
                                <h4 class="mt-2">
                                    <div>Bem vindo novamente:</div>
                                    <span>Por favor, entre com sua conta:</span>
                                </h4>
                            </div>
                            <b-form-group id="gpLogin" label-for="Login" description="O login de acesso e case sensitive.">
                                <b-form-input v-model="user.username" id="login" type="text" required placeholder="Entre com seu login...">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="gpSenha" label-for="Senha" description="Nunca compartilhe seus dados de acesso.">
                                <b-form-input v-model="user.password" id="senha" type="password" required placeholder="Entre com sua senha...">
                                </b-form-input>
                            </b-form-group>
                            
                        </div>
                        <div class="modal-footer clearfix">
                            <div class="float-left">
                                <a href="javascript:void(0);" class="btn-lg btn btn-link">Cancelar</a>
                            </div>
                            <div class="float-right">
                                <b-button @click="signin" variant="primary" size="lg">Login</b-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center text-white opacity-8 mt-3">
                    Zends &copy; condominio 2020
                </div>
            </b-col>
        </div>
    </div>
</div>
</template>

<script>
import { urlApi, showError, userKey } from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function() {
        return {
            user: {}
        }
    },
    methods: {
        signin: function() {
            let senha = (this.user.username.concat(this.user.password));
            this.user.password = senha;
            axios.post(`${urlApi}/authenticate`, this.user )
                .then( res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem( userKey, JSON.stringify( res.data ))
                    this.$router.push({ path: '/' })
                })
                .catch( e => {
                    showError(e)
                    this.user.password = ''
                })
        }
    },
    mounted() {
        localStorage.removeItem( userKey )
    }
}
</script>

