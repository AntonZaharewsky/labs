import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo from 'expo';
import ExpoTHREE, { three } from 'expo-three';
import ExpoGraphics from 'expo-graphics';

export default class App extends React.Component {
  onContextCreate = async ({gl, scale, width, height, arSession}) => {
    // Initialize renderer…
    this.renderer = ExpoTHREE.createRenderer({gl});
    this.renderer = setPixelRatio(scale);
    this.renderer.setSize(width, height);

    // Initialize scene…
    this.scene = new THREE.Scene();
    this.scene.background =
        ExpoTHREE.createARBackgroundTexture(arSession, this.renderer);

    // Initialize camera…
    this.camera = ExpoTHREE.createARCamera(arSession, width / scale,
        height / scale, 0.01, 1000);

    // Initialize lighting…
    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    this.scene.add(ambientLight);
  }


  onRender = (delta) => {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
        <View style={{flex:1}}>
          <ExpoGraphics.View style={{flex:1}}
                             onContextCreate={this.onContextCreate}
                             onRender={this.onRender}
                             arEnabled={true}
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
