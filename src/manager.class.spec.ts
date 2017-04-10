import 'jasmine';

import { Entity } from './entity.class';
import { Manager } from './manager.class';
import { ALL } from './query.helpers';

describe(`Manager`, () => {
    const manager = new Manager();

    it(`should create an instance`, () => {
        expect(manager).toBeTruthy();
    });
    it(`should correctly create entities`, () => {
        expect(manager.create() instanceof Entity).toBeTruthy();
    });
    it(`should correctly accumulate created entities`, () => {
        let entities = manager.query(ALL);
        entities.push(manager.create());
        expect(manager.query(ALL).sort()).toEqual(entities.sort());
    });
});
