import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type HandleAppStateCB = (newState: AppStateStatus) => void;

export const useAppState = (handleAppStateCB?: HandleAppStateCB): AppStateStatus | undefined => {
    const [appStatus, setAppStatus] = useState<AppStateStatus | undefined>();

    const handleAppStateChange = (newState: AppStateStatus): void => {
        setAppStatus(newState);
        handleAppStateCB?.(newState);
    };

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, []);

    return appStatus;
};
