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

import ImageCollection from '../../../resources/images';

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
                                source={ImageCollection.bull}
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
                                source={ImageCollection.cat}
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
                                source={ImageCollection.bear}
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
