/**
 * @flow
 */

class Clock {

    /**
     * Start timestamp in milliseconds seconds.
     */
    get startTimestamp(): number {
        return this.startTimestamp;
    }

    /**
     * End timestamp in milliseconds.
     */
    get endTimestamp(): number {
        return this.endTimestamp;
    }

    /**
     * Last measured time interval in milliseconds.
     */
    get lastResult(): number {
        return this.lastResult;
    }

    /**
     * Shows whether to use debug mode.
     * When value is `true`, debug information
     * will be displayed in console.
     */
    debug: boolean = false;

    constructor() {
        this.startTimestamp = null;
        this.endTimestamp = null;
        this.lastResult = null;

        this.clearTimestamps = () => {
            this.startTimestamp = null;
            this.endTimestamp = null;
        };
    }

    /**
     * Begins time measurement procedure.
     */
    start = (): void => {
        /**
         * Update start timestamp.
         */
        this.startTimestamp = new Date().getTime();

        /**
         * Output debug information if needed.
         */
        if (this.debug) {
            console.log(
                'Started to measure time interval at moment: ',
                this.startTimestamp,
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
        this.endTimestamp = new Date().getTime();

        /**
         * Obtain measured time interval.
         */
        const measuredTimeIntervalInMilliseconds = this.endTimestamp - this.startTimestamp;

        /**
         * Update last result.
         */
        this.lastResult = measuredTimeIntervalInMilliseconds;

        /**
         * Output debug information if needed.
         */
        if (this.debug) {
            console.log(
                'Finished to measure time interval at moment: ',
                this.endTimestamp,
                '\n',
                'Result time: ',
                measuredTimeIntervalInMilliseconds,
                ' milliseconds',
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

export default Clock;
