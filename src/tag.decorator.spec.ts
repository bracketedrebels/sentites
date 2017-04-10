import 'jasmine';

import { Tag } from './tag.decorator';
import { id } from './tag.helpers';

@Tag() class TAG1 {}
@Tag() class TAG2 {}


describe(`Tag decorator`, () => {
    it(`should correctly decorate tag`, () => {
        expect(id(TAG1).includes('tag')).toBeTruthy();
        expect(id(TAG2).includes('tag')).toBeTruthy();
    });
    it(`should never repeat tag mark`, () => {
        expect(id(TAG1) === id(TAG2)).toBeFalsy();
    });
});
