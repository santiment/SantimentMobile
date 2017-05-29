// @flow

'use strict';

/**
 * Represents candlestick period.
 */
export default class CandlestickPeriod {

    constructor(durationInSeconds: number) {
        this._durationInSeconds = durationInSeconds;
    }

    /**
     * Duration in days.
     */
    get durationInDays(): number {
        return this._durationInSeconds / 86400;
    }

    /**
     * Duration in hours.
     */
    get durationInHours(): number {
        return this._durationInSeconds / 3600;
    }

    /**
     * Duration in minutes.
     */
    get durationInMinutes(): number {
        return this._durationInSeconds / 60;
    }

    /**
     * Duration in seconds.
     */
    get durationInSeconds(): number {
        return this._durationInSeconds;
    }

    /**
     * Duration in milliseconds.
     */
    get durationInMilliseconds(): number {
        return this._durationInSeconds * 1000;
    }

    /**
     * String containing formatted period.
     */
    get text(): string {
        if (this.durationInDays >= 1) {
            return `${this.durationInDays}D`;
        } else if (this.durationInHours >= 1) {
            return `${this.durationInHours}H`;
        } else if (this.durationInMinutes >= 1) {
            return `${this.durationInHours}m`;
        } else if (this.durationInSeconds >= 1) {
            return `${this.durationInSeconds}s`;
        } else {
            return '';
        }
    }

    /**
     * Returns start date for candlestick chart.
     * 
     * @param {Date} endDate End date for candlestick chart.
     * @param {number} requiredNumberOfCandles Number of candlesticks to be displayed.
     * @return Start date for candlestick chart.
     */
    findStartDate = (endDate: Date, requiredNumberOfCandles: number): Date => {
        const endTimestampInMilliseconds = endDate.getTime();
        const totalTimeIntervalInMilliseconds = this.durationInMilliseconds * requiredNumberOfCandles;
        const startTimestampInMilliseconds = endTimestampInMilliseconds - totalTimeIntervalInMilliseconds;
        return new Date(startTimestampInMilliseconds);
    }
}
