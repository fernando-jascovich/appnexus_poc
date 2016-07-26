import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView,
  Dimensions,
  Animated
} from 'react-native';

class AdClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            html: "",
            h: 0,
            w: 0,
            layoutHeight: new Animated.Value(0)
        };
        this.lastRequest = "";
        this.mounted = false;
        this.getAd();
    }
    componentDidMount() {
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    getAd() {
        if(this.mounted) {
            this.setState({
                html: "",
                h: 0,
                w: 0,
                loading: true
            });
        }
        let dim = Dimensions.get('window');
        h = (Math.random() > 0.5) ? 50 : 100;
        w = (Math.random() > 0.5) ? 300 : 320;
        let placement = "9243149";
        //let placement = "1281432";
        let url = "https://mobile.adnxs.com/ssmob?id=" +
            placement +
            "&size=" + w + "x" + h +
            "&format=json";
        this.lastRequest = url;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let html = '<!doctype html><head><style>';
                html += 'body {margin:0;padding:0;border:none;overflow:hidden}';
                html += 'iframe {width:100%;border:none;overflow:hidden}';
                html += '</style></head><body>';
                html += responseJson.ads[0].content;
                html += "</body></html>";
                this.setState({
                    html: html,
                    loading: false,
                    h: responseJson.ads[0].height,
                    w: responseJson.ads[0].width,
                    layoutHeight: new Animated.Value(0)
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    html: "",
                    h: 0,
                    w: 0,
                    loading: false
                });
            });
        }
      getLoadingView() {
            return (<View style={styles.adLayoutContainer}>
                        <View style={styles.adLayout}>
                            <Text>Requesting ad server...</Text>
                        </View>
                    </View>);
      }
      getErrorView() {
            return (<View style={styles.adLayoutContainer}>
                        <View style={styles.adLayout}>
                            <Text>
                                Sorry, no ad here ({this.lastRequest}).
                            </Text>
                        </View>
                    </View>);
      }
      render() {
          if(this.state.loading) {
              return this.getLoadingView();
          } else if(this.state.h < 2) {
              return this.getErrorView();
          } else {
            Animated.timing(
              this.state.layoutHeight,
              {
                  velocity: 2,
                  deceleration: 0.5,
                  toValue: this.state.h
              }
            ).start();
            return (
            <View style={styles.adLayoutContainer}>
                <View style={styles.adLayout}>
                    <Text style={styles.adLabel}>Publicidad</Text>
                    <Animated.View style={{
                        height: this.state.layoutHeight,
                        width: this.state.w,
                        alignSelf: 'center'
                        }}>
                    <WebView
                        automaticallyAdjustContentInsets={false}
                        scalesPageToFit={true}
                        scrollEnabled={false}
                        source={{html:this.state.html}} />
                    </Animated.View>
                </View>
            </View>
            );
          }
    }
}

const styles = StyleSheet.create({
    adLayoutContainer: {
    },
    adLayout: {
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        alignItems: 'center',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        elevation: 7,
        marginTop: 7,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
          height: 0,
          width: 0
        }
    },
    adLabel: {
        textAlign: 'left',
        color: '#333333',
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 10,
        fontSize: 10,
        alignSelf: 'flex-start'
    }
});

export default AdClient;
