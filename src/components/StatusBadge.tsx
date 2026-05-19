import { Text, View } from 'react-native';
import {
  STATUS_LABELS,
  STATUS_SHORT,
  getStatusColors,
} from '../constants/attendanceLabels';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { AttendanceStatus } from '../types/attendance';

type StatusBadgeProps = {
  status: AttendanceStatus;
  compact?: boolean;
};

export function StatusBadge({ status, compact = false }: StatusBadgeProps) {
  const styles = useThemedStyles((theme) => {
    const statusColor = getStatusColors(theme.colors)[status];

    return {
      badge: {
        paddingVertical: theme.spacing.xxs,
        borderRadius: theme.radius.md,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        backgroundColor: statusColor,
        minWidth: compact ? theme.ms(28) : theme.ms(56),
        paddingHorizontal: compact ? theme.spacing.xs : theme.spacing.sm,
      },
      text: {
        ...theme.typography.caption,
        color: theme.colors.textOnPrimary,
      },
    };
  });

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>
        {compact ? STATUS_SHORT[status] : STATUS_LABELS[status]}
      </Text>
    </View>
  );
}
