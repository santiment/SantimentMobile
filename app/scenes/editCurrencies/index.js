/**
 * @flow
 */

import React from 'react';

import {
    ListView,
    View,
} from 'react-native';

import {
    observer,
} from 'mobx-react/native';

import AndroidBackButton from 'android-back-button';

import {
    Icon,
    List,
} from 'react-native-elements';

import NavigationBar from 'react-native-navbar';

import Cell from './cell';

import getStyles from './styles';

const propTypes = {
    navigator: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
        pop: React.PropTypes.func.isRequired,
    }).isRequired,
    store: React.PropTypes.shape({
        removeSymbol: React.PropTypes.func.isRequired,
        dataSource: React.PropTypes.any.isRequired,
    }).isRequired,
};

@observer
class EditCurrencies extends React.PureComponent {

    render() {
        const {
            navigator,
            store,
        } = this.props;

        const styles = getStyles();

        const renderRow = (data, sectionID) => (
            <Cell
                symbol={data.displaySymbol}
                onDelete={() => store.removeSymbol(data.symbol)}
            />
        );

        return (
            <View style={styles.container}>

                <NavigationBar
                    title={{ title: 'Edit Portfolio' }}
                    rightButton={
                        <Icon
                            containerStyle={styles.toolbarButton}
                            name="done"
                            onPress={() => {
                                navigator.pop();
                            }}
                        />
                    }
                />

                <List containerStyle={styles.listViewContainer}>
                    <ListView
                        renderRow={renderRow}
                        dataSource={store.dataSource}
                        enableEmptySections
                        removeClippedSubviews={false}
                    />
                </List>

                <AndroidBackButton
                    onPress={() => {
                        navigator.pop();
                        return true;
                    }}
                />
            </View>
        );
    }
}

EditCurrencies.propTypes = propTypes;

export default EditCurrencies;
