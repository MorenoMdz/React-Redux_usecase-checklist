const VALOR_INICIAL = [
  { id: 1, texto: 'Primeiro Objeto vindo do estado da store' },
  { id: 2, texto: 'Segundo Objeto vindo do estado da store' },
];

export default function segundoReducer(state = VALOR_INICIAL, action) {
  switch (action.type) {
    case 'ADD_TEXT':
      return [...state, { id: Math.random(), texto: action.payload.texto }];
    default:
      return state;
  }
}
