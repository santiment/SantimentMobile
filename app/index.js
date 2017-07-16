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
    
    configureApp = (): void => {
        if (Environment.buildType.isProduction) {
            console.disableYellowBox = true;
        } else if (Environment.buildType.isStaging) {
            console.disableYellowBox = false;
        }
    };

    render() {
        this.configureApp();

        return (
            <AppNavigator store={Store} />
        );
    }
}

export default App;
