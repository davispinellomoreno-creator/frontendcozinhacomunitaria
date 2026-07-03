🍲 Cozinha Solidária - Sistema de Gestão
📌 Sobre o Projeto
O Cozinha Solidária é um sistema web desenvolvido com o objetivo de organizações auxiliares não governamentais (ONGs) e projetos sociais na gestão de cozinhas comunitárias.

A aplicação busca otimizar o controle de estoque de alimentos, reduzir desperdícios e apoiar o planejamento de refeições, contribuindo para um maior impacto social.

🎯 Objetivo
Desenvolver uma solução tecnológica simples, acessível e eficiente para:

Controlar o estoque de alimentos
Monitorar datas de validade
Reduzir o desperdício
Auxiliar no planejamento de refeições
Melhorar a organização da cozinha comunitária
🧩 Funcionalidades
📦 Cadastro de alimentos
📋 Listagem de estoque
⚠️Alerta de validade próxima
❌ Identificação de alimentos vencidos
🍽️ Apoio ao planejamento de refeições
📊 Base para relatórios de impacto
🧠 Regras de negócio
Alimentos vencidos não podem ser utilizados
Itens próximos ao vencimento devem ter prioridade
Não é permitido usar mais do que está disponível em estoque
O sistema deve alertar sobre alimentos próximos da validade
Apenas alimentos válidos podem ser usados ​​no preparo
🛠️ Tecnologias Utilizadas
Backend
Java
Bota de mola
Front-end
HTML
CSS
Typescript
Vue.js
React.js
Banco de Dados
PostgreSQL
OBS: Utilizei o Banco de dados em memória H2 para testar se estava dando tudo certo
🚀 Como Executar o Projeto
🔧 Backend (Java)
Clonar o:
git clone https://github.com/seu-usuario/cozinha-solidaria.git
Acesse a pasta do backend:
cd backend
Execute o projeto:
./mvnw spring-boot:run
O servidor estará disponível em:
http://localhost:8080
🌐 Frontend
Acesse uma massa:
cd frontend
Abra o arquivo:
index.html
Ou utilize uma extensão como Live Server
🔗 Integração Frontend ↔ Backend
A comunicação é feita via API REST utilizando requisições HTTP:

GET /alimentos→ lista de alimentos
POST /alimentos→ cadastra alimento
📊 Resultados Esperados
Redução do desperdício de alimentos
Melhor controle de estoque
Aumento da eficiência da cozinha
Organização das doações
Maior impacto social
🌱 Impacto Social
Este projeto visa contribuir diretamente com:

Combate à fome
Apoio às comunidades vulneráveis
Fortalecimento de ONGs
Uso consciente de recursos
🔮 Melhores Futuras
Sistema de login (usuários e voluntários)
Painel com gráficos
Integração com notificações (ex: WhatsApp)
Aplicativo móvel
Sugestão automática de receitas
👨‍💻 Autor
Projeto desenvolvido para atividade de extensão acadêmica.

📄 Licença
Este projeto é de uso acadêmico e livre para fins educacionais.
