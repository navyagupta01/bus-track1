import AsyncStorage from '@react-native-async-storage/async-storage';

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    return true;
  } catch (error) {
    console.error('❌ Logout Error:', error);
    return false;
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error('❌ Get Token Error:', error);
    return null;
  }
};