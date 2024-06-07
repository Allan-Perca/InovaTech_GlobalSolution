# **API.md**
## Endpoints de Autenticação do Firebase
Este documento descreve os endpoints utilizados para autenticação no projeto Expo React Native utilizando Firebase.

###   1. Registro de Usuário
       Endpoint: https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
       Método: POST
       Descrição: Registra um novo usuário com email e senha.

       > Exemplo de Requisição:
           {
           "email": "usuario@example.com",
           "password": "senhaSuperSecreta",
           "returnSecureToken": true
           }

       > Exemplo de Resposta:
           {
           "idToken": "ID_TOKEN",
           "email": "usuario@example.com",
           "refreshToken": "REFRESH_TOKEN",
           "expiresIn": "3600",
           "localId": "LOCAL_ID"
           }

###   2. Login de Usuário
       Endpoint: https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
       Método: GET
       Descrição: Faz login de um usuário com email e senha.

       > Exemplo de Requisição:
           {
           "email": "usuario@example.com",
           "password": "senhaSuperSecreta",
           "returnSecureToken": true
           }
    
       > Exemplo de Resposta:
           {
           "idToken": "ID_TOKEN",
           "email": "usuario@example.com",
           "refreshToken": "REFRESH_TOKEN",
           "expiresIn": "3600",
           "localId": "LOCAL_ID",
           "registered": true
           }

 ###  3. Reset de Senha
        Endpoint: https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=[API_KEY]
        Método: PUT
        Descrição: Envia um email para redefinição de senha.

       > Exemplo de Requisição:
           {
           "requestType": "PASSWORD_RESET",
           "email": "usuario@example.com"
           }
    
       > Exemplo de Resposta:
           {
           "email": "usuario@example.com"
           }

###   4. Atualização de Perfil
       Endpoint: https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]
       Método: PATCH
       Descrição: Atualiza o perfil do usuário, como email ou senha.

       > Exemplo de Requisição:
           {
           "idToken": "ID_TOKEN",
           "email": "novoEmail@example.com",
           "password": "novaSenhaSuperSecreta",
           "returnSecureToken": true
           }
       
       > Exemplo de Resposta:
           {
           "idToken": "ID_TOKEN",
           "email": "novoEmail@example.com",
           "refreshToken": "REFRESH_TOKEN",
           "expiresIn": "3600",
           "localId": "LOCAL_ID"
           }

###   5. Verificação de Token
       Endpoint: https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]
       Método: POST
       Descrição: Verifica o token de ID do usuário para validar sua autenticidade.

       > Exemplo de Requisição:
           {
           "idToken": "ID_TOKEN"
           }

       > Exemplo de Resposta:
           {
           "users": [{
               "localId": "LOCAL_ID",
               "email": "usuario@example.com",
               "emailVerified": true,
               "passwordHash": "HASH_DA_SENHA",
               "passwordUpdatedAt": 1600000000000,
               "validSince": "1600000000",
               "lastLoginAt": "1600000000000",
               "createdAt": "1600000000000",
               "lastRefreshAt": "2020-01-01T00:00:00.000Z"
               }]
           }

###   6. Exclusão de Usuário
        Endpoint: https://identitytoolkit.googleapis.com/v1/accounts:delete?key=[API_KEY]
        Método: DELETE
        Descrição: Exclui a conta de um usuário autenticado utilizando o token de ID.

        > Exemplo de Requisição:
        {
        "idToken": "ID_TOKEN"
        }

        > Exemplo de Resposta:
        {
        "kind": "identitytoolkit#DeleteAccountResponse"
        }