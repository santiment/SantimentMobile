/**
 * @flow
 */

import {
    NativeModules,
} from 'react-native';

import Configurations from './configurations.json';

const {
    AppConfiguration,
} = NativeModules;

console.log('Native modules: ', NativeModules);

const configurationName = AppConfiguration.buildConfiguration;

/**
 * Represents current environment.
 * Provides access to environment parameters.
 *
 * All parameters are static, so you can use them
 * without creating instance of `Environment` class.
 *
 * Example of usage:
 *
 * ```javascript
 * // Obtain base URL for Santiment API
 * const apiUrl = Environment.santimentApiUrl;
 * ```
 */
class Environment {

    /**
     * Base URL for Santiment API.
     */
    static get santimentApiUrl(): string {
        return Configurations[configurationName].santimentApiUrl;
    }
}

export default Environment;
