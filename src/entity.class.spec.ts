import 'jasmine';

import { Entity } from './entity.class';
import { Tag } from './tag.decorator';

@Tag() class TAG1 { constructor(public v = 1) {} }
@Tag() class TAG2 {}

describe(`Entities opertaions`, () => {
    let e = new Entity();

    it(`should create an instance`, () => {
        expect(e).toBeTruthy();
    });
    it(`should correctly be stringified`, () => {
        expect(e.toString().startsWith('ent')).toBeTruthy();
    });
    it(`should correctly be marked`, () => {
        expect(e.mark([new TAG1(42), new TAG2()]).markedWith(TAG1)).toBeTruthy();
        expect(e.markedWith(TAG2)).toBeTruthy();
    });
    it(`should correctly clean marks`, () => {
        expect(e.unmark(TAG1).markedWith(TAG1)).toBeFalsy();
        expect(e.markedWith(TAG2)).toBeTruthy();
        expect(e.mark(new TAG1(23)).unmark([TAG1, TAG2]).markedWith(TAG1)).toBeFalsy();
        expect(e.markedWith(TAG2)).toBeFalsy();
    });
    it(`should correctly check marked state`, () => {
        expect(e.mark(new TAG1()).markedWith(TAG1)).toBeTruthy();
        expect(e.markedWith([TAG1, TAG2], 'or')).toBeTruthy();
        expect(e.markedWith([TAG1, TAG2], 'and')).toBeFalsy();
        expect(e.mark(new TAG2()).markedWith([TAG1, TAG2], 'or')).toBeTruthy();
        expect(e.markedWith([TAG1, TAG2], 'and')).toBeTruthy();
    });
    it(`should correctly get mark`, () => {
        expect(e.mark(new TAG1(43)).getMark(TAG1).v).toBe(43);
        expect(e.mark(new TAG1()).getMark(TAG1).v).toBe(1);
        expect(e.unmark(TAG1).getMark(TAG1)).toBeUndefined();
    });
});
