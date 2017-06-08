/**
 * @flow
 */

import {
    RNConfig,
} from 'react-native';

import Configurations from './configurations.json';

const configurationName = RNConfig.buildEnvironment;

class Environment {

    static get santimentApiUrl(): string {
        return Configurations[configurationName].santimentApiUrl;
    }
}

export default Environment;
