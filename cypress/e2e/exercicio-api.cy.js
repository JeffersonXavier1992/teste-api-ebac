/// <reference types="cypress" />


describe('Testes da Funcionalidade Usuários', () => {

    let token
    beforeEach(() => {
    cy.token('fulanodasilva33@qa.com', 'teste').then(tkn => {
      token = tkn
    })
  });

  it('Deve validar contrato de usuários', () => {        
    cy.request('usuarios').then(response => {
      expect(response.status).to.equal(200) 
    })           
  });

  it('Deve listar usuários cadastrados', () => { 
    cy.request({
      method: 'GET',
      url: 'usuarios'
  }).then((response) => {    
    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('usuarios')    
  })

  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let usuário = 'Jefferson EBAC ' + Math.floor(Math.random() * 10000)
    let email = 'fulanodasilva' + Math.floor(Math.random() * 10000) + '@qa.com'
    cy.cadastrarUsuario(usuário, email, 'teste', 'true')
    cy.request({
      method: 'POST',
      url: 'usuarios',  
      body: {
        "nome": usuário,
        "email": email,
        "password": "teste",
        "administrador": "true"
      },
     }).then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
  })
  
  });

  it('Deve validar um usuário com email inválido', () => {
    let usuario = 'Jefferson EBAC' + Math.floor(Math.random() * 10000)
    let email = 'fulanodasilva' + Math.floor(Math.random() * 10000)
    cy.cadastrarUsuario(usuario, email, 'teste', 'true')
    .then((response) => {
    expect(response.body.email).to.equal('email deve ser um email válido')  
  })

  });

  it('Deve editar um usuário previamente cadastrado', () => { 
    let usuário = 'Jefferson EBAC  ' + Math.floor(Math.random() * 100000) 
    let email = 'fulanodasilva' + Math.floor(Math.random() * 10000) + '@qa.com'    
    cy.cadastrarUsuario(token, usuário, email, 'teste', 'true')
      .then(response => {
        let id = response.body_id
          cy.request({
        method: 'PUT', 
        url: `usuarios/${id}`,
        headers: {authorization: token},
        body: {
          "nome": usuário,
          "email": email,
          "password": "teste",
          "administrador": "true"
        }          
      }).should((response) => {
        expect(response.body.message).to.equal('Registro alterado com sucesso')
            })

      })
        
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    let usuário = `Jefferson EBAC ${Math.floor(Math.random() * 1000)}`
        cy.cadastrarProduto(token, usuário, )
        .then(response => {
            let id = response.body._id
            cy.request({
                method: 'DELETE',
                url: `produtos/${id}`,
                headers: {authorization: token}     
             })     
      
      })
  });
})
