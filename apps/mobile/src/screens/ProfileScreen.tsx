import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { exampleProfile, StudentProfile } from '../data/profile';
import LoginScreen from './LoginScreen';

export function ProfileContent({ profile, onLogout }: { profile: StudentProfile | null; onLogout?: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}>
      <Text style={styles.title}>Profile</Text>
      {profile ? (
        <>
          <View style={[styles.card, styles.identity]}>
            <View style={styles.avatar}><Text style={styles.initials}>{profile.initials}</Text></View>
            <View style={styles.identityText}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.secondary}>{profile.email}</Text>
              <Text style={styles.secondary}>{profile.year} · {profile.role}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.heading}>Academic profile</Text>
            <Text style={styles.secondary}>These values are used to compute your score. They are set by the school, so you cannot change them here.</Text>
            {profile.academic.map(item => (
              <View key={item.label} style={styles.row}>
                <Text style={styles.label}>{item.label}</Text><Text style={styles.value}>{item.value}</Text>
              </View>
            ))}
            <Text style={styles.secondary}>Something wrong? Contact your international office.</Text>
          </View>
        </>
      ) : (
        <View style={styles.card}><Text style={styles.secondary}>Your profile is not available yet.</Text></View>
      )}

      <View style={styles.card}>
        <Text style={styles.heading}>Settings</Text>
        <Text style={styles.secondary}>Settings will be available when your account is connected.</Text>
        <View style={styles.row}><View style={styles.rowText}><Text style={styles.strong}>Result notification</Text><Text style={styles.secondary}>When results are published</Text></View><Text style={styles.unavailable}>Unavailable</Text></View>
        <View style={styles.row}><View style={styles.rowText}><Text style={styles.strong}>Wishlist reminder</Text><Text style={styles.secondary}>3 days before the deadline</Text></View><Text style={styles.unavailable}>Unavailable</Text></View>
        <View style={styles.row}><Text style={styles.strong}>Language</Text><Text style={styles.value}>English</Text></View>
        <View style={styles.row}><View style={styles.rowText}><Text style={styles.strong}>Text size</Text><Text style={styles.secondary}>Follows your phone settings</Text></View><Text style={styles.value}>Auto</Text></View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Account and data</Text>
        <Text style={styles.secondary}>Account actions will be available when your account is connected.</Text>
        {['Change password', 'Download my data', 'Delete my account'].map(label => (
          <View key={label} style={styles.disabledButton} accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled: true }}>
            <Text style={styles.disabledButtonText}>{label}</Text>
          </View>
        ))}
        {onLogout && <Pressable style={styles.signOut} onPress={onLogout} accessibilityRole="button" accessibilityLabel="Sign out"><Text style={styles.signOutText}>Sign out</Text></Pressable>}
      </View>
    </ScrollView>
  );
}

export default function ProfileScreen() {
  const [signedIn, setSignedIn] = useState(false);
  return signedIn
    ? <ProfileContent profile={exampleProfile} onLogout={() => setSignedIn(false)} />
    : <LoginScreen onLogin={() => setSignedIn(true)} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f2eb' },
  content: { paddingHorizontal: 24, paddingBottom: 32 },
  title: { color: '#191e29', fontSize: 30, marginLeft: 6, marginBottom: 16 },
  example: { color: '#51635b', fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  card: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ded5c6', borderRadius: 14, padding: 16, marginBottom: 12, gap: 8 },
  identity: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  identityText: { flex: 1 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#e3eee8', alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#204e3d', fontFamily: 'serif', fontSize: 24, fontWeight: '700' },
  name: { color: '#191e29', fontSize: 19, fontWeight: '700' },
  heading: { color: '#191e29', fontFamily: 'serif', fontSize: 22, fontWeight: '700' },
  secondary: { color: '#465064', fontSize: 14, lineHeight: 20 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderColor: '#ded5c6', paddingVertical: 12, gap: 12 },
  rowText: { flex: 1 },
  label: { color: '#191e29', fontSize: 16, flex: 1 },
  strong: { color: '#191e29', fontSize: 16, fontWeight: '700' },
  value: { color: '#191e29', fontSize: 16, fontWeight: '700', flexShrink: 1, textAlign: 'right' },
  unavailable: { color: '#596273', fontSize: 13 },
  disabledButton: { borderWidth: 1, borderColor: '#aab0b6', borderRadius: 9, minHeight: 48, alignItems: 'center', justifyContent: 'center', padding: 8 },
  disabledButtonText: { color: '#69717b', fontSize: 16, fontWeight: '700', textAlign: 'center' },
  signOut: { minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  signOutText: { color: '#204e3d', fontSize: 16, fontWeight: '700' },
});
