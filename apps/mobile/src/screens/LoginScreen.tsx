import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function signIn() {
    if (!email.trim() || !password) {
      setError('Enter an email and password to continue.');
      return;
    }
    setError('');
    onLogin();
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.formContainer}>
        <View style={styles.card}>
          <Text style={styles.heading}>Welcome back</Text>
          <Text style={styles.description}>Sign in to view your profile.</Text>
          <Text style={styles.notice}>Demo login: enter any email and password to view the example profile. Your details are not sent or saved.</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} accessibilityLabel="Email" autoCapitalize="none" autoCorrect={false} keyboardType="email-address" autoComplete="email" placeholder="you@example.com" placeholderTextColor="#69717b" />
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} value={password} onChangeText={setPassword} accessibilityLabel="Password" secureTextEntry autoComplete="password" onSubmitEditing={signIn} returnKeyType="go" />
          {!!error && <Text style={styles.error} accessibilityRole="alert">{error}</Text>}
          <Pressable style={styles.button} onPress={signIn} accessibilityRole="button" accessibilityLabel="Sign in">
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
        </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f2eb' },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 32 },
  formContainer: { flexGrow: 1, justifyContent: 'center' },
  title: { color: '#191e29', fontSize: 30, marginLeft: 6, marginBottom: 16 },
  card: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ded5c6', borderRadius: 14, padding: 20, gap: 10 },
  heading: { color: '#191e29', fontFamily: 'serif', fontSize: 25, fontWeight: '700' },
  description: { color: '#465064', fontSize: 16, lineHeight: 23 },
  notice: { color: '#204e3d', backgroundColor: '#e3eee8', borderRadius: 8, overflow: 'hidden', padding: 12, fontSize: 14, lineHeight: 20, marginVertical: 4 },
  label: { color: '#191e29', fontSize: 16, fontWeight: '700', marginTop: 4 },
  input: { color: '#191e29', borderWidth: 1, borderColor: '#7b818b', borderRadius: 8, paddingHorizontal: 12, minHeight: 48, fontSize: 16 },
  error: { color: '#a52f18', fontSize: 14 },
  button: { backgroundColor: '#204e3d', borderRadius: 9, minHeight: 48, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
