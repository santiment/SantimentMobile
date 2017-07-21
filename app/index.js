/**
 * Created by workplace on 29/01/2017.
 * @flow
 */


import React from 'react';
import AppNavigator from './navigator';
import Store from './store';
import Environment from './config';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.PureComponent {

    /**
     * Settings for push notifications.
     */
    setupPushNotifications = (): void => {
        const PushNotification = require('react-native-push-notification');

        PushNotification.configure({

            /**
             * Optional.
             * Called when Token is generated (iOS and Android).
             * @param {*} token Token.
             */
            onRegister(token) {
                console.log(
                    'Push notification token: ',
                    token,
                );
            },

            /**
             * Required.
             * Called when a remote or local notification is opened or received.
             * @param {*} notification Notification.
             */
            onNotification(notification) {
                console.log(
                    'Did receive notification: ',
                    notification,
                );
            },

            /**
             * Android only.
             * GCM Sender ID.
             * Optional - not required for local notifications,
             * but is needed to receive remote push notifications.
             */
            senderID: 'INPUT_GCM_SENDER_ID',

            /**
             * iOS only.
             * Optional.
             * Permissions to register.
             * All permissions are `true` by default.
             */
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            /**
             * Shows whether the initial notification should be popped automatically.
             * By default, the value is `true`.
             */
            popInitialNotification: true,

            /**
             * Optional.
             * Specified if permissions (iOS) and token (Android and iOS)
             * will be requested or not.
             * If not, you must call `PushNotificationsHandler.requestPermissions()` later.
             * By default, value is `true`.
             */
            requestPermissions: true,
        });
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
