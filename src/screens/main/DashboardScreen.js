import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons'; // Adicione esta linha para importar ícones

const DashboardScreen = () => {
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
                    source={require('../../assets/images/backgroundAuthScreen.png')}
                    style={styles.imageBackground}
                    resizeMode="cover"
                >
                    <BlurView
                        intensity={50}
                        style={styles.absolute}
                        tint="default"
                    />
                    <View style={styles.blueBox}>
                        <Ionicons name="construct-outline" size={64} color="#fff" />
                        <Text style={styles.title}>Tela em Desenvolvimento</Text>
                        <Text style={styles.paragraph}>
                            Estamos trabalhando duro para trazer novos recursos para você. Por favor, volte mais tarde para ver as atualizações.{'\n'}
                            {'\n'}Aqui você irá poder acompanhar todo nosso progresso e ver todos os nossos serviços.
                        </Text>
                        <TouchableOpacity style={styles.button} onPress={() => console.log('Feedback clicked')}>
                            <Text style={styles.buttonText}>Enviar Feedback</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    blueBox: {
        backgroundColor: '#2B3354',
        padding: 30,
        borderRadius: 10,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    paragraph: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#F69E02',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default DashboardScreen;
