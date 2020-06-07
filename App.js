import React from "react";
import { StyleSheet, Text, View, Button, AppRegistry } from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const recording = new Audio.Recording();
  const recordHandler = async () => {
    await Audio.requestPermissionsAsync().then(async (res) => {
      if (res.granted) {
        try {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
          await recording.prepareToRecordAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
          );
          await recording.startAsync();
          // You are now recording!
        } catch (error) {
          alert(error);
        }
      } else {
        alert("Permission Denied");
      }
    });
  };

  const stopRecording = () => {
    Audio.setAudioModeAsync({ allowsRecordingIOS: false });
    const promise = recording.stopAndUnloadAsync();
    console.log(promise);
  };

  return (
    <View style={styles.container}>
      <Button title="Record Audio" onPress={recordHandler} />
      <Button title="Stop Recording" onPress={stopRecording} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
});
