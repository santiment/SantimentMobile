'use strict';

export default class Clock {

    /**
     * Start timestamp in milliseconds seconds.
     */
    get startTimestamp(): number {
        return this._startTimestamp;
    }

    /**
     * End timestamp in milliseconds.
     */
    get endTimestamp(): number {
        return this._endTimestamp;
    }

    /**
     * Last measured time interval in milliseconds.
     */
    get lastResult(): number {
        return this._lastResult;
    }

    /**
     * Shows whether to use debug mode.
     * When value is `true`, debug information
     * will be displayed in console.
     */
    debug: boolean = false;

    constructor() {
        this._startTimestamp = null;
        this._endTimestamp = null;
        this._lastResult = null;

        this.clearTimestamps = () => {
            this._startTimestamp = null;
            this._endTimestamp = null;
        };
    }

    /**
     * Begins time measurement procedure.
     */
    start = (): void => {
        /**
         * Update start timestamp.
         */
        this._startTimestamp = new Date().getTime();

        /**
         * Output debug information if needed.
         */
        if (this.debug) {
            console.log(
                "Started to measure time interval at moment: ",
                this.startTimestamp
            );
        }
    };

    /**
     * Ends time measurement procedure.
     * 
     * @return Measured time interval in milliseconds.
     */
    stop = (): number => {
        /**
         * Update end timestamp.
         */
        this._endTimestamp = new Date().getTime();

        /**
         * Obtain measured time interval.
         */
        const measuredTimeIntervalInMilliseconds = this.endTimestamp - this.startTimestamp;

        /**
         * Update last result.
         */
        this._lastResult = measuredTimeIntervalInMilliseconds;

        /**
         * Output debug information if needed.
         */
        if (this.debug) {
            console.log(
                "Finished to measure time interval at moment: ",
                this.endTimestamp,
                "\n",
                "Result time: ",
                measuredTimeIntervalInMilliseconds,
                " milliseconds"
            );
        }

        /**
         * Clear timestamps.
         */
        this.clearTimestamps();

        /**
         * Return measured time interval.
         */
        return measuredTimeIntervalInMilliseconds;
    };
}
