import React, { Component } from 'react';
import { StyleSheet,AppRegistry, Text, TextInput, View,Button,Alert,Image, AsyncStorage} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import {AccountInfo} from './AccountInfo.js';
import {Post} from './Post.js';
import {Reply} from './Reply.js';

const styles = StyleSheet.create({
  allpage:{
    flex: 1,
    flexDirection: 'column',
  },

  page:{
    flex: 1,
    justifyContent: 'flex-start',

    backgroundColor:'#F3E6E7'
  },
});

export class Main_page extends Component {

  state = {
    index: 0
  }
  constructor(props) {
    super(props);
  }

  updateIndex = (index) => {
    this.setState({index})
  }

  render() {
    return (
        <View style={styles.allpage}>
            <ButtonGroup
            style={styles.button}
                onPress={this.updateIndex}
                selectedIndex={this.state.index}
                buttons={['A','B','C']}
            />

            <View style={styles.page} >
                <Select state={this.state}/>
            </View>

         </View>
    );
  }
}


class Select extends Component {
  state = {
    index: 0
  }
  constructor(props) {
     super(props);
  }

  render() {
      this.state = this.props.state
      if(this.state.index === 0)
        return (
          <AccountInfo/>
        )
      else if (this.state.index === 1)
        return (
          <Text/>
        )
      else if (this.state.index === 2)
        return (
          <Reply/>
        )

  }
}
