import {NativeModules} from 'react-native';

type AppTerminationHandler = {
    getAppTerminatedGracefully: (callback: (terminatedGracefully: boolean) => void) => void;
};

/**
 * Gets whether the app was terminated gracefully by the system.
 * On iOS, this checks if the app was terminated by the system (not by the user).
 */
function getAppTerminatedGracefully(): Promise<boolean> {
    return new Promise((resolve) => {
        const appTerminationHandler = NativeModules.AppTerminationHandler as AppTerminationHandler;
        if (!appTerminationHandler) {
            console.warn('AppTerminationHandler native module not found');
            resolve(false);
            return;
        }
        
        appTerminationHandler.getAppTerminatedGracefully((terminatedGracefully: boolean) => {
            console.log('terminatedGracefully', terminatedGracefully);
            appTerminationHandler.getAppTerminatedGracefully((nextTerminatedGracefully: boolean) => {
                console.log('next terminatedGracefully', nextTerminatedGracefully);
            });
            resolve(terminatedGracefully);
        });
    });
}

export default getAppTerminatedGracefully;
