/**
 * Gets whether the app was terminated gracefully by the system.
 * On non-iOS platforms, this always returns false.
 */
function getAppTerminatedGracefully(): Promise<boolean> {
    return Promise.resolve(false);
}

export default getAppTerminatedGracefully;
