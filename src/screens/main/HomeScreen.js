import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const { currentUser } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!currentUser) {
      navigation.replace('Login');
    }
  }, [currentUser, navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ImageBackground
          source={require('../../assets/images/background.png')}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <BlurView
            intensity={50}
            style={styles.absolute}
            tint="default"
          />
          <Image source={require('../../assets/images/PolutInfoPic.png')} style={styles.firstImage} />
          <View style={styles.blueBox}>
            <Text style={styles.paragraph}>
              Você sabia que mesmo onde não podemos enxergar também tem lixo e poluição?{'\n'}
              Sim, abaixo da superficie do mar também encontramos detritos, eles flutuam e se acumulam no fundo do mar!{'\n'}
              {'\n'}Nossos pequenos drones aquaticos com garras inovam a coleta de lixo alcançando locais de dificil acesso.{'\n'}
            </Text>
            <View style={styles.innerContainer}>
              <Image source={require('../../assets/images/droneInfoPic.png')} style={styles.innerImage} />
              <Text style={styles.paragraph}>
                Pelo uso de tecnologia autonoma o sistema pode operar de forma continua, minimizando o impacto ambiental da poluição e aumentando a eficiencia da limpeza urbarana.{'\n'}
              </Text>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{'\n'}Descubra todas as possibilidades e contribua hoje para um amanhã melhor!</Text>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Contrate Agora clicked')}>
                  <Text style={styles.buttonText}>Contrate Agora</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  firstImage: {
    width: '90%',
    height: 500,
    resizeMode: 'contain',
    marginTop: 5
  },
  blueBox: {
    width: '90%',
    backgroundColor: '#2B3354',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  paragraph: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  innerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  innerImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#F69E02',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default HomeScreen;
