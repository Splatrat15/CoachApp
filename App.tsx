import { StatusBar } from 'expo-status-bar';
import { AttendanceProvider } from './src/context/AttendanceContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/theme';

export default function App() {
  return (
    <ThemeProvider>
      <AttendanceProvider>
        <AppNavigator />
        <StatusBar style="light" />
      </AttendanceProvider>
    </ThemeProvider>
  );
}
