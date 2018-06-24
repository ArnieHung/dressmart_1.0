import React, { Component } from 'react';
import { TouchableOpacity,StyleSheet,AppRegistry, Text, TextInput, View,Button,Alert,Image, AsyncStorage} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

const styles = StyleSheet.create({
    allpage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    image:{
      width: 360,
      height: 360
    },
    page:{
      padding: 40,
    },
    text:{
      fontSize: 20,
      color: 'black'
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
export  class Reply extends Component {
    state = {
        pic: "!!",
        text: 'aaa  aaaa aa aaaaaaaa a a a a a aaaa',
    };

    constructor(props) {
      super(props);
    }

    _handleButtonPress = () => {
      Alert.alert(
        'Button pressed!',
        'You did it!',
      );
    };

    render() {
      return (
        <View style={styles.allpage}>
          <View>
            <Image
              source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/cat.gif' }}
              style={styles.image}
            />
          </View>

          <View style={styles.page}>
            <Text style={styles.text}> {this.state.text} </Text>

            <TouchableOpacity style={styles.button} onPress={this._handleButtonPress}>
                <Text style={styles.buttonText}> Reply </Text>
            </TouchableOpacity>

          </View>
        </View>
      );
    }
  }
