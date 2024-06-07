import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Platform, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../services/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); 
    const { currentUser } = useAuth();

    useEffect(() => {
        const tryAutoLogin = async () => {
            const savedEmail = await AsyncStorage.getItem('savedEmail');
            const savedPassword = await AsyncStorage.getItem('savedPassword');
            const savedRememberMe = await AsyncStorage.getItem('savedRememberMe');

            if (savedRememberMe === 'true' && savedEmail && savedPassword) {
                signInWithEmailAndPassword(auth, savedEmail, savedPassword)
                    .then((userCredential) => {
                        console.log("User signed in automatically:", userCredential.user);
                        navigation.replace('Home');
                    })
                    .catch((error) => {
                        console.error('Error during auto login:', error);
                    });
            }
        };

        tryAutoLogin();
    }, []);

    const handleLogin = () => {
        if (email === '' || password === '') {
            if (Platform.OS === 'web') {
                window.alert('Erro: Por favor, preencha todos os campos.');
            } else {
                Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            }
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("User signed in:", userCredential.user);
                if (rememberMe) {
                    AsyncStorage.setItem('savedEmail', email);
                    AsyncStorage.setItem('savedPassword', password);
                    AsyncStorage.setItem('savedRememberMe', rememberMe.toString());
                } else {
                    AsyncStorage.removeItem('savedEmail');
                    AsyncStorage.removeItem('savedPassword');
                    AsyncStorage.removeItem('savedRememberMe');
                }
                navigation.replace('Home');
            })
            .catch((error) => {
                if (Platform.OS === 'web') {
                    window.alert('Erro: Email ou senha incorretos. Por favor, tente novamente.');
                } else {
                    Alert.alert('Erro', 'Email ou senha incorretos. Por favor, tente novamente.');
                }
                console.error('Error during login:', error);
            });
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/backgroundAuthScreen.png')}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <Text style={styles.title}>Entrar</Text>
                <Text style={styles.subtitle}>Faça login para continuar</Text>
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
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>SENHA</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha"
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={styles.checkbox}
                        onPress={() => setRememberMe(!rememberMe)}
                    >
                        {rememberMe ? (
                            <Text style={styles.checkboxText}>✓</Text>
                        ) : null}
                    </TouchableOpacity>
                    <Text style={styles.checkboxText}>Manter conectado</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                        <Text style={styles.signupText}>Não tem uma conta? <Text style={styles.signupTextSpan}>Cadastre-se</Text></Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

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
    loginButton: {
        backgroundColor: 'transparent',
        borderColor: '#000',
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
    footer: {
        color: '#000',
        bottom: 10,
        alignSelf: 'center',
        marginTop: 'auto'
    },
    signupText: {
        color: '#FFF',
    },
    signupTextSpan: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#FF1723',
    },
    forgotPassword: {
        color: '#fff',
        marginTop: 10,
        textDecorationLine: 'underline',
        marginTop: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    checkbox: {
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 5,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxText: {
        color: '#fff',
    },
});

export default LoginScreen;