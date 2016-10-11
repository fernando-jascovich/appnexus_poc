import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  TouchableHighlight,
  Switch
} from 'react-native';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.reset();
    this.state = {
      location: null,
      locationSwitch: false,
      locationSwitchLoading: false,
      gender: "u"
    };
  }
  reset() {
    this.placementId = "";
    this.width = 0;
    this.height = 0;
    this.autoRefreshInterval = 0;
    this.segments = "";
    this.age = 0;
  }
  formSubmit() {
    if(!this.props.onFormSubmit) return;
    this.props.onFormSubmit({
      placementId: this.placementId,
      width: this.width,
      height: this.height,
      location: this.state.location,
      segments: this.segments,
      gender: this.state.gender,
      age: this.age,
      autoRefreshInterval: this.autoRefreshInterval
    });
  }
  onLocationSwitch(value) {
      if(value) {
	this.setState({
	  locationSwitch: value,
	  locationSwitchLoading: true
	});
	navigator.geolocation.getCurrentPosition(
	  (position) => {
            this.setState({
	      location: { lat: position.coords.latitude,
			  lng: position.coords.longitude },
	      locationSwitch: true,
	      locationSwitchLoading: false
	    });
	  },
	  (error) => {
	    alert(error);
	    this.setState({location: null,
			   locationSwitch: false,
			   locationSwitchLoading: false})
	  },
	  {timeout: 10000, enableHighAccuracy:true, maximumAge:100000}
	);
      } else {
	this.setState({location: null, locationSwitch: false});
      }
  }
  render() {
    return(
      <View style={styles.root}>
	<TextInput
		keyboardType="numeric"
		placeholder="Enter placement id here"
		placeholderTextColor="#999999"
		underlineColorAndroid="#ffffff"
		style={styles.input}
		onChangeText={(text) => this.placementId = text} />
	<View style={styles.hContainer}>
		<Text style={styles.input}>Ad size: </Text>
		<TextInput
			keyboardType="numeric"
			placeholder="width"
			placeholderTextColor="#999999"
			underlineColorAndroid="#ffffff"
			maxLength={4}
			style={styles.inputSize}
			onChangeText={(text) => this.width = text} />
		<Text style={styles.input}>x</Text>
		<TextInput
			keyboardType="numeric"
			placeholder="height"
			placeholderTextColor="#999999"
			underlineColorAndroid="#ffffff"
			maxLength={4}
			style={styles.inputSize}
			onChangeText={(text) => this.height = text} />
	</View>
	<View style={styles.hContainer}>
		<Text style={styles.input}>Location:  </Text>
		<Text style={styles.input}>Off</Text>
      <Switch
      disabled={this.state.locationSwitchLoading}
      ref={"locationSwitch"}
			value={this.state.locationSwitch}
			onValueChange={(value) => this.onLocationSwitch(value) } />
		<Text style={styles.input}>On</Text>
	</View>
	<View style={styles.hContainer}>
		<Text style={styles.input}>Segments: </Text>
		<TextInput
      placeholderTextColor="#999999"
      multiline={true}
			onChangeText={(value) => this.segments = value}
			style={styles.inputSegments}
			placeholder='{"key": "value"}' />
      </View>
      <View style={styles.hContainer}>
      <Text style={styles.input}>Age: </Text>
	<TextInput
		keyboardType="numeric"
		placeholder="age"
		placeholderTextColor="#999999"
		underlineColorAndroid="#ffffff"
		maxLength={3}
		style={styles.inputSize}
		onChangeText={(text) => this.age = text} />
      </View>
      <View style={styles.hContainer}>
      <Text style={styles.input}>Gender: </Text>
      <Picker
      mode="dropdown"
      style={styles.picker}
      selectedValue={this.state.gender}
      onValueChange={(gender) => this.setState({gender: gender})}>
      <Picker.Item label="Unspecified" value="u" />
      <Picker.Item label="Male" value="m" />
      <Picker.Item label="Female" value="f" />
      </Picker>
      </View>
      <View style={styles.hContainer}>
      <Text style={styles.input}>Auto refresh interval: </Text>
      <TextInput
      keyboardType="numeric"
      placeholder="int"
      placeholderTextColor="#999999"
      underlineColorAndroid="#ffffff"
      maxLength={5}
      style={styles.inputSize}
      onChangeText={(text) => this.autoRefreshInterval = text} />
      </View>
	<View style={styles.buttonContainer}>
		<TouchableHighlight
			onPress={() => this.formSubmit()}
			style={styles.button}>
		<Text style={{color:"#ffffff"}}>Refresh ad</Text>
		</TouchableHighlight>
	</View>
    </View>);
  }
}

const styles = StyleSheet.create({
  root: {

  },
  buttonContainer: {
    alignSelf: "center",
    alignItems: "flex-end",
    marginBottom: 10
  },
  button: {
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 6,
    justifyContent: "center"
  },
  input: {
    color: "#ffffff",
    textAlign: "center"
  },
  inputSize: {
    width: 100,
    textAlign: "center",
    color: "#ffffff"
  },
  inputSegments: {
    flex: 1,
    height: 100,
    color: "#ffffff",
    backgroundColor: "#333333"
  },
  hContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    margin: 10
  },
  picker: {
    width: 130,
    color: "#333333"
  },
});

export default Form;
