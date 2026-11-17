import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { ResultContent } from '../src/screens/ResultScreen';
import { exampleResult } from '../src/data/result';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0 }) }));

test('renders result data and the empty state', async () => {
  let screen: ReactTestRenderer.ReactTestRenderer;
  await act(() => { screen = ReactTestRenderer.create(<ResultContent result={exampleResult} />); });
  expect(screen!.root.findByProps({ children: 'University of Toronto' })).toBeTruthy();
  await act(() => { screen!.update(<ResultContent result={null} />); });
  expect(screen!.root.findByProps({ children: 'No result available' })).toBeTruthy();
  expect(screen!.root.findAllByProps({ children: 'University of Toronto' })).toHaveLength(0);
  await act(() => { screen!.unmount(); });
});
