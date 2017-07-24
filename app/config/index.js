/**
 * @flow
 */

import Config from 'react-native-config';

/**
 * Current configuration.
 */
const Environment = {
    
    /**
     * Type and purpose of current build.
     */
    buildType: {
        /**
         * Shows whether current build is production.
         */
        isProduction: Config.ENVIRONMENT_TYPE === 'production',

        /**
         * Shows whether current build is staging.
         */
        isStaging: Config.ENVIRONMENT_TYPE === 'staging',
    },

    /**
     * Santiment settings.
     */
    santiment: {
        /**
         * URL for Santiment API.
         */
        apiUrl: Config.SANTIMENT_API_URL,
    },

    /**
     * Fabric settings.
     */
    fabric: {
        /**
         * Fabric API key.
         */
        apiKey: Config.FABRIC_API_KEY,

        /**
         * Fabric API secret.
         */
        apiSecret: Config.FABRIC_API_SECRET,
    },

    /**
     * Bugsnag settings.
     */
    bugsnag: {
        /**
         * Bugsnag API key.
         */
        apiKey: Config.BUGSNAG_API_KEY,
    },

    /**
     * Android settings.
     */
    android: {
        /**
         * Android GCM sender ID.
         * Required for push notifications.
         */
        gcmSenderId: Config.ANDROID_GCM_SENDER_ID,
    },
};

export default Environment;
