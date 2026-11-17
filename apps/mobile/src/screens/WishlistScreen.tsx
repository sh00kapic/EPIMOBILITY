import { useEffect, useState } from 'react';
import { AccessibilityInfo, LayoutAnimation, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const initialChoices = ['ETH Zurich', 'University of Toronto', 'KAIST', 'University of Melbourne'];
const green = '#204e3d';

export default function WishlistScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [choices, setChoices] = useState(initialChoices);
  const [showScore, setShowScore] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => {});
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => subscription.remove();
  }, []);

  function moveChoice(index: number, direction: number) {
    if (!reduceMotion) LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setChoices(current => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}>
      <Text style={styles.title}>Wishlist and Results</Text>
      <View style={styles.resultCard}>
        <Text style={styles.check} accessibilityLabel="Published">✓</Text>
        <View style={styles.resultText}>
          <Text style={styles.resultLabel}>RESULTS PUBLISHED</Text>
          <Text style={styles.university}>University of Toronto</Text>
          <Text style={styles.body}>Your choice 2 of 5</Text>
        </View>
      </View>
      <View style={styles.explanation}>
        <Text style={styles.sectionTitle}>Why choice 2, and not choice 1?</Text>
        <Text style={styles.body}>ETH Zurich had 6 places. Your score was 79.5 and the last accepted score was 84.2. Your English is also under its 7.0 minimum.</Text>
        <Pressable style={styles.scoreButton} onPress={() => setShowScore(!showScore)} accessibilityRole="button" accessibilityState={{ expanded: showScore }}>
          <Text style={styles.scoreButtonText}>{showScore ? 'Hide score details' : 'Show how my score is built'}</Text>
        </Pressable>
        {showScore && <Text style={styles.detail}>Score breakdown is not available for this example.</Text>}
      </View>
      <Text style={styles.choicesTitle}>My five choices</Text>
      {choices.map((choice, index) => (
        <View key={choice} style={styles.choice}>
          <Text style={styles.number}>{index + 1}</Text>
          <Text style={styles.choiceName}>{choice}</Text>
          {([-1, 1] as const).map(direction => {
            const disabled = index + direction < 0 || index + direction >= choices.length;
            return (
              <Pressable key={direction} style={[styles.arrowButton, disabled && styles.disabled]} disabled={disabled} onPress={() => moveChoice(index, direction)} accessibilityRole="button" accessibilityLabel={`Move ${choice} ${direction === -1 ? 'up' : 'down'}`} accessibilityState={{ disabled }}>
                <Text style={styles.arrow}>{direction === -1 ? '↑' : '↓'}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}
      <Pressable style={styles.emptyChoice} onPress={() => navigation.navigate('Explore')} accessibilityRole="button">
        <Text style={styles.emptyNumber}>5</Text>
        <Text style={styles.emptyText}>Choice 5 is empty: explore</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f2eb' },
  content: { paddingHorizontal: 24, paddingBottom: 24 },
  title: { color: '#191e29', fontSize: 30, marginLeft: 6, marginBottom: 16 },
  example: { color: '#51635b', fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  resultCard: { flexDirection: 'row', padding: 16, borderWidth: 2, borderColor: green, borderRadius: 14, backgroundColor: '#e3eee8', gap: 12 },
  check: { width: 28, height: 28, borderRadius: 14, overflow: 'hidden', textAlign: 'center', color: '#fff', backgroundColor: green, fontSize: 19, fontWeight: '700' },
  resultText: { flex: 1 },
  resultLabel: { color: '#173d2e', fontSize: 15, fontWeight: '700' },
  university: { color: '#191e29', fontSize: 25, fontWeight: '700', fontFamily: 'serif', marginBottom: 4 },
  body: { color: '#191e29', fontSize: 16, lineHeight: 24 },
  explanation: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ded5c6', borderRadius: 14, padding: 16, marginTop: 12, gap: 8 },
  sectionTitle: { color: '#191e29', fontSize: 18, fontWeight: '700' },
  scoreButton: { alignSelf: 'flex-start', borderWidth: 2, borderColor: green, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 12 },
  scoreButtonText: { color: green, fontSize: 16, fontWeight: '700' },
  detail: { color: '#48544e', fontSize: 14 },
  choicesTitle: { color: '#191e29', fontSize: 18, fontWeight: '700', marginTop: 20, marginBottom: 10 },
  choice: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ded5c6', borderRadius: 12, padding: 10, marginBottom: 8, gap: 8 },
  number: { width: 34, height: 34, borderRadius: 17, overflow: 'hidden', backgroundColor: green, color: '#fff', textAlign: 'center', lineHeight: 34, fontSize: 17, fontWeight: '700' },
  choiceName: { flex: 1, color: '#191e29', fontSize: 16, fontWeight: '600' },
  arrowButton: { width: 44, height: 44, borderWidth: 2, borderColor: '#191e29', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  disabled: { opacity: 0.3 },
  arrow: { color: '#191e29', fontSize: 25, lineHeight: 30 },
  emptyChoice: { flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderStyle: 'dashed', borderColor: '#989182', borderRadius: 12, padding: 12, gap: 10 },
  emptyNumber: { width: 36, height: 36, borderWidth: 2, borderColor: '#505969', borderRadius: 18, textAlign: 'center', lineHeight: 32, fontSize: 17, color: '#505969' },
  emptyText: { flex: 1, color: green, fontSize: 16, fontWeight: '700', textDecorationLine: 'underline' },
});
