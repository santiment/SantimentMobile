/**
 * Created by workplace on 29/01/2017.
 * @flow
 */

'use strict';

import React from 'react';

import AppNavigator from './navigator'
import Store from './store'

class App extends React.Component {
    render() {
        return (
            <AppNavigator store={Store}/>
        )
    }
}

export default App