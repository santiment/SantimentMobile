/**
 * Created by workplace on 11/05/2017.
 */

import {BackAndroid} from 'react-native';

class AndroidBackButton {
    handleBack: any;

    constructor() {
        this.handleBack = undefined;

        this.subscribe = (handler) => {
            this.handleBack = () => {
                handler();
                return true;
            };
            BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
        };

        this.unsubscribe = () => {
            BackAndroid.removeEventListener('hardwareBackPress', this.handleBack);
            this.handleBack = undefined;
        };
    }
}

const back = new AndroidBackButton();
export default back;