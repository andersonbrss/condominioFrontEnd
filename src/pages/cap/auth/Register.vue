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
                                    <div>Zends condominio:</div>
                                    <span>Por favor, entre com os dados da sua conta:</span>
                                </h4>
                            </div>
                            <b-form-group id="gpLogin" label-for="Login" description="O login de acesso e case sensitive.">
                                <b-form-input v-model="usuario.username" id="login" type="text" required placeholder="Entre com seu login...">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="gpSenha" label-for="Senha" description="Nunca compartilhe seus dados de acesso.">
                                <b-form-input v-model="usuario.senha" id="senha" type="password" required placeholder="Entre com sua senha...">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="gpNome" label-for="Nome" >
                                <b-form-input v-model="usuario.nome" id="nome" type="text" required placeholder="Entre com o nome do usuário...">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="gpEmail" label-for="Email">
                                <b-form-input v-model="usuario.email" id="email" type="email" placeholder="Entre com o e-mail do usuário">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="gpDominio" label-for="Dominio">
                                <b-form-select class="mb-2 form-control" id="dominio" name="dominio" :options="dominioList">
                                </b-form-select>
                            </b-form-group>
                        </div>
                        <div class="modal-footer clearfix">
                            <div class="float-left">
                                <a href="javascript:void(0);" class="btn-lg btn btn-link">Cancelar</a>
                            </div>
                            <div class="float-right">
                                <b-button @click="save" variant="primary" size="lg">Cadastrar</b-button>
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
import { showSuccess, showError } from '@/global'
import usuarioService from './service/UsuarioService'

export default {
    name:'auth-register',
    data: function() {
        return {
            usuario: {},
            dominioList: [
                { id: 1, text: 'teste' }
            ]
        }
    },
    methods: {
        reset: function() {
            this.usuario = {}
        },
        save: function() {
            usuarioService.save( this.usuario ).then( (e) => {
                this.reset()
                showSuccess(e)
            }).catch( showError )
        }
    }
}
</script>