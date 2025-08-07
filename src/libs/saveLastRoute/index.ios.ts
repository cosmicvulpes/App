import {AppState} from 'react-native';
import {updateLastRoute} from '@libs/actions/App';
import Navigation from '@libs/Navigation/Navigation';
import {encodeLastRoute} from '@libs/saveLastRoute/utils';

export default function saveLastRoute() {
    updateLastRoute(encodeLastRoute(Navigation.getActiveRoute()));

    // Attach a one-time listener to clear the value when we return to foreground. 
    // This is needed to avoid unwanted navigation to the last route when the app is killed.
    const sub = AppState.addEventListener('change', (state) => {
        if (state === 'active') {
            updateLastRoute('');
            sub.remove();
        }
    });
}