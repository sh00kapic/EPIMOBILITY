import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { ProfileContent } from '../src/screens/ProfileScreen';
import { exampleProfile } from '../src/data/profile';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0 }) }));

test('shows profile data, unavailable actions, and the empty state', async () => {
  let screen: ReactTestRenderer.ReactTestRenderer;
  await act(() => { screen = ReactTestRenderer.create(<ProfileContent profile={exampleProfile} />); });
  expect(screen!.root.findByProps({ children: 'Alex Martin' })).toBeTruthy();
  expect(screen!.root.findByProps({ accessibilityLabel: 'Delete my account' }).props.accessibilityState.disabled).toBe(true);
  await act(() => { screen!.update(<ProfileContent profile={null} />); });
  expect(screen!.root.findByProps({ children: 'Your profile is not available yet.' })).toBeTruthy();
  await act(() => { screen!.unmount(); });
});

test('validates demo login and signs out', async () => {
  const ProfileScreen = require('../src/screens/ProfileScreen').default;
  let screen: ReactTestRenderer.ReactTestRenderer;
  await act(() => { screen = ReactTestRenderer.create(<ProfileScreen />); });
  const signIn = () => screen!.root.findByProps({ accessibilityLabel: 'Sign in' }).props.onPress();
  await act(() => { signIn(); });
  expect(screen!.root.findByProps({ children: 'Enter an email and password to continue.' })).toBeTruthy();
  await act(() => {
    screen!.root.findByProps({ accessibilityLabel: 'Email' }).props.onChangeText('test@example.com');
    screen!.root.findByProps({ accessibilityLabel: 'Password' }).props.onChangeText('demo');
  });
  await act(() => { signIn(); });
  expect(screen!.root.findByProps({ children: 'Alex Martin' })).toBeTruthy();
  await act(() => { screen!.root.findByProps({ accessibilityLabel: 'Sign out' }).props.onPress(); });
  expect(screen!.root.findByProps({ children: 'Welcome back' })).toBeTruthy();
  await act(() => { screen!.unmount(); });
});
