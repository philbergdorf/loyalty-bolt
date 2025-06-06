import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Check, Circle } from 'lucide-react-native';

type Task = {
  id: string;
  title: string;
  description?: string;
  points: number;
  completed: boolean;
  actionLabel?: string;
  actionLink?: string;
};

type EarnPointsCardProps = {
  tasks: Task[];
  onCompleteTask: (id: string) => void;
  onTaskAction: (task: Task) => void;
};

export default function EarnPointsCard({ 
  tasks, 
  onCompleteTask, 
  onTaskAction 
}: EarnPointsCardProps) {
  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(600).delay(800)}
    >
      <Text style={styles.title}>Earn more points</Text>
      
      {tasks.map((task, index) => (
        <View 
          key={task.id} 
          style={[
            styles.taskItem, 
            index < tasks.length - 1 && styles.taskItemBorder
          ]}
        >
          <View style={styles.taskLeft}>
            {task.completed ? (
              <View style={styles.completedIconContainer}>
                <Check size={18} color="#22c55e" />
              </View>
            ) : (
              <Circle size={24} color="#CBD5E1" />
            )}
            
            <View style={styles.taskTextContainer}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              {task.actionLabel && !task.completed && (
                <TouchableOpacity onPress={() => onTaskAction(task)}>
                  <Text style={styles.taskActionLabel}>
                    {task.actionLabel}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          <View style={[
            styles.pointsBadge,
            task.completed && styles.pointsBadgeCompleted
          ]}>
            <Text style={[
              styles.pointsText,
              task.completed && styles.pointsTextCompleted
            ]}>
              {task.points} pts
            </Text>
          </View>
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  taskItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  completedIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
  },
  taskActionLabel: {
    fontSize: 13,
    color: '#f97316',
    marginTop: 4,
  },
  pointsBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
  },
  pointsBadgeCompleted: {
    backgroundColor: '#dcfce7',
  },
  pointsText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  pointsTextCompleted: {
    color: '#22c55e',
  },
});