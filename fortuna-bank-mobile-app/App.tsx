
import {StyleSheet, Text, View, Button, Animated} from 'react-native';
import React from "react";
import {makeRedirectUri, useAuthRequest, useAutoDiscovery} from "expo-auth-session";
import ScrollView = Animated.ScrollView;

export default function App() {


    const discovery = useAutoDiscovery('http://localhost:8080/realms/fortuna-bank-mobile-app-realm');

// Create and load an auth request
    const [request, result, promptAsync] = useAuthRequest(
        {
            clientId: 'fortuna-bank-mobile-client',
            redirectUri: makeRedirectUri({
                scheme: 'fortuna'
            }),
            scopes: ['openid', 'profile'],
        },
        discovery
    );

    function handleClick() {
        fetch('https://localhost:8083/demo')
            .catch(error => console.error('Error:', error)




            );
    }


  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Login!" disabled={!request} onPress={() => promptAsync()} />
          {result && <Text onPress={handleClick}>elo</Text>}

          {/*<Text>{JSON.stringify(discovery?.discoveryDocument, null, 2)}</Text>*/}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
