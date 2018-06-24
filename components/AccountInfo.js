import React, { Component } from 'react';
import { TouchableOpacity,StyleSheet,AppRegistry, Text, TextInput, View,Button,Alert,Image, AsyncStorage} from 'react-native';
import { ButtonGroup } from 'react-native-elements';

const styles = StyleSheet.create({
    allpage:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 40
    },
    label:{
      flex: 1,
      backgroundColor:'gray'
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
    },
  });

export  class AccountInfo extends Component {
    constructor(props) {
      super(props);
    }

    state = {
        account: "a",
        Mail: "a@gmail.com",
        Ages: '3',
        gender: 'Male',
        introduction: 'Hi!'
    };
    data = {
        account: "a",
        Mail: "a@gmail.com",
        Ages: '3',
        gender: 'Male',
        introduction: 'Hi!'
    };

    handleaccountChange = (account) => {
       this.setState({ account });
    };
    handleMailChange = (Mail) => {
       this.setState({ Mail });
    };
    handleAgesChange = (Ages) => {
       this.setState({ Ages });
    };
    handleGenderChange = (gender) => {
       this.setState({ gender });
    };
    handleIntroChange = (introduction) => {
       this.setState({ introduction });
    };

    Submit = (state) => {
        this.data = this.state;
    };

    render() {
      return (
        <View style={styles.allpage} >
          <View style={styles.account}>
            <Text style={styles.text}>Account</Text>
            <TextInput style={styles.textinput} value={this.state.account} onChangeText={this.handleaccountChange}/>
          </View>

          <View style={styles.mail}>
            <Text style={styles.text}>Mail</Text>
            <TextInput style={styles.textinput} value={this.state.Mail} onChangeText={this.handleMailChange}/>
          </View>

          <View style={styles.ages}>
            <Text style={styles.text}>Ages</Text>
            <TextInput style={styles.textinput} value={this.state.Ages} onChangeText={this.handleAgesChange}/>
          </View>

          <View style={styles.gender}>
            <Text style={styles.text}>gender</Text>
            <TextInput style={styles.textinput} value={this.state.gender} onChangeText={this.handleGenderChange}/>
          </View>

          <View style={styles.introduction}>
            <Text style={styles.text}>introduction</Text>
            <TextInput style={styles.textinput} value={this.state.introduction} onChangeText={this.handleIntroChange}/>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.Submit}>
              <Text style={styles.buttonText}> Submit </Text>
          </TouchableOpacity>

        </View>
      );
    }
  }
