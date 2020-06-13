<template> 
  <div class="app-container app-theme-white">
    <page-title-comum
      :nomeFuncionalidade="cabecalho"
      :subTituloFuncionalidade="subTitulo"
      :icon="icon"
      :idModal="idModal"/>





<div>
    <ValidationObserver ref="form">
      <modal-component
        :idModal="idModal"
        :tituloModal="tituloModal"
        v-on:save="cadastrarFuncionario"
        v-on:reset="limparFormulario">

        <b-form>


<div>


    <div class="content">
        <b-row>
          
          
          <b-col md="12">
            <b-card class="mb-3 nav-justified" no-body>
              <b-tabs pills card>
                <b-tab title="Dados Básicos" active>

          <div class="form-row">


            <div class="col-md-8">
              <div class="position-relative form-group">
                <label for="nome">Nome:</label>
                <ValidationProvider name="nome" rules="required|min:5|max:100" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <b-form-input v-model="funcionario.nome" name="nome" id="nome" placeholder="Ex: André Porcaria" type="text" class="form-control" :minlength="5" :maxlength="100"/>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>

            <div class="col-md-4">
              <div class="position-relative form-group">
                <label for="funcionario.data">Data de Nascimento:</label>
                <ValidationProvider name="data" rules="required" :bails="false" v-slot="{ classes, errors}">

                 <div class="control" :class="classes">                  
                       <datetime v-model="funcionario.data" type="date" name="funcionario.data" input-id="funcionario.data" input-class="form-control" placeholder="Selecione a data" value-zone="America/Sao_Paulo"                               
                        :format="{year: 'numeric', month: 'long', day: 'numeric'}">
                    </datetime>
                    <span id="error">{{ errors[1] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>	

          </div>


          <div class="form-row">

            <div class="col-md-3">
              <div class="position-relative form-group">
                <label for="cpf">CPF:</label>
                <ValidationProvider name="cpf" rules="required|min:11|max:11" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <the-mask :mask="['###.###.###-##']" v-model="funcionario.cpf"  name="cpf" id="cpf"  placeholder="000.000.000-00" type="text" class="form-control" :minlength="14" :maxlength="14" />
                    
                    <span id="error">{{ errors[0] }}</span>
                    
                  </div>
                </ValidationProvider>
              </div>
            </div>



            <div class="col-md-3">
              <div class="position-relative form-group">
                <label for="telefone">(DDD) + Telefone:</label>
                <ValidationProvider name="telefone" rules="required|min:1|max:11" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <the-mask :mask="['(##) # ####-####']" v-model="funcionario.telefone"  name="telefone" id="telefone"  placeholder="(00) 0 0000-0000" type="text" class="form-control" :minlength="1" :maxlength="16" />
                    
                    <span id="error">{{ errors[0] }}</span>
                    
                  </div>
                </ValidationProvider>
              </div>
            </div>
          

            <div class="col-md-3">
              <div class="position-relative form-group">
                <label for="sexo">Sexo:</label>
                <ValidationProvider name="sexo"  :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                          <select v-model="selected" required name="sexo" id="sexo" class="form-control">
                                
                                <option value="">Selecione</option>
                                <option value="masculino">Masculino</option>
                                <option>Feminino</option>

                          </select>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>


          </div>


          <div class="form-row">
            <div class="col-md-8">
              <div class="position-relative form-group">
                <label for="email">Email:</label>
                <ValidationProvider name="Email" rules="required" :bails="false" v-slot="{ classes, errors}">

                 <div class="control" :class="[classes, emailValido()]">                  
                   <input type="email" v-model="funcionario.email" name="email" id="email" placeholder=" email@mail.com " class="form-control" :minlength="2" :maxlength="50"/>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>	


          </div>

          
                
                </b-tab>

                 <b-tab title="Dados Gerais">


        <div class="form-row">



          
            <div class="col-md-6">
              <div class="position-relative form-group">
                <label for="escolaridade">Escolaridade:</label>
                <ValidationProvider name="escolaridade"  :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                          <select v-model="funcionario.escolaridade" name="escolaridade" id="escolaridade" placeholder="Selecione" class="form-control">
                                <option value="">Selecione</option>
                                <option>Fundamental Incompleto</option>
                                <option>Fundamental Completo</option>
                                <option>Médio Incompleto</option>
                                <option>Médio Completo</option>
                                <option>Superior Incompleto</option>
                                <option>Superior Completo</option>

                    </select>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>

          



            <div class="col-md-6">
              <div class="position-relative form-group">
                <label for="estadoCivil">Estado Civil:</label>
                <ValidationProvider name="estado Civil"  :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                          <select v-model="funcionario.estadoCivil" name="estadoCivil" id="estadoCivil" placeholder="Selecione" class="form-control">
                                <option value="">Selecione</option>
                                <option>Solteiro</option>
                                <option>Casado</option>
                                <option>Separado</option>
                                <option>Divorciado</option>
                                <option>Viúvo</option>

                    </select>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>



          </div>










         <div class="form-row">



<!--DADOS RG-->


            <div class="col-md-3">
              <div class="position-relative form-group">
                <label for="rg">RG:</label>
                <ValidationProvider name="rg" rules="required|min:7|max:18" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <the-mask :mask="['#.###.###' , '##.###.###' , '###.###.###', '#.###.###.###', '##.###.###.###', '###.###.###.###', '#.###.###.###.###', '##.###.###.###.###']" 
                    v-model="funcionario.rg"  name="rg" id="rg"  placeholder="0.000.000" type="text" class="form-control" :minlength="7" :maxlength="18" />
                    
                    <span id="error">{{ errors[0] }}</span>
                    
                  </div>
                </ValidationProvider>
              </div>
            </div>
          


          
            <div class="col-md-3">
              <div class="position-relative form-group">
                <label for="nome">Emissor:</label>
                <ValidationProvider name="emissor" rules="required|min:2|max:7" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <b-form-input v-model="funcionario.rgEmissor" name="rgEmissor" id="rgEmissor" placeholder="Ex: SSP" type="text" class="form-control" :minlength="2" :maxlength="10"/>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>


            <div class="col-md-3">
              <div class="position-relative form-group">
                <label for="nome">Estado:</label>
                <ValidationProvider name="estado" rules="required|min:2|max:2" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                          <select v-model="funcionario.rgEmissorEstado" name="rgEmissorEstado" id="rgEmissorEstado" placeholder="Selecione" class="form-control">
                                <option value="">Selecione</option>
                                <option>AC</option>
                                <option>AL</option>
                                <option>AP</option>
                                <option>AM</option>
                                <option>BA</option>
                                <option>CE</option>
                                <option>DF</option>
                                <option>ES</option>
                                <option>GO</option>
                                <option>MA</option>
                                <option>MT</option>
                                <option>MS</option>
                                <option>MG</option>
                                <option>PA</option>
                                <option>PB</option>
                                <option>PR</option>
                                <option>PI</option>
                                <option>RJ</option>
                                <option>RN</option>
                                <option>RS</option>
                                <option>RO</option>
                                <option>RR</option>
                                <option>SC</option>
                                <option>SP</option>
                                <option>SE</option>
                                <option>TO</option>

                    </select>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>


            <div class="col-md-3">
              <div class="position-relative form-group">
                <label for="rgEmissorData">Data Emissão:</label>
                <ValidationProvider name="data emissão" rules="required" :bails="false" v-slot="{ classes, errors}">

                 <div class="control" :class="classes">                  
                       <datetime v-model="funcionario.rgEmissorData" type="date" name="rgEmissorData" input-id="rgEmissorData" input-class="form-control" placeholder="Selecione a data" value-zone="America/Sao_Paulo"                               
                        :format="{year: 'numeric', month: 'long', day: 'numeric'}">
                    </datetime>
                    <span id="error">{{ errors[1] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>	


          </div>

<!--CARTEIRA DE TRABALHO-->

          <div class="form-row">


            <div class="col-md-3">
              <div class="position-relative form-group">
                <label for="carteiraTrabalhoNo">Carteira de Trabalho Nº:</label>
                <ValidationProvider name="carteira de trabalho nº" rules="required|min:4|max:8" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <the-mask :mask="['#####']" v-model="funcionario.carteiraTrabalhoNo"  name="carteiraTrabalhoNo" id="carteiraTrabalhoNo"  placeholder="00.000" type="text" class="form-control" :minlength="14" :maxlength="14" />
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>

            <div class="col-md-3">
              <div class="position-relative form-group">
                <label for="série">Série:</label>
                <ValidationProvider name="série" rules="required|min:1|max:5" :bails="false" v-slot="{ classes, errors}">

                                   
                   <div class="control" :class="classes">
                    <the-mask :mask="['#####']" v-model="funcionario.carteiraTrabalhoSerie"  name="carteiraTrabalhoSerie" id="carteiraTrabalhoSerie"  placeholder="00" type="text" class="form-control" :minlength="14" :maxlength="14" />
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>	

            <div class="col-md-3">
              <div class="position-relative form-group">
                <label for="UF">UF:</label>
                <ValidationProvider name="uf" rules="required" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                          <select v-model="funcionario.carteiraTrabalhoUf" name="carteiraTrabalhoUf" id="carteiraTrabalhoUf" placeholder="Selecione" class="form-control">
                                <option value="">Selecione</option>
                                <option>AC</option>
                                <option>AL</option>
                                <option>AP</option>
                                <option>AM</option>
                                <option>BA</option>
                                <option>CE</option>
                                <option>DF</option>
                                <option>ES</option>
                                <option>GO</option>
                                <option>MA</option>
                                <option>MT</option>
                                <option>MS</option>
                                <option>MG</option>
                                <option>PA</option>
                                <option>PB</option>
                                <option>PR</option>
                                <option>PI</option>
                                <option>RJ</option>
                                <option>RN</option>
                                <option>RS</option>
                                <option>RO</option>
                                <option>RR</option>
                                <option>SC</option>
                                <option>SP</option>
                                <option>SE</option>
                                <option>TO</option>

                    </select>

                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>	

            <div class="col-md-3">
              <div class="position-relative form-group">
                <label for="carteiraTrabalhoEmissorData">Data Emissão:</label>
                <ValidationProvider name="data emissão" rules="required" :bails="false" v-slot="{ classes, errors}">

                 <div class="control" :class="classes">                  
                       <datetime v-model="funcionario.carteiraTrabalhoEmissorData" type="date" name="carteiraTrabalhoEmissorData" input-id="carteiraTrabalhoEmissorData" input-class="form-control" placeholder="Selecione a data" value-zone="America/Sao_Paulo"                               
                        :format="{year: 'numeric', month: 'long', day: 'numeric'}">
                    </datetime>
                    <span id="error">{{ errors[1] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>	

          </div>

          <div class="form-row">

            <div class="col-md-5">
              <div class="position-relative form-group">
                <label for="pisPasep">Pis/Pasep:</label>
                <ValidationProvider name="pis/pasep" rules="required|min:11|max:14" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <the-mask :mask="['###.#####.##-#']" v-model="funcionario.pisPasep"  name="pisPasep" id="pisPasep"  placeholder="000.00000.00-0" type="text" class="form-control" :minlength="11" :maxlength="14" />
                    
                    <span id="error">{{ errors[0] }}</span>
                    
                  </div>
                </ValidationProvider>
              </div>
            </div>
          


          </div>








          <div class="form-row">

            <div class="col-md-4">
              <div class="position-relative form-group">
                <label for="tituloEleitor">Título de Eleitor:</label>
                <ValidationProvider name="título de eleitor" rules="required|min:12|max:14" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <the-mask :mask="['#### #### ####']" v-model="funcionario.tituloEleitor"  name="tituloEleitor" id="tituloEleitor"  placeholder="0000 0000 0000" type="text" class="form-control" :minlength="12" :maxlength="14" />
                    
                    <span id="error">{{ errors[0] }}</span>
                    
                  </div>
                </ValidationProvider>
              </div>
            </div>
          

            <div class="col-md-2">
              <div class="position-relative form-group">
                <label for="tituloEleitorZona">Zona:</label>
                <ValidationProvider name="zona" rules="required|min:3|max:3" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <the-mask :mask="['###']" v-model="funcionario.tituloEleitorZona"  name="tituloEleitorZona" id="tituloEleitorZona"  placeholder="000" type="text" class="form-control" :minlength="3" :maxlength="3" />
                    
                    <span id="error">{{ errors[0] }}</span>
                    
                  </div>
                </ValidationProvider>
              </div>
            </div>


            <div class="col-md-2">
              <div class="position-relative form-group">
                <label for="tituloEleitorSecao">Seção:</label>
                <ValidationProvider name="seção" rules="required|min:4|max:4" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <the-mask :mask="['####']" v-model="funcionario.tituloEleitorSecao"  name="tituloEleitorSecao" id="tituloEleitorSecao"  placeholder="0000" type="text" class="form-control" :minlength="4" :maxlength="4" />
                    
                    <span id="error">{{ errors[0] }}</span>
                    
                  </div>
                </ValidationProvider>
              </div>
            </div>



          </div>



          <div class="form-row" >
            <div class="col-md-3"  v-if="selected === 'masculino'">
              <div class="position-relative form-group">
                <label for="reservista">Reservista:</label>
                <ValidationProvider name="reservista" rules="required|min:11|max:11" :bails="false" v-slot="{ classes, errors}">
                  <div class="control" :class="classes">
                    <the-mask :mask="['###.###.###-##']" v-model="funcionario.reservista" required name="reservista" id="reservista"  placeholder="000.000.000-00" type="text" class="form-control" :minlength="14" :maxlength="14" />                    
                    <span id="error">{{ errors[0] }}</span>                    
                  </div>
                </ValidationProvider>
              </div>
            </div>	


          </div>

                   
                </b-tab>               








                <b-tab title="Endereço">
<!--DADOS ENDEREÇO-->

           <div class="form-row">
          

             <div class="col-md-4">
              <div class="position-relative form-group">
                <label for="enderecoCep">Cep:</label>
                <ValidationProvider name="cep" rules="required|min:8|max:9" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <the-mask :mask="['##.###-###']" v-model="funcionario.enderecoCep" @keyup.native="buscaCep()"  id="enderecoCep" placeholder="00.000-000" type="text" class="form-control"/>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div> 



            <div class="col-md-6">
              <div class="position-relative form-group">
                <label for="endereco">Endereço:</label>
                <ValidationProvider name="endereco" rules="required|min:5|max:100" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <b-form-input v-model="funcionario.endereco" name="endereco" id="endereco" placeholder="" type="text" class="form-control" :minlength="5" :maxlength="100"/>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>
          
             <div class="col-md-2">
              <div class="position-relative form-group">
                <label for="enderecoNo">Nº:</label>
                <ValidationProvider name="nº" rules="required|min:1|max:4" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <b-form-input v-model="funcionario.enderecoNo" name="enderecoNo" id="enderecoNo" placeholder="" type="text" class="form-control" :minlength="5" :maxlength="100"/>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>         

        
       
          
          </div>                 

           <div class="form-row">


             <div class="col-md-4">
              <div class="position-relative form-group">
                <label for="enderecoCidade">Bairro:</label>
                <ValidationProvider name="bairro" rules="required|min:5|max:100" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <b-form-input v-model="funcionario.enderecoBairro" name="enderecoBairro" id="enderecoBairro" placeholder="Digite o Bairro" type="text" class="form-control" :minlength="5" :maxlength="100"/>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>


          
             <div class="col-md-4">
              <div class="position-relative form-group">
                <label for="enderecoCidade">Cidade:</label>
                <ValidationProvider name="cidade" rules="required|min:5|max:100" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <b-form-input v-model="funcionario.enderecoCidade" name="enderecoCidade" id="enderecoCidade" placeholder="Digite a cidade" type="text" class="form-control" :minlength="5" :maxlength="100"/>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>         

             <div class="col-md-4">
              <div class="position-relative form-group">
                <label for="enderecoEstado">Estado:</label>
                <ValidationProvider name="estado" rules="required|min:2|max:2" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <b-form-input v-model="funcionario.enderecoEstado" name="enderecoEstado" id="enderecoEstado" placeholder="Digite o estado" type="text" class="form-control" :minlength="2" :maxlength="2"/>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>         
          
          
          
          </div>

          <div class="form-row">
          
          
            <div class="col-md-9">
              <div class="position-relative form-group">
                <label for="endereco">Complemento:</label>
                <ValidationProvider name="complemento" rules="required|min:5|max:100" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <b-form-input v-model="funcionario.enderecoComplemento
                    " name="enderecoComplemento" id="enderecoComplemento" placeholder="Digite o complemento" type="text" class="form-control" :minlength="5" :maxlength="100"/>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>

          </div>  
          
                  
                </b-tab>
                <b-tab title="Dependente">

<!--DADOS DEPEDENTES-->
         <div class="form-row">

            <div class="col-md-5">
              <div class="position-relative form-group">
                <label for="dependente">Dependente:</label>
                <ValidationProvider name="dependente" rules="required|min:2|max:20" :bails="false" v-slot="{ classes, errors}">

                  <div class="control" :class="classes">
                    <b-form-input v-model="funcionario.dependente" name="dependente" id="dependente" placeholder="Ex: Mobile" type="text" class="form-control" :minlength="2" :maxlength="20"/>
                    <span id="error">{{ errors[0] }}</span>
                    
                  </div>
                </ValidationProvider>
              </div>
            </div>
        



            <div class="col-md-3">
              <div class="position-relative form-group">
                <label for="parentesco">Parentesco:</label>
                <ValidationProvider name="parentesco"  :bails="false" v-slot="{ classes, errors}">
                  <div class="control" :class="classes">
                          <select placeholder="Selecione" v-model="funcionario.parentesco" name="parentesco" id="parentesco"  class="form-control">
                                <option value="">Selecione</option>                            
                                <option>Filho</option>
                                <option>Filha</option>
                                <option>Mãe</option>
                                <option>Pai</option>


                    </select>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>



            <div class="col-md-4">
              <div class="position-relative form-group">
                <label for="dependenteDataNascimento">Data Nascimento:</label>
                <ValidationProvider name="data" rules="required" :bails="false" v-slot="{ classes, errors}">

                 <div class="control" :class="classes">                  
                       <datetime v-model="funcionario.dependenteDataNascimento" type="date" name="dependenteDataNascimento" input-id="dependenteDataNascimento" input-class="form-control" placeholder="Selecione a data" value-zone="America/Sao_Paulo"                               
                        :format="{year: 'numeric', month: 'long', day: 'numeric'}">
                    </datetime>
                    <span id="error">{{ errors[1] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>	


          </div>

<!--
<select name="parent" class="form-control" v-model="selected" required>
      <option value="" selected></option>
      <option value="item1">Item 1</option>
      <option value="item2">Item 2</option>
</select>
<div>
   <input name="Test 1" v-show="selected"> //display when item 1 is selected
</div>
<div>
   <input name="Test 2" v-show="selected"> //display when item 2 is selected
</div>


      <div v-if="selected === 'item1'">
  item1 was selected
          </div>
        <div v-else>
  Something else was selected.
          </div>












          <div class="form-row">

            <div class="col-md-3">
              <div class="position-relative form-group">
                <label for="parentesco">Parentesco:</label>
                <ValidationProvider name="parentesco"  :bails="false" v-slot="{ classes, errors}">
                    <div class="control" :class="classes">

<select name="parent" class="form-control" v-model="selected" required>
      <option value="" selected></option>
      <option value="masculino">Item 1</option>
      <option value="item2">Item 2</option>
</select>

                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>
          </div>            



          <div class="form-row">

            <div class="col-md-3" v-if="selected === 'masculino'">
              <div class="position-relative form-group">
                <label for="parentesco">reservista::</label>
                <ValidationProvider name="parentesco"  :bails="false" v-slot="{ classes, errors}">
                    <div class="control" :class="classes">
                          <select class="form-control" name="make" id="make" v-model="make">
                            <option :value="null" disabled selected>Selecione</option>
                            <option v-for="option in makes_options" v-bind:value="option.id">{{option.text}}</option>
                          </select>
                    <span id="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>
          </div>  




<!--
<div class="col-xs-6" id="app">
  <h1>{{heading}}</h1>
  <div class="form-group">
    <label for="make">Make</label>
    <select class="form-control" name="make" id="make" v-model="make">
      <option :value="null" disabled selected>Select Make</option>
      <option v-for="option in makes_options" v-bind:value="option.id">{{option.text}}</option>
    </select>
  </div>
  
  
  
  <div class="form-group">
    <label for="model">Model</label>
    
    
    <select class="form-control" name="model" id="model" v-model="model">
      <option v-for="option in model_options[make]" v-bind:value="option.id" v-bind:key="option.id">
        
        {{option.text}}</option>
    </select>
  </div>
</div>











<!--
                <template v-for="variant in ['outline-primary']">
                  <b-dropdown no-flip :text="variant" class="mb-2 mr-2" :variant="variant">
                    <button type="button" tabindex="0" class="dropdown-item">Menus</button>
                    <button type="button" tabindex="0" class="dropdown-item">Settings</button>
                    <h6 tabindex="-1" class="dropdown-header">Header</h6>
                    <button type="button" tabindex="0" class="dropdown-item">Actions</button>
                    <div tabindex="-1" class="dropdown-divider"></div>
                    <button type="button" tabindex="0" class="dropdown-item">Dividers</button>
                  </b-dropdown>
                </template>

                   


                            <div class="position-relative form-group">
                            <label for="exampleSelect" class="">Select</label>
                            <select name="select" id="exampleSelect" class="form-control" >
                                <option>Masculino</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select></div>
-->
                   
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
          
        </b-row>
    </div>
  </div>

          
        </b-form>
      </modal-component>
    </ValidationObserver>
    <div>
    
    <tabela-component
      :listaObjetos="listaFuncionario"
      :camposFormulario="camposFuncionario"
      v-on:load="loadFuncionario"
      v-on:delete="confirmModal"     
    />
    
    </div>
  </div>
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
import {TheMask} from 'vue-the-mask';
import { Datetime } from 'vue-datetime';
import axios from 'axios';
import Cep from "./domain/Cep";



import FuncionarioService from "./service/FuncionarioService";
import Funcionario from "./domain/Funcionario";


Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("pt_BR", pt);

export default {
  name: "Funcionario",
  components: {
    PageTitleComum,
    ModalComponent,
    TabelaComponent,
    ValidationProvider,
    ValidationObserver,
    TheMask,
    datetime: Datetime
  
  },



  data: function() {
    return {
      email: '',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/, 
      cepConsulta : '',       
      cabecalho: "Funcionario",
      subTitulo: "Lista de Funcionarios",
      icon: "pe-7s-id icon-gradient bg-plum-plate",
      idModal: "cadastrar-funcionario",
      tituloModal: "Cadastro de Funcionarios",
      funcionario: new Funcionario(),
      selected: '',
      teste: '',
      make: null,
      model: null,
      makes_options: [
        {
          text: "Masculino",
          id: 1
        },
        {
          text: "Feminino",
          id: 2
        }

      ],
      model_options: '',



      filtroDatas:{dataInicio: new Date().toISOString().substring(0,10), dataFim: new Date().toISOString().substring(0,10)},
      listaFuncionario: [],
      camposFuncionario: [
        { key: "nome", label: "Nome" },

		{
          key: "cpf", label: "CPF"
        },

        { key: "telefone", label: "Telefone" },

        
        
        { key: "actions", label: "Ações" }
      ],
      value: "",
      context: null,
    };
  },

  methods: {


emailValido: function() {
      return (this.email == "")? "" : (this.reg.test(this.email)) ? 'has-success' : 'has-error';
    },

 
  
		buscaCep () {
			if(this.funcionario.enderecoCep.length == 8) {
				axios.get(`https://viacep.com.br/ws/${ this.funcionario.enderecoCep }/json/`)
				        .then((res) => { 
                this.cepConsulta = res.data;
                console.log(this.cepConsulta)
                if (this.cepConsulta.erro == true){
                  showError("CEP inválido");                      
                }else {
                  showSuccess("Dados do CEP incluído com sucesso")
                    this.funcionario.enderecoCep = this.cepConsulta.cep;
                    this.funcionario.endereco = this.cepConsulta.logradouro;
                   //this.funcionario.enderecoNo = this.cepConsulta.logradouro;
                   //this.funcionario.complemento = this.cepConsulta.complemento;
                    this.funcionario.enderecoBairro = this.cepConsulta.bairro;
                    this.funcionario.enderecoCidade = this.cepConsulta.localidade;
                    this.funcionario.enderecoEstado = this.cepConsulta.uf;                  
                }

        })
        
          .catch(showError)           
      }
    },
	

    onContext(ctx) {
      this.context = ctx;
    },
    limparFormulario: function() {
      this.cepConsulta = ''; 
      this.funcionario = new Funcionario();
      this.$refs.form.reset();
    },
    
  recuperarFuncionarioData: function(dataInicio, dataFim){
    this.$refs.form.validate()
    .then(sucesso =>{
      if(!sucesso){
        showError("Realize o preenchimento de todos os campos obrigatórios.");
      }
    })
      FuncionarioService.buscarListaData(dataInicio, dataFim)
      .then(res => {
        this.listaFuncionario = res.data;         
      }).catch(showError);
    },

    recuperaListaFuncionario: function() {
      FuncionarioService.buscaLista()
        .then(res => {
          this.listaFuncionario = res.data;
        })
        .catch(showError);
    },

    cadastrarFuncionario: function() {         
      this.$refs.form.validate().then(sucesso => {
        if (!sucesso) {
          showError("Realize o preenchimento de todos os campos obrigatórios");
        } else {
          if (!this.funcionario.id) {
            console.log(this.cepConsulta)
            console.log(this.funcionario)
            FuncionarioService.cadastroFuncionario(this.funcionario)
              .then(() => {
                this.limparFormulario();
                this.recuperaListaFuncionario();
                showSuccess();
              })
              .catch(showError);
          } else {
            FuncionarioService.atualizarFuncionario(this.funcionario)
              .then(() => {
                showSuccess();
                this.limparFormulario();
                this.recuperaListaFuncionario();                
              })
              .catch(showError);
          }
        }
      });
    },

    delete: function(funcionario) {
      FuncionarioService.delete(funcionario.id)
        .then(() => {
          let index = this.listaFuncionario.indexOf(funcionario);
          this.listaFuncionario.splice(index, 1);
          showSuccess();
        })
        .catch(showError);
    },

    loadFuncionario: function(funcionario) {          
      this.$bvModal.show(this.idModal);    
      this.funcionario = { ...funcionario };
      this.funcionario.data = new Date( funcionario.data );       
    },
    confirmModal: function(funcionario) {
      this.$bvModal
        .msgBoxConfirm(
          "Deseja realmente excluir a Funcionario: " +
            new Date(funcionario.data).toLocaleString().substr(0, 10) + "?"
            ,
          confirmDialogObject
        )
        .then(value => {
          if (value) this.delete(funcionario);
        })
        .catch(showError);
    }
  },
  mounted: function() {
    this.recuperaListaFuncionario();
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
