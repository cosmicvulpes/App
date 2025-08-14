import {useState, useEffect} from 'react';
import useOnyx from '@hooks/useOnyx';
import ONYXKEYS from '@src/ONYXKEYS';
import getAppTerminatedGracefully from '@libs/getAppTerminatedGracefully';


/**
 * Custom hook that checks if the app was terminated gracefully and returns the last route if so.
 * On iOS, this checks if the app was terminated by the system (not by the user).
 * If the app was terminated gracefully, it returns the last route from Onyx.
 * Otherwise, it returns null.
 */
function useLastRouteWithTerminationCheck(): string | null {
    const [lastRoute] = useOnyx(ONYXKEYS.LAST_ROUTE, {canBeMissing: true});
    const [shouldNavigate, setShouldNavigate] = useState(false);
    
    useEffect(() => {
        getAppTerminatedGracefully().then((terminatedGracefully: boolean) => {
            console.log('shouldNavigate: ', terminatedGracefully);
            setShouldNavigate(terminatedGracefully);
        }).catch((error) => {
            console.error('Error checking if app was terminated gracefully:', error);
        });
    }, []);
    
    return shouldNavigate ? lastRoute || null : null;
}

export default useLastRouteWithTerminationCheck;
