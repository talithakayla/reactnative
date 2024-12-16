import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button } from 'react-native';
import FormComponent from '../components/Form';
export default function LoginScreen() {
  return (
    <View >
      <Text>Ini Login</Text>
      <FormComponent state='login'></FormComponent>
    </View>
  )
}