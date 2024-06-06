import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from '@expo/vector-icons';
import Home from '@/components/screens/(Authed)/home';
import EditCard from '@/components/screens/(Authed)/editCard';
import ShareCard from '@/components/screens/(Authed)/shareCard';
import AllCards from '@/components/screens/(Authed)/allCards';
import '@/styles/global.css';

const Tab = createBottomTabNavigator();

export default function Navigations() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen
          name='ホーム'
          component={Home}
          options={{
            tabBarLabel: 'ホーム',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name='home'
                size={20}
                color={focused ? 'dodgerblue' : 'gray'}
              />
            ),
          }}
        />
        <Tab.Screen
          name='カード編集'
          component={EditCard}
          options={{
            tabBarLabel: 'カード編集',
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name='card-account-details'
                size={20}
                color={focused ? 'dodgerblue' : 'gray'}
              />
            ),
          }}
        />
        <Tab.Screen
          name='カード交換'
          component={ShareCard}
          options={{
            tabBarLabel: 'カード交換',
            tabBarIcon: ({ focused }) => (
              <Octicons
                name='share'
                size={20}
                color={focused ? 'dodgerblue' : 'gray'}
              />
            ),
          }}
        />
        <Tab.Screen
          name='カード一覧'
          component={AllCards}
          options={{
            tabBarLabel: 'カード一覧',
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name='cards'
                size={20}
                color={focused ? 'dodgerblue' : 'gray'}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
