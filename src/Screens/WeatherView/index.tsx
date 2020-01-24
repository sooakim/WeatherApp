import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Styled from 'styled-components/native';

const Container = Styled.SafeAreaView`
    flex: 1;
    background-color: #EEE;
`;

const WeatherContainer = Styled(FlatList)``;

const LoadingView = Styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Loading = Styled.ActivityIndicator`
    margin-bottom: 16px;
`;

const LoadingLabel = Styled.Text`
    font-size: 16px;
`;

const WeatherItemContainer = Styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Weather = Styled.Text`
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: bold;
`;

const Temperature = Styled.Text`
    font-size: 16px;
`;

interface Props { }

const API_KEY = '0f9fcfa26b0049894f9765251a2baf35';

interface IWeather{
    temperature?: number;
    weather?: string;
    isLoading: boolean;
}

const WeatherView = ({ }: Props) => {
    const [weatherInfo, setWeatherInfo] = useState<IWeather>({
        temperature: undefined,
        weather: undefined,
        isLoading: false
    });

    const getCurrentWeather = () => {
        setWeatherInfo({
            isLoading: true
        });
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const requestUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`;
                fetch(requestUrl)
                    .then(response => response.json())
                    .then(json => {
                        const {
                            main: {
                                temp
                            },
                            weather
                        } = json;

                        setWeatherInfo({
                            temperature: temp,
                            weather: weather[0].main,
                            isLoading: false
                        });
                    })
                    .catch(error => {
                        setWeatherInfo({
                            isLoading: false
                        });
                    })
            },
            error => {
                setWeatherInfo({
                    isLoading: false
                });
                showError('위치 정보를 가져오는데 실패하였다.');
            }
        );        
    };

    const showError = (message: string): void => {
        setTimeout(() => {
            Alert.alert(message);
        }, 500);
    };

    useEffect(() => {
        getCurrentWeather();
    }, []);

    let data = [];
    const { isLoading , weather, temperature } = weatherInfo;
    if(weather && temperature){
        data.push(weatherInfo);
    }

    return(
        <Container>
            <WeatherContainer
                onRefresh={() => getCurrentWeather()}
                refreshing={isLoading}
                data={data}
                keyExtractor={(item, index) => {
                    return `Weather-${index}`;
                }}
                ListEmptyComponent={
                    <LoadingView>
                        <Loading size="large" color="#1976D2"/>
                        <LoadingLabel>Loading...</LoadingLabel>
                    </LoadingView>
                }
                renderItem={({item, index}) => (
                    <WeatherItemContainer>
                        <Weather>{(item as IWeather).weather}</Weather>
                        <Temperature>{(item as IWeather).temperature} °C</Temperature>
                    </WeatherItemContainer>
                )}
                contentContainerStyle={{ flex: 1 }}
            />
        </Container>
    );
};
export default WeatherView;