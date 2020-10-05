# Recuperação de senha

**RF**

- O usuário deverá poder recuperar sua senha informando o seu e-mail;
- O usuário deverá receber um e-mail com instruções de recuoeração de senha;
- O usuário deverá poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envio de e-mail em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mail deverá acontecer em segundo plano (background job);

**RN**

- O link enviado por e-mail para resetar senha, deverá expirar em 2h;
- O usuário precisara confirmar a nova senha ao efetuar a recuperação de senha;

# Atualização do perfil

**RF**

- O usuário deverá atualizar o seu nome, e-mail e senha;

**RNF**

**RN**

- O usuário não poderá alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deverá informar a senha antiga;
- Para atualizar sua senha, o usuário precisara confirmar a nova senha;

# Painel do prestador

**RF**

- O usuário deverá poder listar seus agendamentos de um dia específico;
- O prestador deverá receber uma notificação sempre que houver um novo agendamento;
- O prestador deverá poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia, deverão se rarmazenados no cache;
- As notificações do prestador deverão ser armazenadas no MongoDB;
- As notificações do prestador deverão ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deverá ter um status de lida ou não lida, para o controle do prestador;

# Agendamento de serviços

**RF**

- O usuário deverá poder listar todos os prestadores de serviços cadastrado;
- O usuário poder listar os dias de um mês com pelo menus um horário disponível de um prestador;
- O usuário deverá poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deverá poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deverá ser armazenada em cache;

**RN**

- Cada agendamento deverá durar 1h exatamente;
- Os agendamentos deverá estar disponíveis entre 8h ás 18h, (Primeiro às 8h e último às 17h);
- O usuário não deverá agendar em um horário já ocupado;
- O usuário não poderá agendar em um horário que já passou;
- O usuário não poderá agendar serviços para consigo mesmo;
