import { getSunsetRise } from './RoadCastFunctions';
import SunriseIcon from './icons/sunrise.svg';
import SunsetIcon from './icons/sunset.svg';

describe('getSunsetRise', () => {
    const mockData = {
        sunrise: '2023-10-27T06:00:00',
        sunset: '2023-10-27T18:00:00'
    };

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('Day > 0 always returns Sunrise', () => {
        const result = getSunsetRise(mockData, 1);
        expect(result.img).toBe(SunriseIcon);
        expect(result.main).toBe('06:00:00');
    });

    test('Day = 0, Time before Sunrise returns Sunrise', () => {
        // Set time to 05:00
        jest.setSystemTime(new Date('2023-10-27T05:00:00'));
        const result = getSunsetRise(mockData, 0);
        expect(result.img).toBe(SunriseIcon);
    });

    test('Day = 0, Time after Sunrise returns Sunset', () => {
        // Set time to 07:00
        jest.setSystemTime(new Date('2023-10-27T07:00:00'));
        const result = getSunsetRise(mockData, 0);
        expect(result.img).toBe(SunsetIcon);
    });

    test('Day = 0, Time after Sunset returns Sunset', () => {
        // Set time to 19:00
        jest.setSystemTime(new Date('2023-10-27T19:00:00'));
        const result = getSunsetRise(mockData, 0);
        expect(result.img).toBe(SunsetIcon);
    });
});
