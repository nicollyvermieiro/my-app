# 📌 Aplicação Dockerizada – Nicolly Vermieiro Ferreira  

Centro Universitário da Grande Dourados  
Curso de Engenharia de Software  
Prof.: André Martins  

---

## 📝 Descrição do Projeto
Este projeto foi desenvolvido como parte da **Primeira Prova Bimestral** da disciplina 
O objetivo é criar uma aplicação web simples que exibe a mensagem: Aplicação Dockerizada – Nicolly


A aplicação é executada dentro de um container Docker e conectada a um banco de dados via `docker-compose`.

---

## ⚙️ Tecnologias Utilizadas
- **Node.js** (aplicação web)  
- **Express** (servidor HTTP)  
- **PostgreSQL** (banco de dados)  
- **Docker** (containerização)  
- **Docker Compose** (orquestração de serviços)  

---

## ⚙️ Tecnologias Utilizadas
- **Node.js** (aplicação web)  
- **Express** (servidor HTTP)  
- **MySQL** (banco de dados)  
- **Docker** (containerização)  
- **Docker Compose** (orquestração de serviços)  

## 📦 Variáveis de Ambiente
As credenciais do banco de dados estão definidas no arquivo `.env`.  

## Como Executar o Projeto
1. Clonar o repositório;
2. . Criar o arquivo .env;
3. docker-compose up --build
4. Acessar a aplicação: Abra o navegador e acesse: 👉 http://localhost:3000

## 5. Testar conexão com o banco

A aplicação também exibe uma lista de usuários fictícios armazenados no banco MySQL.
Acesse o endpoint:
👉 http://localhost:3000/usuarios

## Publicação no Docker Hub

A imagem da aplicação foi publicada no Docker Hub:

🔗 Link da imagem: https://hub.docker.com/r/nicollyvermieiro/my-app:v1.0

Para baixar e executar a imagem diretamente:

1. docker pull nicollyvermieiro/my-app:v1.0
2. docker run -p 3000:3000 nicollyvermieiro/my-app:v1.0



## 👩‍💻 Desenvolvido por Nicolly Vermieiro Ferreira