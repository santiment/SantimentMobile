/**
 * @flow
 */

import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import {
    observer,
} from 'mobx-react/native';

import {
    GiftedChat,
    Bubble,
} from 'react-native-gifted-chat';

import Palette from '../../../resources/colors';

import getStyles from './styles';

const propTypes = {
    store: React.PropTypes.shape({
        feed: React.PropTypes.any.isRequired,
    }).isRequired,
};

@observer
class Feed extends React.Component {
    
    componentDidMount() {
        /**
         * Obtain UI store.
         */
        const uiStore = this.props.store;

        /**
         * Start refreshing UI store.
         */
        uiStore.startToRefreshPeriodically();
    }

    componentWillUnmount() {
        /**
         * Obtain UI store.
         */
        const uiStore = this.props.store;

        /**
         * Stop refreshing UI store.
         */
        uiStore.stopToRefreshPeriodically();
    }

    render() {
        const {
            store,
        } = this.props;

        const styles = getStyles();

        const renderBubble = props => (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        marginRight: 10,
                    },
                }}
            />
        );

        let changeColor;

        if (store.ticker.dailyChangePercent > 0) {
            changeColor = Palette.forestGreenOne;
        } else if (store.ticker.dailyChangePercent < 0) {
            changeColor = Palette.fireBrick;
        } else {
            changeColor = Palette.spunPearl;
        }

        return (
            <View style={styles.container}>
                <View style={styles.currencyRowContainer}>

                    <View style={styles.priceColumn}>

                        <Text style={[styles.text, styles.priceText]}>
                            {store.ticker.price}
                        </Text>

                        <Text style={[styles.text, styles.changeText, { color: changeColor }]}>
                            {`${store.ticker.dailyChangePercent}%`}
                        </Text>

                    </View>

                    <View style={styles.periodColumn}>
                        <Text style={styles.periodText}>Poloniex</Text>
                    </View>
                </View>

                <GiftedChat
                    messages={store.feed}
                    onSend={() => {}}
                    renderInputToolbar={() => (<View />)}
                    minInputToolbarHeight={0}
                    renderBubble={renderBubble}
                />
            </View>
        );
    }
}

Feed.propTypes = propTypes;

export default Feed;
