import firebase from 'react-native-firebase';

import types from './types';

export const fetchAlunos = () => (dispatch) => {

  console.log('aqui')
    firebase
      .database()
      .ref('/pessoas')
      .once('value')
      .then(snap => {
        console.log(snap)
        var alunoArr = [];
        snap.forEach(snapChild => {
          var item = snapChild.val();
          item.key = snapChild.key;

          alunoArr.push(item);
        })

          dispatch(fetchAlunoFinished(alunoArr));
      });
  };

export const addAluno = (aluno) => async (dispatch) => {
  try{
    if(aluno.id != '') {
      await firebase
        .database()
        .ref('/pessoas')
        .push(aluno)
    } else {
      var item = aluno;
      delete item.id

      await firebase
        .database()
        .ref('/pessoas' + aluno.id)
        .set(item)
    }

      fetchAlunos();
  } catch (error) {
    console.log(error)
  }
}

const fetchAlunoFinished = alunos => ({
    type: types.FETCH_ALUNOS,
    alunos,
});