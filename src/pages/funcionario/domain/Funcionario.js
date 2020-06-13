export default class Funcionario{
    constructor(data='',nome='',cpf='',telefone='',sexo='',email='',rg='',rgEmissor='',rgEmissorEstado='',rgEmissorData='',escolaridade='',
    estadoCivil='',pisPasep='' ,reservista='',tituloEleitor='',tituloEleitorZona='',tituloEleitorSecao='',
    carteiraTrabalhoNo='',carteiraTrabalhoSerie='',carteiraTrabalhoUf='',carteiraTrabalhoEmissorData='',
    endereco='',enderecoNo='',enderecoCep='',enderecoBairro='',enderecoCidade='',enderecoEstado='',
    dependente='',parentesco='',dependenteDataNascimento='') {
        this.data = data;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.sexo = sexo;
        this.email = email;
        this.rg = rg;
        this.rgEmissor = rgEmissor; 
        this.rgEmissorEstado = rgEmissorEstado;
        this.rgEmissorData = rgEmissorData;
        this.escolaridade = escolaridade;
        this.estadoCivil = estadoCivil;
        this.pisPasep = pisPasep;
        this.reservista = reservista;
        this.tituloEleitor = tituloEleitor;
        this.tituloEleitorZona = tituloEleitorZona;
        this.carteiraTrabalhoNo = carteiraTrabalhoNo;
        this.carteiraTrabalhoSerie = carteiraTrabalhoSerie;
        this.carteiraTrabalhoUf = carteiraTrabalhoUf;
        this.carteiraTrabalhoEmissorData = carteiraTrabalhoEmissorData;
        this.endereco = endereco;
        this.enderecoNo = enderecoNo;
        this.enderecoCep = enderecoCep;
        this.enderecoBairro = enderecoCep.localidade; //enderecoCep.localidade
        this.enderecoCidade = enderecoCidade;
        this.enderecoEstado = enderecoEstado;
        this.dependente = dependente;
        this.parentesco = parentesco;
        this.dependenteDataNascimento = dependenteDataNascimento;
        
    }
}
