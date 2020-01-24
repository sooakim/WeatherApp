/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Styled from 'styled-components/native';

import WeatherView from '~/Screens/WeatherView';

const Container = Styled.View`
  flex: 1;
  background-color: #EEE;
`;

interface Props { }

const App = ({ }: Props) => {
  return (
    <>
      <Container>
        <WeatherView />
      </Container>
    </>
  );
};
export default App;
