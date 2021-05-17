import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal'
    }
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions: status === "granted",
    });
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.state({
      scanned: true,
      scannedData: data,
      buttonState: 'normal'
    });
  }

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === "clicked" && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        />
      )
    }

    else if (buttonState === "normal") {
      return (
        <View style={styles.container}>
          <Image
            style={{ width: 50, height: 50, marginLeft: 200, marginTop: -55 }}
            source={require('../assets/barcode.jpg')}
          />

          <Text stle={styles.displayText}>{
            hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permission"
          }
          </Text>

          <TouchableOpacity
            onPress={this.getCameraPermissions}
            style={styles.scanButton}
            title="Bar Code Scanner">
            <Text style={styles.buttonText}>Scan QR Code</Text>

          </TouchableOpacity>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayText: {
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  scanButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10
  }
});