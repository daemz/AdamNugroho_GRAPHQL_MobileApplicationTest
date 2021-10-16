/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import LaunchDetail from '../src/Screens/Launches/LaunchDetail';
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
import { afterEach, describe } from 'jest-circus';
 
 it('renders correctly', () => {
   renderer.create(<LaunchDetail />);
 });
 