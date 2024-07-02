import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import { NAVIGATIONROUTES } from '../constants/navigationRoutes';
import EpisodeDetailScreen from '../screens/EpisodeDetailScreen';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';

const Stack = createNativeStackNavigator();

const NavigationStack = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name={NAVIGATIONROUTES.bottomTabNavigation}
          component={BottomTabNavigation}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={NAVIGATIONROUTES.epDetailScreen}
          component={EpisodeDetailScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={NAVIGATIONROUTES.charDetailScreen}
          component={CharacterDetailScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default NavigationStack;