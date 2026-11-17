import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { AccessibilityInfo, LayoutAnimation } from 'react-native';
import WishlistScreen from '../src/screens/WishlistScreen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({ useNavigation: () => ({ navigate: mockNavigate }) }));
jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0 }) }));

test('reorders choices and opens Explore', async () => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
  const animate = jest.spyOn(LayoutAnimation, 'configureNext');
  let screen: ReactTestRenderer.ReactTestRenderer;
  await act(async () => { screen = ReactTestRenderer.create(<WishlistScreen />); });
  const moveDown = screen!.root.findByProps({ accessibilityLabel: 'Move ETH Zurich down' });
  await act(() => { moveDown.props.onPress(); });
  expect(animate).toHaveBeenCalled();
  expect(screen!.root.findByProps({ accessibilityLabel: 'Move ETH Zurich up' }).props.disabled).toBe(false);
  expect(screen!.root.findByProps({ accessibilityLabel: 'Move University of Toronto up' }).props.disabled).toBe(true);
  const explore = screen!.root.findAllByProps({ accessibilityRole: 'button' }).find(button => button.findAllByProps({ children: 'Choice 5 is empty: explore' }).length > 0);
  await act(() => { explore!.props.onPress(); });
  expect(mockNavigate).toHaveBeenCalledWith('Explore');
  await act(() => { screen!.unmount(); });
  jest.restoreAllMocks();
});
