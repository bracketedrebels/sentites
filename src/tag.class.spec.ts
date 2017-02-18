import 'jasmine';

import { Tag } from './tag.class';



describe(`Tag`, () => {
    it(`should create an instance`, () => {
        expect(new Tag('uid', 1)).toBeTruthy();
    });
    it(`should correctly expose info`, () => {
        let lTag = new Tag('uid', 42);
        expect(lTag.toString()).toBe('uid');
        expect(lTag.value).toBe(42);
    });
});
