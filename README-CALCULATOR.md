
# Calculadora de Precificação TARS

Esta é uma aplicação web interativa que permite calcular automaticamente o investimento necessário para projetos de consultoria com base em parâmetros como nicho, objetivo, nível de IA e módulos com diferentes complexidades.

## Funcionalidades

- Formulário para informações do cliente (nome e empresa)
- Seleção de nicho do projeto (Clínicas, Consultórios, E-commerce, etc.)
- Definição do objetivo da automação (Aumentar Vendas, Reduzir Custos, etc.)
- Escolha do nível de IA (Simples, Intermediária, Complexa)
- Seleção de módulos com definição da complexidade (Fácil, Normal, Complexo)
- Cálculo automático do investimento total
- Geração de escopo detalhado com todos os itens selecionados

## Tecnologias Utilizadas

- React.js com TypeScript
- Tailwind CSS para estilização
- React Router para navegação
- Lucide React para ícones

## Como Testar

### Desktop
1. Acesse a aplicação através do navegador
2. Preencha os campos de nome do cliente e empresa
3. Selecione um nicho de projeto, objetivo e nível de IA
4. Escolha os módulos desejados e defina a complexidade de cada um
5. Clique em "Gerar Escopo e Preço" para ver o resultado

### Mobile
1. Acesse a aplicação em um dispositivo móvel ou utilize o modo de visualização móvel do navegador
2. A interface se adaptará automaticamente ao tamanho da tela
3. Siga os mesmos passos do desktop para testar a funcionalidade

## Estrutura do Projeto

- `src/components/PricingCalculator.tsx`: Componente principal da calculadora
- `src/components/SelectableCard.tsx`: Componente para cards selecionáveis
- `src/components/ComplexitySelector.tsx`: Componente para seleção de complexidade
- `src/types/calculator.ts`: Tipos, dados e função de cálculo
- `src/pages/Index.tsx`: Página principal que renderiza a calculadora

## Lógica de Cálculo

O cálculo do investimento total é feito da seguinte forma:
1. Valor base do nível de IA selecionado
2. Para cada módulo selecionado: preço base × multiplicador de complexidade
   - Fácil: multiplicador 1.0
   - Normal: multiplicador 1.3
   - Complexo: multiplicador 1.6
3. Soma de todos os valores para obter o investimento total

## Personalizações Possíveis

- Adicionar novos nichos ou objetivos em `src/types/calculator.ts`
- Modificar preços base dos módulos ou níveis de IA
- Ajustar multiplicadores de complexidade
- Alterar cores e estilos no arquivo `src/index.css`
