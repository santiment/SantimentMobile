/**
 * @flow
 */

import {
    Platform,
} from 'react-native';
import PushNotification from 'react-native-push-notification';

class PushNotificationManager {

    /**
     * Configures push notification manager
     * before its usage.
     *
     * @param {Object} configuration Object that describes preferred behavior
     * for push notification manager.
     *
     * Example of configuration object:
     * ```
     * {
     *      androidGcmSenderId: 'INSERT_YOUR_GCM_SENDER_ID_HERE',
     *
     *      onIOSToken(token) {
     *          // Your implementation here...
     *      },
     *
     *      onAndroidToken(token) {
     *          // Your implementation here...
     *      },
     *
     *      onReceivedNotification(notification) {
     *          // Your implementation here...
     *      }
     * }
     * ```
     *
     * @return `PushNotificationManager` class for supporting call chains.
     */
    static setup = (
        configuration: Object,
    ): typeof PushNotificationManager => {
        /**
         * Setup PushNotification library.
         */
        PushNotification.configure({
            /**
             * Optional.
             * Called when Token is generated (iOS and Android).
             * @param {*} token Token.
             */
            onRegister(token) {
                Platform.select({
                    ios: () => configuration.onIOSToken(token),
                    android: () => configuration.onAndroidToken(token),
                });
            },

            /**
             * Required.
             * Called when a remote or local notification is opened or received.
             * @param {*} notification Notification.
             */
            onNotification(notification) {
                this.onReceivedNotification(
                    notification,
                );
            },

            /**
             * Android only.
             * GCM Sender ID.
             * Optional - not required for local notifications,
             * but is needed to receive remote push notifications.
             */
            senderID: configuration.androidGcmSenderId,

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
            requestPermissions: false,
        });

        /**
         * Return current class to support call chains.
         */
        return PushNotificationManager;
    }
    
    /**
     * Requests push notification permissions
     * from user.
     *
     * @return `PushNotificationManager` class for supporting call chains.
     */
    static requestPermissions = (): typeof PushNotificationManager => {
        /**
         * Request push notification permissions.
         */
        PushNotification.requestPermissions();

        /**
         * Return current class to support call chains.
         */
        return PushNotificationManager;
    }
}

export default PushNotificationManager;
