import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, TextInput, View, Button, Alert, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import {
    Ionicons,
    MaterialIcons,
    Foundation,
    MaterialCommunityIcons,
    Octicons
} from '@expo/vector-icons';

const styles = StyleSheet.create({
    allpage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 40
    },
    image:{

    },
    text:{

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

export class Post extends Component {
    state = {
        image: null,
        inputValue: "You can change me!",
        takephoto: null,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        ratio: '16:9',
    };
    constructor(props) {
        super(props);
    }
    _handleTextChange = inputValue => {
        this.setState({
            inputValue: inputValue
        });
    };
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        console.log(result);
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };
    _takephoto = () =>{
        this.setState({ takephoto: true });
    }

    getRatios = async () => {
        if (Platform.OS === 'android' && this.camera) {
            const ratios = await this.cam.getSupportedRatiosAsync();
            this.setState({ratio: ratios});
        }
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    takePicture = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            this.setState({ image: photo.uri , takephoto: null});
            alert(this.state.image);
        }
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (this.state.takephoto === null) {
            return (
                <View style={styles.allpage}>
                    {this.state.image &&
                        <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
                    <Button
                        title="Press to take photo"
                        onPress={this._takephoto}
                    />
                    <Text>Your Question !!</Text>
                    <TextInput
                        value={this.state.inputValue}
                        onChangeText={this._handleTextChange}
                        style={{ width: 200, height: 44, padding: 8 }}
                    />
                    <Button
                        title="Pick an image from camera roll"
                        onPress={this._pickImage}
                    />
                </View>
            );
        } else if(this.state.takephoto === true){
            if (hasCameraPermission === null) {
                return <View />;
            } else if (hasCameraPermission === false) {
                return <Text>No access to camera</Text>;
            } else {
                return (
                    <View style={{ flex: 1 }}>
                        <Camera
                            ref={ref => {
                                this.camera = ref;
                            }}
                            style={{ flex: 1 }}
                            type={this.state.type}
                            ratio={this.state.ratio}
                            >
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row',
                                }}>
                                <TouchableOpacity
                                    style={{
                                        flex: 0.4,
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back,
                                        });
                                    }}>
                                    <Text
                                        style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                        {' '}Flip{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.4 }}>
                                <TouchableOpacity
                                    onPress={this.takePicture}
                                    style={{ alignSelf: 'center' }}
                                >
                                    <Ionicons name="ios-radio-button-on" size={70} color="white" />
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    </View>
                );
            }
        }
    }
}
