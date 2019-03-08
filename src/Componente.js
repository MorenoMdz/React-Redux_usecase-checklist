import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import * as ExampleActions from './store/actions/exampleActions';
import { bindActionCreators } from 'redux';

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
      <button onClick={() => props.novoTexto('Novo texto vindo da Action')}>
        Adicionar texto
      </button>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    texto: state.primeiroReducer,
    objetos: state.segundoReducer,
  };
};

// const mapDispatchToProps = dispatch => ({
//   novoTexto: texto => dispatch({ type: 'ADD_TEXT', payload: { texto } }),
// });

const mapDispatchToProps = dispatch =>
  bindActionCreators(ExampleActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Componente);
