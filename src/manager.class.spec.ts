import 'jasmine';

import { Entity } from './entity.class';
import { Manager } from './manager.class';
import { ALL } from './query.helpers';
import { Tag } from './tag.class';



describe(`Manager`, () => {
    const manager = new Manager();

    it(`should create an instance`, () => {
        expect(manager).toBeTruthy();
    });
    it(`should correctly create entities`, () => {
        expect(manager.createEntity() instanceof Entity).toBeTruthy();
    });
    it(`should correctly accumulate created entities`, () => {
        let entities = manager.queryEntities(ALL);
        entities.push(manager.createEntity());
        expect(manager.queryEntities(ALL).sort()).toEqual(entities.sort());
    });
    it(`should correctly create tags`, () => {
        let CreatedTag = manager.createTag(1);
        let lTag = new CreatedTag();
        expect(lTag instanceof CreatedTag).toBeTruthy();
        expect(lTag instanceof Tag).toBeTruthy();
        expect(lTag.value).toBe(1);
    });
});
