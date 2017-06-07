/**
 * @flow
 */

import React from 'react';

import {
    Navigator,
    View,
    StyleSheet,
} from 'react-native';

import Currencies from '../scenes/currencies';

import CurrencyDetails from '../scenes/currencyDetails';

import AddCurrency from '../scenes/addCurrency';

import EditCurrencies from '../scenes/editCurrencies';

import * as Routes from './routes';

import getStyles from './styles';

const propTypes = {
    store: React.PropTypes.shape({
        ui: React.PropTypes.shape({
            currencies: React.PropTypes.object.isRequired,
            currencyDetails: React.PropTypes.object.isRequired,
            addCurrency: React.PropTypes.object.isRequired,
            editCurrencies: React.PropTypes.object.isRequired,
        }).isRequired,
    }).isRequired,
};

class AppNavigator extends React.Component {
    
    render() {
        const { store } = this.props;

        const styles = getStyles();

        return (
            <Navigator
                style={styles.navigator}
                configureScene={(route, routeStack) => {
                    switch (route.name) {
                    case Routes.CurrenciesRoute:
                        return Navigator.SceneConfigs.PushFromRight;
                    case Routes.CurrencyDetailsRoute:
                        return Navigator.SceneConfigs.PushFromRight;
                    case Routes.AddCurrencyRoute:
                        return {
                            ...Navigator.SceneConfigs.FloatFromBottom,
                            gestures: {
                            },
                        };
                    case Routes.EditCurrenciesRoute:
                        return {
                            ...Navigator.SceneConfigs.FloatFromBottom,
                            gestures: {
                            },
                        };
                    default:
                        return Navigator.SceneConfigs.PushFromRight;
                    }
                }}
                renderScene={(route, navigator) => {
                    switch (route.name) {
                    case Routes.CurrenciesRoute:
                        return (
                            <Currencies
                                navigator={navigator}
                                store={store.ui.currencies}
                            />
                        );
                    case Routes.CurrencyDetailsRoute:
                        return (
                            <CurrencyDetails
                                navigator={navigator}
                                store={store.ui.currencyDetails}
                            />
                        );
                    case Routes.AddCurrencyRoute:
                        return (
                            <AddCurrency
                                navigator={navigator}
                                store={store.ui.addCurrency}
                            />
                        );
                    case Routes.EditCurrenciesRoute:
                        return (
                            <EditCurrencies
                                navigator={navigator}
                                store={store.ui.editCurrencies}
                            />
                        );
                    default:
                        return (
                            <View />
                        );
                    }
                }}
                initialRoute={{ name: Routes.CurrenciesRoute }}
            />
        );
    }
}

AppNavigator.propTypes = propTypes;

export default AppNavigator;
