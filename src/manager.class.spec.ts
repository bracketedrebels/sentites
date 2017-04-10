import 'jasmine';

import { Entity } from './entity.class';
import { Manager } from './manager.class';
import { Tag } from './tag.decorator';
import { ALL } from './query.helpers';

@Tag() class TAG {}

describe(`Manager`, () => {
    const manager = new Manager();
    const managerWithCache = new Manager(1);

    it(`should create an instance`, () => {
        expect(manager).toBeTruthy();
        expect(managerWithCache).toBeTruthy();
    });
    it(`should correctly create entities`, () => {
        expect(manager.create() instanceof Entity).toBeTruthy();
        expect(managerWithCache.create() instanceof Entity).toBeTruthy();
    });
    it(`should correctly accumulate created entities`, () => {
        let entities = manager.query(ALL);
        entities.push(manager.create());
        expect(manager.query(ALL).sort()).toEqual(entities.sort());
        entities = managerWithCache.query(ALL);
        entities.push(managerWithCache.create());
        expect(managerWithCache.query(ALL).sort()).toEqual(entities.sort());
    });
    it(`should correctly cache queries`, () => {
        for (let i = 0; i < 100000; i++) {
            managerWithCache.create()
        }
        for (let j = 0; j < 10; j++) {
            managerWithCache.create();
            let start = Date.now();
            managerWithCache.query(TAG);
            let nonCachedQueryExecutionDuration = Date.now() - start;
            start = Date.now();
            managerWithCache.query(TAG);
            let cachedQueryExecutionDuration = Date.now() - start;

            expect(nonCachedQueryExecutionDuration).toBeGreaterThan(cachedQueryExecutionDuration);
        }
    });
});
