import Vue from 'vue'

export const userKey = 'ZendsCodominioUser'
export const urlApi = 'http://localhost:8080/condominio/api'

export function showError( e ) {
    if( e && e.response && e.response.data ) {
        Vue.toasted.global.defaultError({ msg: e.response.data.message })
    } else if( typeof e === 'string' ) {
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export function showSuccess( e ) {
    if( e && e.data ) {
        Vue.toasted.global.defaultSuccess({ msg: e.data })
    } else if( typeof e === 'string' ) {
        Vue.toasted.global.defaultSuccess({ msg: e })
    } else {
        Vue.toasted.global.defaultSuccess()
    }
}

export const confirmDialogObject = {
    title: 'Por favor confirme',
    size: 'sm',
    buttonSize: 'sm',
    okVariant: 'danger',
    okTitle: 'Sim',
    cancelTitle: 'Não',
    footerClass: 'p-2',
    hideHeaderClose: false
}

export const calendarConfigFormt = {
    locale: 'pt-br',
    useCurrent: false
}