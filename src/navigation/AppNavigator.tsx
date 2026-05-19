import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AttendanceDetailScreen } from '../screens/AttendanceDetailScreen';
import { AttendanceListScreen } from '../screens/AttendanceListScreen';
import { useTheme } from '../theme';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function NavigatorContent() {
  const { colors, typography, ms } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: colors.textOnPrimary,
        headerTitleStyle: {
          fontWeight: typography.heading.fontWeight,
          fontSize: ms(17),
        },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}>
      <Stack.Screen
        name="AttendanceList"
        component={AttendanceListScreen}
        options={{ title: 'Attendance' }}
      />
      <Stack.Screen
        name="AttendanceDetail"
        component={AttendanceDetailScreen}
        options={{ title: 'Mark attendance' }}
      />
    </Stack.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <NavigatorContent />
    </NavigationContainer>
  );
}
