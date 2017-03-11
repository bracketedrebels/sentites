import 'jasmine';

import { Entity } from './entity.class';
import { Manager } from './manager.class';



describe(`Entities opertaions`, () => {
    const manager = new Manager();

    const TAG1 = manager.createTag(1);
    const TAG2 = manager.createTag(2);
    const TAG3 = manager.createTag({value: 3});

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
        expect(e.mark(new TAG1(43)).getMark(TAG1)).toBe(43);
        expect((<{ value: number }>e.mark(new TAG3({ value: 42 })).getMark(TAG3)).value).toBe(42);
        expect(e.mark(new TAG1()).getMark(TAG1)).toBe(1);
        expect(e.unmark(TAG1).getMark(TAG1)).toBeUndefined();
    });
});
