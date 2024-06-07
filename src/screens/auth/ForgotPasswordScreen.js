import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Platform, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const handleSendPasswordResetEmail = () => {
        if (email === '') {
            if (Platform.OS === 'web') {
                window.alert('Por favor, insira seu email.');
            } else {
                Alert.alert('Erro', 'Por favor, insira seu email.');
            }
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                if (Platform.OS === 'web') {
                    window.alert('Um email de redefinição de senha foi enviado para o seu endereço de email.');
                } else {
                    Alert.alert('Sucesso', 'Um email de redefinição de senha foi enviado para o seu endereço de email.');
                }
                navigation.navigate('Login');
            })
            .catch((error) => {
                if (Platform.OS === 'web') {
                    window.alert('Ocorreu um erro ao enviar o email de redefinição de senha. Verifique seu endereço de email e tente novamente.');
                } else {
                    Alert.alert('Erro', 'Ocorreu um erro ao enviar o email de redefinição de senha. Verifique seu endereço de email e tente novamente.');
                }
                console.error('Error sending password reset email:', error);
            });
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/backgroundAuthScreen.png')}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <Text style={styles.title}>Esqueceu a senha?</Text>
                <Text style={styles.subtitle}>Digite seu email para redefinir sua senha</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>EMAIL</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu email"
                        placeholderTextColor="#fff"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleSendPasswordResetEmail}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginScreen}>Voltar para tela de login</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: '40%'
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 30,
    },
    inputContainer: {
        width: 300,
        marginBottom: 20,
    },
    inputLabel: {
        color: '#fff',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#000',
        borderRadius: 15,
        padding: 10,
        color: '#fff',
        height: 50,
        opacity: 0.7,
    },
    submitButton: {
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 15,
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
    },
    loginScreen: {
        color: '#fff',
        marginTop: 10,
        textDecorationLine: 'underline',
        marginTop: 20,
    },
});

export default ForgotPasswordScreen;