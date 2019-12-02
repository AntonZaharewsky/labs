import React from 'react';
import {StyleSheet, TextInput, Text, View, TouchableOpacity, Switch, Button} from 'react-native';
import QRCode from 'react-native-qrcode';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class App extends React.Component {
    state = {
        text: 'http://facebook.github.io/react-native/',
        hasCameraPermission: null,
        scanned: false,
        isScanner: false
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const {
            status
        } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted'
        });

    };

    handleBarCodeScanned = ({type, data}) => {
        this.setState({
            scanned: true
        });
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    render() {
        const {
            hasCameraPermission,
            scanned
        } = this.state;

        if (hasCameraPermission === null) {
            return <Text> Requesting
                for camera permission </Text>;
        }

        if (hasCameraPermission === false) {
            return <Text> No access to camera </Text>;
        }
        return (
            <View style={styles.container}>
                <Switch onChange={() => this.setState({isScanner: !this.state.isScanner})} style={{marginTop: 50}}/>
                {this.state.isScanner ?
                        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} style={
                            // {position: 'relative', top: 40, left:0, right:0, bottom: 0}
                            {width: 300, height: 600}
                        }/>
                    :
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({text: text})}
                            value={this.state.text}
                        />
                        <QRCode
                            value={this.state.text}
                            size={200}
                            bgColor='purple'
                            fgColor='white'
                            style={{marginTop: 1000}}
                        />
                    </View>
                }
                {
                    scanned && (
                        <Button title={'Tap to Scan Again'} onPress={() => this.setState({scanned: false})}/>)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        zIndex: 999,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 50,
        borderRadius: 5,
        padding: 5,
    }
});
