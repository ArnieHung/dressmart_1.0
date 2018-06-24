import React, { Component } from 'react';
import { AsyncStorage, Button, View, Text, ScrollView, CameraRoll, Image, StyleSheet, AppRegistry, TextInput, Alert,TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { ButtonGroup, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import axios from 'axios';
import t from 'tcomb-form-native';
import { Main_page } from './components/Main.js';
import {signup} from './api/api.js';

const Form = t.form.Form;
const UserAccount='';
const User = t.struct({
  account: t.String,
  email: t.String,
  password: t.String,
  terms: t.Boolean
});

const styles = StyleSheet.create({
  page: {
    justifyContent: 'flex-start',
    backgroundColor: '#F3E6E7',
  },
  container: {
    justifyContent: 'flex-start',
    padding: 80,
    backgroundColor: '#F3E6E7',
  },
  input:{
    margin: 10,
    padding: 10,

    backgroundColor: '#CCCCFF',

  },
  text:{
    fontSize: 20,
    color: 'black'
  },
  textinput:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  button:{
    margin: 10,
    padding: 10,

    backgroundColor: '#CCCCFF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


class HomeScreen extends React.Component {
  handleLogin = () => {
    // login
    const email = this._form.getValue();
    const password = this._form.getValue();
    const url = 'http://192.168.249.2:8080/token';
    alert(email);

    axios.post(url, {
      email: email,
      password: password
    }, )
      .then((res) => {
        // Handle the JWT response here
        alert("inin!!");
        const token = res.data.JWT;
        async () => {
          try {
            await AsyncStorage.setItem('token', token);
          } catch (error) {
            // Error saving data
            alert("save token error");
          }
        }
      })
      .catch((error) => {
        // Handle returned errors here
        //alert("get token error");
      });
  }
  render() {
    return (
      <View style={styles.page}>
        <View>
          <Image
            source={require('./imgs/dressmart.png')}

            style={{ height: 60, width: 360 }}
          />
        </View>
        <View style={styles.container}>
            <Form
              type={User}
              inputStyle={styles.input}
              ref={c => this._form = c}
            />
            <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                <Text style={styles.buttonText}> Login </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SigninScreen')}>
                <Text style={styles.buttonText}> Sign Up </Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class SigninScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
      account: "",
      email: "",
      password: "",
  };

  handleaccountChange = (account) => {
     this.setState({ account });
  };
  handleEmailChange = (email) => {
     this.setState({ email });
  };
  handlepasswordChange = (password) => {
     this.setState({ password });
  };

  handleSignup = () => {
    signup(this.state.account,this.state.email,this.state.password).then(info =>{
        const {account} = info;
        if(account){
          alert("OK");
          UserAccount = account;
          this.props.navigation.navigate('MainScreen');
        }else{
          alert('Error!!')
        }
    })

  };

  render() {
    return (
      <View style={styles.container}>
        <View>
        <Text>Account</Text>
        <TextInput style={styles.textinput} value={this.state.account} onChangeText={this.handleaccountChange}/>
        <Text>Email</Text>
        <TextInput style={styles.textinput} value={this.state.email} onChangeText={this.handleEmailChange}/>
        <Text>Password</Text>
        <TextInput style={styles.textinput} value={this.state.password} onChangeText={this.handlepasswordChange}/>

        </View>
        <TouchableOpacity style={styles.button}  onPress={this.handleSignup}>
            <Text style={styles.buttonText}> Create </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('MainScreen')}>
            <Text style={styles.buttonText}> Skip </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class MainScreen extends React.Component {
  render() {
    return (
      <Main_page />
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerBackTitle: null,
        header: null
      }),
    },
    SigninScreen: {
      screen: SigninScreen,
      navigationOptions: () => ({
        headerBackTitle: null,
        header: null
      }),
    },
    MainScreen: {
      screen: MainScreen,
      navigationOptions: () => ({
        headerBackTitle: null,
        header: null
      }),
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
