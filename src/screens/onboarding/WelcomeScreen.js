import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useFont } from '../../context/FontContext';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const fontsLoaded = useFont();

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/backgroundWelcomeScreen.png')}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Text style={styles.title}>InovaX</Text>
                    <Text style={styles.subtitle}>Um oceano mais limpo começa aqui!</Text>
                    <Text style={styles.subtitle2}>Junte-se a nós e faça sua parte ainda hoje!</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.buttonText}>Comece Agora <Text style={styles.buttonArrow}>⟶</Text></Text>
                    </TouchableOpacity>
                    <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginText}>Já tem uma conta? <Text style={styles.loginTextSpan}>Entrar</Text></Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 62,
        fontFamily: 'Poppins-Regular',
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        textShadowColor: '#FF0000',
        textShadowOffset: { width: 2, height: -2 },
        textShadowRadius: 1,
    },
    subtitle: {
        fontSize: 45,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Bold',
        color: '#fff',
        textAlign: 'left',
        marginBottom: 40,
        textShadowColor: '#000',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 15,
    },
    subtitle2: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Bold',
        color: '#fff',
        textAlign: 'left',
        marginBottom: 40,
        textShadowColor: '#000',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 15,
    },
    button: {
        borderColor: '#000',
        borderWidth: 2,
        paddingVertical: 2,
        paddingHorizontal: 15,
        borderRadius: 30,
        marginBottom: 20,
        backgroundColor: 'transparent',
        alignSelf: 'flex-start',
        width: 300,
    },
    buttonText: {
        fontSize: 26,
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonArrow: {
        fontSize: 32,
        color: '#000',
        fontWeight: 'bold',
    },
    footer: {
        color: '#000',
        bottom: 10,
        alignSelf: 'center',
        marginTop: 'auto'
    },
    loginText: {
        color: '#FFF',
    },
    loginTextSpan: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#FF1723',
    },
});

export default WelcomeScreen;
