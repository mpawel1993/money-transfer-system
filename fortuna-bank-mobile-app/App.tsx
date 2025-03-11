import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {
    CodeChallengeMethod,
    makeRedirectUri,
    refreshAsync,
    ResponseType,
    useAuthRequest,
    useAutoDiscovery
} from "expo-auth-session";

export default function App() {

    const [tmpRefreshToken, setTmpRefreshToken] = useState('');

    const [token, setToken] = useState('');
    const redirectUri = makeRedirectUri({
        scheme: 'fortuna'
    });

    const discovery = useAutoDiscovery('http://192.168.1.236:8080/realms/fortuna-bank-mobile-app-realm');
    // Create and load an auth request

    // @ts-ignore
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: 'fortuna-bank-expo-client',
            responseType: ResponseType.Code,
            scopes: ['openid', 'profile', 'email'],
            redirectUri: redirectUri,
            codeChallengeMethod: CodeChallengeMethod.S256,
        },
        discovery);

    useEffect(() => {
        console.log('here')
        if (response?.type === 'success') {
            const {code} = response.params;

            // Use the authorization code to exchange for tokens
            // @ts-ignore
            fetch(discovery.tokenEndpoint, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                // @ts-ignore
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    client_id: 'fortuna-bank-expo-client',
                    code,
                    redirect_uri: redirectUri,
                    code_verifier: request?.codeVerifier,
                }).toString(),
            })
                .then((res) => res.json())
                .then((data) => {
                    // console.log('Access Token:', data.access_token);
                    // console.log('RefreshToken Token:', data.refresh_token);
                    setTmpRefreshToken(data.refresh_token);
                    setToken(data.access_token);
                })
                .catch((error) => console.error('Token Exchange Failed:', error));
        }
    }, [response]);

    // @ts-ignore
    function storeRefreshToken(refreshToken) {
        // await SecureStore.setItemAsync('refreshToken', refreshToken);
        return setTmpRefreshToken(refreshToken);
    }

     function getStoredRefreshToken() {
        return tmpRefreshToken
    }

    function refreshAccessToken() {
        const refreshToken = tmpRefreshToken
        console.log('refresh_token_heja' , tmpRefreshToken)
        if (!refreshToken) {
            console.error('No refresh token found!');
            return null;
        }
        try {
            const tokenResult =  refreshAsync(
                {
                    clientId: 'fortuna-bank-expo-client',
                    // @ts-ignore
                    refreshToken: refreshToken,
                },
                {
                    tokenEndpoint: discovery?.tokenEndpoint,
                }
            );

            console.log('New Access Token:', tmpRefreshToken);

            // Save the new refresh token if it was returned
            if (tmpRefreshToken) {
                storeRefreshToken(tmpRefreshToken);
            }

            return tmpRefreshToken; // Use or store the new access token
        } catch (error) {
            console.error('Failed to refresh token:', error);
            return null;
        }
    }

    const signIn = () => {
        promptAsync();
    }

    const makeTestCallToBackend = ()=>  {
        fetch('http://192.168.1.236:8083/test/demo',
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
              <Text/>
              {/*<Text onPress={signOut}>Sign Out</Text>*/}
              <Text/>
              <Text onPress={refreshAccessToken}>Refresh Token</Text>
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
