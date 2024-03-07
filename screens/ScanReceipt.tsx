import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../type';
import {
  launchImageLibrary,
  launchCamera,
  MediaType,
} from 'react-native-image-picker';

function ScanReceipt(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const backgroundStyle = {
    flex: 1,
    backgroundColor: 'white',
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorCode);
      } else {
        let imageUri = response.assets?.[0]?.uri || null;
        let base64Data = response.assets?.[0]?.base64;
        setSelectedImage(imageUri);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorCode);
      } else {
        let imageUri = response.assets?.[0]?.uri || null;
        let base64Data = response.assets?.[0]?.base64;
        setSelectedImage(imageUri);
      }
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>Scan Receipt</Text>
          <Text style={styles.subTitleText}>Take the photo</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ViewItem')}>
            <Text style={styles.buttonText}>View Items</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {selectedImage && (
          <Image source={{uri: selectedImage}} style={styles.showImage} />
        )}
        <View style={{marginTop: '20%'}}>
          <Button title="Select Image" onPress={openImagePicker} />
        </View>
        <View style={{marginTop: '10%'}}>
          <Button title="Launch Camera" onPress={handleCameraLaunch} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Image
            source={require('../image/logo.png')}
            style={styles.bottomImage}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  textContainer: {
    marginTop: '5%',
  },
  titleText: {
    fontSize: 35,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'black',
  },
  subTitleText: {
    fontSize: 15,
    color: 'black',
  },
  imageContainer: {
    marginTop: '7%',
    marginLeft: '10%',
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c2dc7',
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomImage: {
    width: 50,
    height: 50,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '50%',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: '30%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  showImage: {
    width: 300,
    height: 300,
  },
});

export default ScanReceipt;
