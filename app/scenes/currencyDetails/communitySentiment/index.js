/**
 * @flow
 */

import React from 'react';

import {
    View,
    ScrollView,
    Text,
    Image,
    RefreshControl,
} from 'react-native';

import {
    observer,
} from 'mobx-react/native';

import getStyles from './styles';

const propTypes = {
    store: React.PropTypes.shape({
        aggregate: React.PropTypes.any.isRequired,
    }).isRequired,
};

@observer
class CommunitySentiment extends React.Component {
    
    render() {
        const {
            store,
        } = this.props;

        const styles = getStyles();

        return (
            <ScrollView
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={store.isLoading}
                        onRefresh={store.refresh}
                    />
                }
            >

                <View style={styles.viewContainer}>

                    <View style={styles.column}>
                        <Text style={styles.text}>
                            {`${store.aggregate.bullish}`}
                        </Text>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={require('../../../resources/images/bull.png')}
                            />
                        </View>
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.text}>
                            {`${store.aggregate.catish}`}
                        </Text>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={require('../../../resources/images/cat.png')}
                            />
                        </View>
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.text}>
                            {`${store.aggregate.bearish}`}
                        </Text>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={require('../../../resources/images/bear.png')}
                            />
                        </View>
                    </View>

                </View>

            </ScrollView>
        );
    }
}

CommunitySentiment.propTypes = propTypes;

export default CommunitySentiment;
