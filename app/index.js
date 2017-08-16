/**
 * Created by workplace on 29/01/2017.
 * @flow
 */


import React from 'react';
import AppNavigator from './navigator';
import Store from './store';
import Environment from './config';
import PushNotificationManager from './utils/pushNotificationManager';
import * as SantimentApiClient from './api/santiment';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.PureComponent {

    /**
     * Settings for push notifications.
     */
    setupPushNotifications = (): void => {
        PushNotificationManager.setup({
            androidGcmSenderId: Environment.android.gcmSenderId,

            onIOSToken(token) {
                console.log(
                    'PushNotificationManager did receive iOS token: ',
                    token,
                );

                SantimentApiClient.subscribeIOSDevice(
                    token,
                );
            },

            onAndroidToken(token) {
                console.log(
                    'PushNotificationManager did receive Android token: ',
                    token,
                );

                SantimentApiClient.subscribeAndroidDevice(
                    token,
                );
            },

            onReceivedNotification(notification) {
                console.log(
                    'PushNotificationManager did receive notification: ',
                    notification,
                );
            },
        }).requestPermissions();
    }
    
    /**
     * Settings for YellowBox.
     * When app is running in production mode,
     * YellowBox warnings should be disabled.
     */
    setupYellowBoxWarnings = (): void => {
        if (Environment.buildType.isProduction) {
            console.disableYellowBox = true;
        } else if (Environment.buildType.isStaging) {
            console.disableYellowBox = false;
        }
    };

    render() {
        /**
         * Initialize push notification handlers.
         */
        this.setupPushNotifications();

        /**
         * Setup YellowBox warnings.
         */
        this.setupYellowBoxWarnings();

        /**
         * Return navigator.
         */
        return (
            <AppNavigator store={Store} />
        );
    }
}

export default App;
