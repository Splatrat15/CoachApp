import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { STATUS_LABELS } from '../constants/attendanceLabels';
import { useAttendance } from '../context/AttendanceContext';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../theme';
import { AttendanceStatus } from '../types/attendance';
import type { SemanticColors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'AttendanceDetail'>;

const OPTIONS: AttendanceStatus[] = ['present', 'absent', 'late'];

function getOptionColors(
  colors: SemanticColors,
  status: AttendanceStatus,
): { border: string; selectedBg: string; selectedText: string } {
  const map = {
    present: {
      border: colors.attendance.present,
      selectedBg: colors.attendance.present,
      selectedText: colors.textOnAccent,
    },
    absent: {
      border: colors.attendance.absent,
      selectedBg: colors.attendance.absent,
      selectedText: colors.textOnPrimary,
    },
    late: {
      border: colors.attendance.late,
      selectedBg: colors.attendance.late,
      selectedText: colors.textOnWarning,
    },
  };
  return map[status];
}

export function AttendanceDetailScreen({ navigation, route }: Props) {
  const { personId, name } = route.params;
  const { getStatus, setStatus } = useAttendance();
  const { colors } = useTheme();
  const currentStatus = getStatus(personId);

  const styles = useThemedStyles((theme) => ({
    content: {
      flex: 1,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
      maxWidth: theme.layout.isTablet ? 480 : undefined,
      alignSelf: theme.layout.isTablet ? ('center' as const) : undefined,
      width: '100%' as const,
    },
    name: {
      ...theme.typography.title,
      color: theme.colors.primary,
      marginBottom: theme.spacing.xs,
    },
    prompt: {
      ...theme.typography.label,
      color: theme.colors.textMuted,
      marginBottom: theme.spacing.xl,
    },
    options: {
      gap: theme.spacing.sm + theme.spacing.xxs,
    },
    option: {
      borderWidth: 2,
      borderRadius: theme.radius.lg,
      paddingVertical: theme.spacing.md + theme.spacing.xxs,
      paddingHorizontal: theme.spacing.lg,
      alignItems: 'center' as const,
      minHeight: theme.ms(56),
      justifyContent: 'center' as const,
    },
    optionPressed: {
      opacity: 0.92,
    },
    optionText: {
      ...theme.typography.button,
    },
  }));

  const handleSelect = (status: AttendanceStatus) => {
    setStatus(personId, status);
    navigation.goBack();
  };

  return (
    <ScreenContainer edges={['bottom']}>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={3}>
          {name}
        </Text>
        <Text style={styles.prompt}>Mark attendance</Text>

        <View style={styles.options}>
          {OPTIONS.map((status) => {
            const selected = currentStatus === status;
            const optionColors = getOptionColors(colors, status);

            return (
              <Pressable
                key={status}
                style={({ pressed }) => [
                  styles.option,
                  {
                    borderColor: optionColors.border,
                    backgroundColor: selected
                      ? optionColors.selectedBg
                      : colors.surface,
                  },
                  pressed && !selected && styles.optionPressed,
                ]}
                android_ripple={{
                  color: colors.pressedAccent,
                }}
                onPress={() => handleSelect(status)}>
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: selected
                        ? optionColors.selectedText
                        : colors.text,
                    },
                  ]}>
                  {STATUS_LABELS[status]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScreenContainer>
  );
}
