import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { exampleResult, MobilityResult } from '../data/result';

export function ResultContent({ result }: { result: MobilityResult | null }) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}>
      <Text style={styles.title}>Your result</Text>
      {result ? (
        <>
          <View style={styles.resultCard}>
            <View style={styles.check}><Text style={styles.checkText}>✓</Text></View>
            <View style={styles.resultText}>
              <Text style={styles.resultLabel}>RESULTS PUBLISHED</Text>
              <Text style={styles.university}>{result.university}</Text>
              <Text style={styles.body}>Your choice {result.choiceRank} of {result.totalChoices}</Text>
            </View>
          </View>

          <Text style={styles.heading}>Your score</Text>
          <View style={styles.card}>
            <Text style={styles.caption}>YOUR SCORE</Text>
            <Text style={styles.score}>{result.score}</Text>
            <Text style={styles.body}>Score used for your allocation</Text>
          </View>

          {result.comparison && (
            <>
              <Text style={styles.heading}>Understanding your result</Text>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Why {result.comparison.university}?</Text>
                <Text style={styles.body}>
                  {result.comparison.university} had {result.comparison.places} places. Your score was {result.score} and the last accepted score was {result.comparison.lastAcceptedScore}.
                </Text>
                <Text style={styles.body}>{result.comparison.note}</Text>
              </View>
            </>
          )}
        </>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>No result available</Text>
          <Text style={styles.body}>Your result will appear here when it is available.</Text>
        </View>
      )}
    </ScrollView>
  );
}

export default function ResultScreen() {
  return <ResultContent result={exampleResult} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f2eb' },
  content: { paddingHorizontal: 24, paddingBottom: 32 },
  title: { color: '#191e29', fontSize: 30, marginLeft: 6, marginBottom: 16 },
  example: { color: '#51635b', fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  resultCard: { flexDirection: 'row', padding: 16, borderWidth: 2, borderColor: '#204e3d', borderRadius: 14, backgroundColor: '#e3eee8', gap: 12 },
  check: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#204e3d', alignItems: 'center', justifyContent: 'center' },
  checkText: { color: '#fff', fontSize: 19, fontWeight: '700' },
  resultText: { flex: 1 },
  resultLabel: { color: '#173d2e', fontSize: 15, fontWeight: '700' },
  university: { color: '#191e29', fontSize: 25, fontWeight: '700', fontFamily: 'serif', marginBottom: 4 },
  body: { color: '#191e29', fontSize: 16, lineHeight: 24 },
  heading: { color: '#191e29', fontSize: 18, fontWeight: '700', marginTop: 24, marginBottom: 10 },
  card: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ded5c6', borderRadius: 14, padding: 16, gap: 8 },
  caption: { color: '#51635b', fontSize: 12, fontWeight: '700', letterSpacing: 0.7 },
  score: { color: '#204e3d', fontSize: 36, fontWeight: '700' },
  cardTitle: { color: '#191e29', fontSize: 18, fontWeight: '700' },
});
