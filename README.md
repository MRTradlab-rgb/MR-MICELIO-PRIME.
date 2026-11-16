# MR TradLab ZERO — Micélio Prime | Portal de pré-cadastro

Portal público estático, responsivo, com formulário integrado ao Supabase. O repositório contém somente a camada pública; não coloque aqui código proprietário dos agentes, credenciais privadas ou segredos.

## Estrutura
- `index.html` — página institucional e pré-cadastro
- `styles.css` — identidade visual responsiva
- `app.js` — envio do formulário ao Supabase
- `config.js` — URL e chave pública do projeto Supabase
- `supabase/schema.sql` — tabela e políticas de segurança
- `privacy.html` — aviso preliminar de privacidade

## Ativar o banco
1. Crie um projeto no Supabase.
2. Abra SQL Editor e execute todo o arquivo `supabase/schema.sql`.
3. Em Project Settings → API, copie Project URL e a chave publishable/anon.
4. Edite `config.js` e preencha `SUPABASE_URL` e `SUPABASE_ANON_KEY`.
5. Nunca use a chave `service_role` no navegador ou neste repositório.

RLS fica ativado. A política pública permite somente INSERT; não há leitura pública dos cadastros. O proprietário administra os registros pelo painel autenticado do Supabase. Não criar políticas públicas de leitura.

## Publicar gratuitamente
1. No GitHub, abra Settings → Pages.
2. Em Build and deployment, selecione GitHub Actions.
3. Aguarde o workflow "Deploy MR TradLab ZERO portal" terminar.
4. O endereço ficará no painel Settings → Pages (normalmente https://mrtradlab-rgb.github.io/MR-MICELIO-PRIME./).

## Antes de divulgar
- Preencher os dados reais do controlador e contato na Política de Privacidade.
- Confirmar que o projeto Supabase está configurado.
- Testar um cadastro real e confirmar a linha na tabela `preregistrations`.
- Testar duplicidade de e-mail/WhatsApp e a mensagem de erro.
- Verificar o site em celular e desktop.
- Não habilitar convites nem integração com agentes nesta fase.

O pré-cadastro não garante aprovação, acesso ao Micélio, remuneração, participação societária ou rentabilidade. O projeto está em fase de simulação e testes.
