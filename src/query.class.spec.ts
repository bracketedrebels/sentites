import 'jasmine';

import { Query } from './query.class';
import { QueryTypes } from './query.enums';
import { Tag } from './tag.decorator';
import { id } from './tag.helpers';

@Tag() class TAG1 {}
@Tag() class TAG2 {}
@Tag() class TAG3 {}


describe(`Query`, () => {
    it(`should pass correct queries validation`, () => {
        expect(new Query(QueryTypes.all, [])).toBeTruthy();
        expect(new Query(QueryTypes.none, [])).toBeTruthy();
        expect(new Query(QueryTypes.and, [TAG1, TAG2])).toBeTruthy();
        expect(new Query(QueryTypes.and, [TAG1, TAG2, TAG3])).toBeTruthy();
        expect(new Query(QueryTypes.or, [TAG1, TAG2])).toBeTruthy();
        expect(new Query(QueryTypes.or, [TAG1, TAG2, TAG3])).toBeTruthy();
        expect(new Query(QueryTypes.not, [TAG1])).toBeTruthy();
    });
    it(`should not pass incorrect queries validation`, () => {
        expect(() => new Query(QueryTypes.all, [TAG1])).toThrowError();
        expect(() => new Query(QueryTypes.none, [TAG1])).toThrowError();
        expect(() => new Query(QueryTypes.and, [TAG1])).toThrowError();
        expect(() => new Query(QueryTypes.and, [])).toThrowError();
        expect(() => new Query(QueryTypes.or, [TAG1])).toThrowError();
        expect(() => new Query(QueryTypes.or, [])).toThrowError();
        expect(() => new Query(QueryTypes.not, [TAG1, TAG2])).toThrowError();
        expect(() => new Query(QueryTypes.not, [])).toThrowError();
    });
    it(`should be correctly serializable`, () => {
        let [all, none, not, and, or] = [ QueryTypes.all, QueryTypes.none, QueryTypes.not, QueryTypes.and, QueryTypes.or ];
        let [t1, t2] = [ id(TAG1), id(TAG2) ];

        expect((new Query(all, [])).toString())
            .toBe(`{"type":${all},"args":[]}`);
        expect((new Query(none, [])).toString())
            .toBe(`{"type":${none},"args":[]}`);
        expect((new Query(not, [TAG1])).toString())
            .toBe(`{"type":${not},"args":["${t1}"]}`);
        expect((new Query(and, [TAG1, TAG2])).toString())
            .toBe(`{"type":${and},"args":["${t1}","${t2}"]}`);
        expect((new Query(or, [TAG1, TAG2])).toString())
            .toBe(`{"type":${or},"args":["${t1}","${t2}"]}`);
        expect((new Query(or, [TAG1, new Query(not, [TAG2])])).toString())
            .toBe(`{"type":${or},"args":[{"type":${not},"args":["${t2}"]},"${t1}"]}`);
    });
});
