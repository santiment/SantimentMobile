/**
 * @flow
 */

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import {
    observer,
} from 'mobx-react/native';

import {
    GiftedChat,
    Bubble,
} from 'react-native-gifted-chat';

import Clock from '../../../utils/clock';

const propTypes = {
    store: React.PropTypes.shape({
        feed: React.PropTypes.any.isRequired,
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
    },
    currencyRowContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333333',
    },
    priceColumn: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    priceText: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: '500',
        color: '#e6e6e6',
    },
    changeText: {
        marginLeft: 10,
        textAlign: 'left',
        fontSize: 16,
    },
    periodColumn: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginRight: 10,
    },
    periodButton: {
        paddingTop: 5,
        paddingBottom: 5,
        height: 30,
        backgroundColor: '#454545',
    },
    periodText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#cdcdcd',
        textAlign: 'center',
    },
});

const feedRefreshPeriod = 5000;

@observer
class Feed extends React.Component {
    constructor(props) {
        super(props);

        /**
         * Initialize appearance clock and
         * start to measure time interval.
         */
        this.appearanceClock = new Clock();
        this.appearanceClock.start();

        /**
         * Initialize state.
         */
        this.state = {
            didAppear: false,
        };
    }

    componentDidMount() {
        /**
         * Obtain UI store.
         */
        const uiStore = this.props.store;

        /**
         * Create timer for updating UI store.
         */
        this.refreshStoreTimerId = setInterval(
            () => {
                /**
                 * Update UI store.
                 */
                uiStore.refresh();
            },
            feedRefreshPeriod,
        );

        /**
         * Update state.
         */
        this.setState({
            didAppear: true,
        });

        /**
         * End to measure appearance time interval.
         */
        const appearanceTimeInterval = this.appearanceClock.stop();

        console.log(
            'Feed scene did appear in ',
            appearanceTimeInterval,
            ' milliseconds',
        );
    }

    componentWillUnmount() {
        clearInterval(
            this.refreshStoreTimerId,
        );
    }

    appearanceClock: Clock;

    refreshStoreTimerId: any;

    render() {
        const { store } = this.props;

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
            changeColor = '#27aa36';
        } else if (store.ticker.dailyChangePercent < 0) {
            changeColor = '#bd2c27';
        } else {
            changeColor = '#b1b1b2';
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
