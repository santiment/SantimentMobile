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

    findStartDate = (endDate: Date, requiredNumberOfCandles: number): Date => {
        const endTimestampInMilliseconds = endDate.getTime() / 1000;
        const totalTimeIntervalInMilliseconds = this.durationInMilliseconds * requiredNumberOfCandles;
        const startTimestampInMilliseconds = endTimestampInMilliseconds - totalTimeIntervalInMilliseconds;
        return new Date(startTimestampInMilliseconds);
    }
}
