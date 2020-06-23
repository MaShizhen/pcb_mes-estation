import { AppRegistry } from 'react-native';
import App from './dist/app/index'
import { name as appName } from './app.json';

console.ignoredYellowBox = ['Setting a timer'];

AppRegistry.registerComponent(appName, () => App);
