# React com Redux, a Checklist

Durante as aulas do bootcamp da RocketSeat que estou participando, lembrei de um livro que li a alguns meses, **The Checklist Manifesto**, em que são relatados casos onde o simples uso rotineiro de uma lista de ações a serem executadas resultou em ganhos significativos de performance, eficiência e segurânça, de pilotos a cirurgiões, ter uma ordem de coisas a serem feitas pode ajudar muito a garantir que o resultado seja o esperado.

Uma das partes mais difíceis, senão a mais difícil, para a maioria dos novatos em React é entender o manejo de **estado**, onde as informações relevantes a sua página ou aplicação estão armazenadas e como distrubuir para todos componentes que precisam de acesso.

Para isso a arquitetura **Flux**, através do **Redux**, centraliza todas as informações de **estado da aplicação em um Store**, e **todos os componentes que precisam ler, adicionar ou modificar uma informação do estado acessam o Store por meio de ações**. Uma ação tem acesso ao store através de um **Reducer**, sendo que uma aplicação pode conter diversos reducers, **cada um responsável por uma "parte" do estado**, um reducer para autenticação, outro para dados de postagens etc.

Essa relação, Estado <> Reducers <> Actions <> Componente é complexa de se entender no inicio, então segue uma checklist para ajudar na implementação do Redux em uma aplicação React.
<br>

---

### CheckList:

---

**TLDR**

- [ ] Instalar as dependências, react, react-redux etc;
- [ ] Criar a store em um arquivo "src/store/index.js";
- [ ] Em App.js envolver a aplicação com o `<Provider>` do react-redux passando a store criada;
- [ ] Crie a pasta "src/reducers/" onde ficarão os reducers que tem acesso ao store;
- [ ] Crie com um index.js em "src/reducers/index.js" que combinará todos reducers e importe os reducers criados;
- [ ] Mapeie os dados desejados do estado para as propriedades (**props**) do componente local com "**mapStateToProps**";
- [ ] Para o componente pode acessar o estado na store, conecte através do método **connect()** do react-redux, passando o mapeamento de "mapStateToProps";
- [ ] Para manipular o estado da store, envie ações, **actions**, que serão ouvidas pelo **reducer** baseado no **type** da ação passada, crie um arquivo em '/src/actions/' para cada ação desejada;
- [ ] No componente, importe as ações e mapeie as mesmas para as props do componentente via "**mapDispatchToProps**" usando o método **bindActionCreators()** do Redux, passando as **ações importadas**, e o **dispatch**;

<br>

---

### Caso de uso exemplo

---

- Instalar as dependências

```
yarn add redux react-redux
```

- Crie a Store, no "arquivo src/store/index.js" configurando o método do Redux **createStore()**

```javascript
import { createStore } from 'redux';

const store = createStore(
  // aqui serão passados os reducers da aplicação
  () => {}
);

export default store;
```

- No App.js da aplicação, crie uma tag que encapsula a aplicação usando o **Provider** do react-redux e passando a store criada:

```
import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

const App = () => (
  <Provider store={store}>
    <h1>Hello World!</h1>
  </Provider>
);

export default App;

```

- Crie uma pasta reducers dentro da store, nela ficarão todos reducers individuais:

```
const VALOR_INICIAL = [
  // aqui você inicia o estado com os valores padrões iniciais que precisar
];

export default function primeiroReducer(state = VALOR_INICIAL, action) {
  switch (action.type) {
    default:
      return state;
  }
}
```

- Crie na pasta "src/reducers" um index.js que será responsável por combinar todos reducers da aplicação:

```
import { combineReducers } from 'redux';

import primeiroReducer from './primeiroReducer';
//import segundoReducer from './segundoReducer';

export default combineReducers({
  primeiroReducer,
  //segundoReducer, etc
});
```

- No index da **store**, importe os reducers criados no combinador de reducers (src/reducers/index.js):

```
import { createStore } from 'redux';

import reducers from ' ./reducers';

const store = createStore(
  reducers
);

export default store;
```

- Para um componente pode acessar o estado na store, conecte através do método **connect()** do react-redux

```
import React from 'react';
import { connect } from 'react-redux';

const Componente = () => <h1>Hello World</h1>;

// Aqui você executa o método connect() passando o componente como argumento
export default connect()(Componente); //<<<
```

- Mapeie os dados desejados do estado para as propriedades (props) do componente local:

```
const mapStateToProps = state => {
  return {
    texto: state.primeiroReducer,
    // objetos: state.segundoReducer, etc
  };
};
```

- Acesse os dados vindos do store que agora estão nas propriedades do Componente:

```
<h1>Texto vindo do state na store: {props.texto} </h1>;
```

---

### Manipular o Estado na Store:

---

- Para manipular o estado da store, envie ações, **actions**, que serão ouvidas pelo **reducer** correto baseado no **type** da ação passada, crie um arquivo '/src/actions/novoTexto' contendo a action de exemplo:

```
export const novoTexto = text => ({
  type: 'ADD_TEXT',
  payload: { texto },
});
```

- Através do método **bindActionCreators()** do Redux, mapeie as ações criadas para ficarem disponíveis nos props do componente:

```
...
import * as ExampleActions from './store/actions/exampleActions';
import { bindActionCreators } from 'redux';

...

const mapDispatchToProps = dispatch =>
  bindActionCreators(ExampleActions, dispatch);
```

- Adicione um botão que cria uma nova entrada no estado:

```
 <button onClick={() => props.novoTexto('Novo texto vindo da Action')}>
    Adicionar texto
  </button>
```

---

### Exemplo com mais de um Reducer

---

- Adicione um segundo reducer:

```
const VALOR_INICIAL = [
  { id: 1, texto: 'Primeiro Objeto vindo do estado da store' },
  { id: 2, texto: 'Segundo Objeto vindo do estado da store' },
];

export default function segundoReducer(state = VALOR_INICIAL, action) {
  switch (action.type) {
    default:
      return state;
  }
}
```

- Adicione o segundo reducer ao combinador de reducers:

```
import { combineReducers } from 'redux';

import primeiroReducer from './primeiroReducer';
import segundoReducer from './segundoReducer'; // <<<

export default combineReducers({
  primeiroReducer,
  segundoReducer, // <<<
});
```

- Todos os dados de estado relacionados a esse reducer também estarão acessíveis pelo connect(), mapeie os dados do estado da store pro props do componente:

```
const mapStateToProps = state => {
  return {
    texto: state.primeiroReducer,
    objetos: state.segundoReducer, // <<<
  };
};
```

- Acesse os dados no componente usando a variável dentro dos props ("objetos") a qual o estado foi mapeado:

```
const Componente = props => {
  console.log(props);
  return (
    <Fragment>
      <h1>Texto vindo do state na store: {props.texto} </h1>;
      <ul>
        {props.objetos.map(obj => (
          <li key={obj.id}>
            Objeto de ID: {obj.id} || Texto: {obj.texto}
          </li>
        ))}
      </ul>
      ;
    </Fragment>
  );
};
```

---

### Detalhes

---

Movemos o estado da aplicação de dentro de um componente específico para um "depósito", **store**, onde ficará _qualquer estado que mais de um componente precisará ter acesso na aplicação_. Tendo um local onde todos componentes podem buscar e salvar as informações desejadas ajuda muito a distribuir a informação através da aplicação, evitando ter de passar cada parte do estado para cada componente, agilizando o desenvolvimento e manutenção do código do programa.

```
const store = createStore(reducers);
```

Para acessar ou manipular qualquer dado do estado no Store, precisamos passar **actions**, que **sempre contém um type** e um "pacote", **payload** que contém a informação a ser enviada para o estado dentro da store.

```
export const novoTexto = texto => ({
  type: 'ADD_TEXT',
  payload: { texto },
});
```

As **actions** são manejadas por redutores, **reducers** sendo um reducer responsável por uma parte do **store**, podendo usar um para controlar a parte de autenticação do estado, outro pra lista de produtos etc.

Quando uma ação é enviada pelo componente, **todos os reducers ouvem todas as actions**, mas cada **reducer** tem um tipo, **type** ({type:'ADD_TODO'} por exemplo), definido e a partir desse **type** que vem junto da ação o reducer pode filtrar e executar somente as ações relevantes a ele. Dentro de um switch no **reducer** conseguimos filtrar somente as suas ações:

```
export default function segundoReducer(state = VALOR_INICIAL, action) {
  switch (action.type) {
    case 'ADD_TEXT':
      return [...state, { id: id, texto: action.payload.texto }];
    default:
      return state;
  }
```

Portanto uma ação chamada a partir de um componente com `{type:'ADD_TEXT'}` será executada por esse reducer, mas uma outra ação chamanda com outro **type** seria ignorada por esse reducer, para isso devemos sempre o retorno padrão do switch `default: return state` para que o fluxo da aplicação continue e a ação siga para os próximos reducers.

_Um Reducer é sempre uma função, que recebe o estado atual do componente que o chamou e a ação contendo o que deve ser feito no estado._

Com toda estrutura pronta, a **store** que agora contém o estado, com **actions** que chamam os seus respectivos **reducers** para controlar o acesso ao estado, agora é preciso **conectar a aplicação ao store**.

Isso é feito através do métodos **connect()** do Redux, cada componente que precisa acessar o estado chama o método, especificando e mapeando os dados necessários para as propriedades do componente (**props**) através de um método comumente chamado de **mapStateToProps()**, e mapeando as ações através de um método **mapDispatchToProps()**. Agora o componente consegue tanto ler quanto manipular dados do estado da **store** através do seus **props**.

- **mapStateToProps**: mapeia os dados selecionados de dentro do estado para os **props** do Componente.

- **mapDispatchToProps**: mapeia para seus props as ações que o componente vai precisar usar.

Assim o componente tem acesso ao estado, podendo modificar e ler uma informação que agora está disponível no seu **props**:

```
<h1>{props.text}</h1>
```

Assim que algo for atualizado no estado dentro da store, o componente atualiza a visualização, mostrando os dados novos.

---

### TLDR

---

- O estado da aplicação fica no store criado pelo redux.
- O `<Provider>` do react-redux envolve a aplicação
- Para cada componente que precisa acessar o estado usamos o **connect()** e mapeamos os dados que queremos do estado aos props do componente.
- Para modificar o estado usamos **actions**, que são ouvidas por **reducers**, que acessam o estado na **store** e fazem as alterações solicitadas.
- Quando algo é alterado no estado o **React** atualiza a view.

---

### Fontes

---

[Redux](https://redux.js.org/basics/reducers)
[React-Redux](https://react-redux.js.org/api/provider)
[The Checklist Manifesto](https://www.audible.com/pd/The-Checklist-Manifesto-Audiobook/B0030ZYDD2)

[Bootcamp Rocketseat](https://rocketseat.com.br/bootcamp)
[Comunidade Rocketseat](https://rocketseat.com.br/comunidade)
