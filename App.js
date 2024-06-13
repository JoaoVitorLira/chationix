import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { bancoExterno } from './firebaseConnection';
import { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

export default function App() {

  const [nome, setNome] = useState('Carregando...');
  const [nome2, setNome2] = useState('');
  const [nome3, setNome3] = useState('');

  useEffect(() => {
    async function pegarDados() {

      const referencia = doc(bancoExterno, "aparelhos", "2")

      getDoc(referencia)
        .then((snap) => {
          setNome(snap.data()?.Fogão)

        })

        .catch((erro) => {
          console.log(erro)
        })

        onSnapshot(doc(bancoExterno,"aparelhos", "2"), (snap)=>{
          setNome2(snap.data()?.Geladeira)
        })

        onSnapshot(doc(bancoExterno,"aparelhos", "2"), (snap)=>{
          setNome3(snap.data()?.TV)
        })

    }
    pegarDados();

    

  }, [])


  return (
    <View style={styles.container}>
      <Text style={{fontSize:40,}}>Chationix:</Text>
      <Text style={{fontSize:25}}>Informação: {nome} </Text>
      <Text style={{fontSize:25}}>Informação 2: {nome2} </Text>
      <Text style={{fontSize:25}}>Informação 3: {nome3} </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
