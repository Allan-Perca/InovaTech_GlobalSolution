import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert, Platform } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebaseConfig';

const SignupScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignup = async () => {
        if (name === '' || email === '' || password === '') {
            if (Platform.OS === 'web') {
                window.alert('Erro: Todos os campos são obrigatórios.');
            } else {
                Alert.alert('Erro', 'Todos os campos são obrigatórios.');
            }
            return;
        }

        if (!isValidEmail(email)) {
            if (Platform.OS === 'web') {
                window.alert('Erro: Email inválido.');
            } else {
                Alert.alert('Erro', 'Email inválido.');
            }
            return;
        }

        if (password.length < 8) {
            if (Platform.OS === 'web') {
                window.alert('Erro: A senha deve ter pelo menos 8 caracteres.');
            } else {
                Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres.');
            }
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Atualiza o perfil do usuário
            await updateProfile(user, {
                displayName: name,
            });

            // Salva dados adicionais no Firestore
            await setDoc(doc(db, 'users', user.uid), {
                name: name,
                email: email,
                uid: user.uid,
            });

            if (Platform.OS === 'web') {
                window.alert('Sucesso: Conta criada com sucesso! Faça Login.');
            } else {
                Alert.alert('Sucesso', 'Conta criada com sucesso! Faça Login.');
            }
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error during signup:', error);
            if (Platform.OS === 'web') {
                window.alert('Erro: ' + error.message);
            } else {
                Alert.alert('Erro', error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/backgroundAuthScreen.png')}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <Text style={styles.title}>Criar Conta</Text>
                <Text style={styles.subtitle}>Cadastre-se para continuar</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>NOME</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu nome"
                        placeholderTextColor="#fff"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
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
                <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
                    <Text style={styles.buttonText}>CADASTRAR</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginText}>Já tem uma conta? <Text style={styles.loginTextSpan}>Entrar</Text></Text>
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
        marginTop: '40%',
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
        justifyContent: 'center',
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
        marginTop: 'auto',
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

export default SignupScreen;