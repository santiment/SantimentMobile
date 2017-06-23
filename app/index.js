/**
 * Created by workplace on 29/01/2017.
 * @flow
 */


import React from 'react';

import AppNavigator from './navigator';
import Store from './store';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.PureComponent {
    render() {
        return (
            <AppNavigator store={Store} />
        );
    }
}

export default App;
