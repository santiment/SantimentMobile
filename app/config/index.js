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
     * Santiment data.
     * Everything that is related to Santiment mobile app and server.
     */
    santiment: {
        /**
         * URL for Santiment API.
         */
        apiUrl: Config.SANTIMENT_API_URL,
    },

    /**
     * Android-related data.
     */
    android: {
        gcmSenderId: Config.ANDROID_GCM_SENDER_ID,
    },
};

export default Environment;
