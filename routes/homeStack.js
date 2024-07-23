import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Map from '../screens/map.js'
import Settings from '../screens/settings.js'
import Chat from '../screens/Statistics.js'
import Home from '../screens/home.js'

const screens = {
  Home: {
    screen: Home,
  },
  Chat: {
    screen: Chat,
  },
  Map: {
    screen: Map,
  },
  Settings: {
    screen: Settings,
  },
};

export const onPressHomeHandler = (navigation) => {
  navigation.navigate('Home');
};

// export const onPressMapHandler = (navigation) => {
//   navigation.navigate('Map');
// };

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
