
import {StyleSheet, Text, View, Button, Animated} from 'react-native';
import React, {useEffect, useState} from "react";
import {makeRedirectUri, useAuthRequest, useAutoDiscovery} from "expo-auth-session";

export default function App() {

    const [token, setToken] = useState('');
    const redirectUri = makeRedirectUri({
        scheme: 'fortuna'
    });

    const discovery = useAutoDiscovery('http://localhost:8080/realms/fortuna-bank-mobile-app-realm');
    // Create and load an auth request
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: 'fortuna-bank-expo-client',
            redirectUri: redirectUri,
            scopes: ['openid', 'profile'],
        },
        discovery
    );

    const signIn = () => {
        promptAsync();
    }

    const signOut = async () => {
        try {
            await fetch(
                `http://localhost:8080/realms/fortuna-bank-mobile-app-realm/protocol/openid-connect/logout?id_token_hint=${token}`);
            console.log('log out')
        } catch (e) {
            console.warn(e)
        }
    }

    useEffect(() => {
        // @ts-ignore
        const getToken = async ({ code, codeVerifier, redirectUri }) => {
            try {
                const formData = {
                    grant_type: 'authorization_code',
                    client_id: 'fortuna-bank-expo-client',
                    code: code,
                    code_verifier: codeVerifier,
                    redirect_uri: redirectUri,
                }
                const formBody = []
                for (const property in formData) {
                    var encodedKey = encodeURIComponent(property)
                    // @ts-ignore
                    var encodedValue = encodeURIComponent(formData[property])
                    formBody.push(encodedKey + '=' + encodedValue)

                    console.log('encodedKey', encodedKey)
                    console.log('encodedValue', encodedValue)
                }

                const response = await fetch(
                    `http://localhost:8080/realms/fortuna-bank-mobile-app-realm/protocol/openid-connect/token`,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: formBody.join('&'),
                    }
                )
                if (response.ok) {
                    const payload = await response.json()
                    console.log('Ok' , payload);
                    setToken(payload['access_token']);
                }
            } catch (e) {
                console.warn(e)
            }
        }
        if (response?.type === 'success') {
            const { code } = response.params
            getToken({
                code,
                codeVerifier: request?.codeVerifier,
                redirectUri,
            })
        } else if (response?.type === 'error') {
            console.warn('Authentication error: ', response.error)
        }
    }, [redirectUri, request?.codeVerifier, response])


    const makeTestCallToBackend = ()=>  {
        fetch('http://localhost:8083/test/demo',
            {
                headers: {
                    // @ts-ignore
                    Authorization: `Bearer ` + token
                }
            })
            .catch(error => console.error('Error:', error)
            );
    }


  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Login!" disabled={!request} onPress={() => {
              signIn();
          }} />
          {response && <View>
              <Text onPress={makeTestCallToBackend}>Test - Backend</Text>
              <Text onPress={signOut}>Sign Out</Text>
          </View>}
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
