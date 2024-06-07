import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ImageBackground, Alert, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { auth, db } from '../../services/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { updateProfile, deleteUser } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

const ProfileScreen = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState(currentUser ? currentUser.displayName : '');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigation.replace('Login');
    } else {
      setDisplayName(currentUser.displayName);
    }
  }, [currentUser, navigation]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem('savedEmail');
      await AsyncStorage.removeItem('savedPassword');
      await AsyncStorage.removeItem('savedRememberMe');
      console.log("User signed out");
      navigation.replace('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const confirmDeleteAccount = () => {
    setIsModalVisible(true);
  };

  const handleDeleteAccount = async () => {
    if (currentUser) {
      try {
        await deleteUser(auth.currentUser);
        console.log("User account deleted");
        navigation.replace('Login');
      } catch (error) {
        console.error('Error deleting user account:', error);
        Alert.alert("Erro", "Não foi possível apagar a conta. Tente novamente mais tarde.");
      } finally {
        setIsModalVisible(false);
      }
    }
  };

  const handleUpdateName = async () => {
    if (currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName });
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, { displayName });
        console.log("User name updated");
        setCurrentUser({ ...currentUser, displayName });
        Alert.alert("Sucesso", "Nome atualizado com sucesso.");
      } catch (error) {
        console.error('Error updating user name:', error);
        Alert.alert("Erro", "Não foi possível atualizar o nome. Tente novamente mais tarde.");
      }
    }
  };

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
          <View style={styles.profileContainer}>
            <Text style={styles.profileTitle}>Meus dados</Text>
            <View style={styles.profileItem}>
              <MaterialIcon name="person" size={34} color="#000" style={styles.profileIcon} />
              <TextInput
                style={styles.profileText}
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="Nome"
                placeholderTextColor="#aaa"
              />
            </View>
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdateName}>
              <MaterialIcon name="update" size={20} color="#fff" />
              <Text style={styles.updateButtonText}>Atualizar Nome</Text>
            </TouchableOpacity>
            <View style={styles.profileItem}>
              <MaterialIcon name="email" size={34} color="#000" style={styles.profileIcon} />
              <TextInput
                style={styles.profileText}
                value={currentUser ? currentUser.email : ''}
                editable={false}
                placeholderTextColor="#aaa"
              />
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <MaterialIcon name="logout" size={20} color="#fff" />
              <Text style={styles.logoutButtonText}>Deslogar Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={confirmDeleteAccount}>
              <MaterialIcon name="delete" size={20} color="#fff" />
              <Text style={styles.deleteButtonText}>Apagar Conta</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={styles.modalMessage}>Você tem certeza que deseja apagar sua conta? Esta ação não pode ser desfeita.</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleDeleteAccount}>
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  profileContainer: {
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#181D32',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
  },
  profileTitle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    alignSelf: 'center'
  },
  profileIcon: {
    backgroundColor: '#343434',
    color: '#fff',
    padding: 10,
    margin: 10
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  profileText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
    flex: 1,
    paddingBottom: 5,
  },
  updateButton: {
    backgroundColor: 'trasparent',
    borderWidth: 2,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
  logoutButton: {
    backgroundColor: 'trasparent',
    borderWidth: 2,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 20,
    justifyContent: 'center'
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 20,
    justifyContent: 'center'
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#aaa',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
