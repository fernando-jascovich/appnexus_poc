import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView,
  Dimensions
} from 'react-native';

class AdClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            html: "",
            h: 0,
            w: 0
        };
        this.getAd();
    }
    getAd() {
        let dim = Dimensions.get('window');
        h = (Math.random() > 0.5) ? 50 : 100;
        w = (Math.random() > 0.5) ? 300 : 320;
        let placement = "9243149";
        let url = "http://mobile.adnxs.com/ssmob?id=" + 
            placement + 
            "&size=" + w + "x" + h + 
            "&format=json";
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
                    h: responseJson.ads[0].height,
                    w: responseJson.ads[0].width
                });
            })
            .catch((error) => { });
        }
      render() {
          if(this.state.h < 2) {
            return (<View />);
          }
        return (
        <View style={styles.adLayoutContainer}>
            <View style={styles.adLayout}>
                <Text style={styles.adLabel}>Publicidad</Text>
                <View style={{
                    height: this.state.h,
                    width: this.state.w,
                    alignSelf: 'center'
                    }}>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    scalesPageToFit={true}
                    scrollEnabled={false}
                    source={{html:this.state.html}} />
            </View>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    adLayoutContainer: {
    },
    adLayout: {
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        alignItems: 'center'
    },
    adLabel: {
        textAlign: 'left',
        color: '#333333',
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 10,
        fontSize: 10,
        elevation: 10
    }
});

export default AdClient;
