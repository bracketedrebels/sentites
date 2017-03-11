import 'jasmine';

import { Entity } from './entity.class';
import { Manager } from './manager.class';
import { QueryExecutor } from './executor.class';
import { AND, NOT, OR, ALL, NONE } from './query.helpers';



describe(`Queries executor`, () => {
    const manager = new Manager();

    const [TAG1, TAG2, TAG3, TAG4, TAG5, TAG_NONE] = [
        manager.createTag(1),
        manager.createTag(2),
        manager.createTag(3),
        manager.createTag(4),
        manager.createTag(5),
        manager.createTag('none'),
    ];

    const [e1, e2, e3, e4, e5] = [ new Entity(), new Entity(), new Entity(), new Entity(), new Entity() ];
    let entities = [e1, e2, e3, e4, e5];
    const executor = new QueryExecutor(entities);

    e1.mark(new TAG1());
    e2.mark([new TAG1(), new TAG2()]);
    e3.mark([new TAG3(), new TAG4()]);
    e4.mark([new TAG5(), new TAG4()]);
    e5.mark([new TAG5(), new TAG4(), new TAG1(), new TAG2()]);



    it(`should create an instance`, () => {
        expect(executor).toBeTruthy();
    });
    it(`should correctly execute tag query`, () => {
        expect(executor.execute(TAG_NONE)).toEqual([]);
        expect(executor.execute(TAG3)).toEqual([e3]);
        expect(executor.execute(TAG1).sort()).toEqual([e1, e2, e5].sort());
    });
    it(`should correctly execute OR query`, () => {
        expect(executor.execute(OR(TAG5, TAG4)).sort()).toEqual([e3, e4, e5].sort());
        expect(executor.execute(OR(TAG3, TAG3))).toEqual([e3]);
        expect(executor.execute(OR(TAG1, TAG1, TAG1)).sort()).toEqual([e1, e2, e5].sort());
    });
    it(`should correctly execute AND query`, () => {
        expect(executor.execute(AND(TAG5, TAG4)).sort()).toEqual([e4, e5].sort());
        expect(executor.execute(AND(TAG3, TAG2))).toEqual([]);
        expect(executor.execute(AND(TAG1, TAG2, TAG5))).toEqual([e5]);
        expect(executor.execute(AND(TAG2, TAG2, TAG2))).toEqual([e2, e5]);
    });
    it(`should correctly execute NOT query`, () => {
        expect(executor.execute(NOT(TAG5)).sort()).toEqual([e1, e2, e3].sort());
        expect(executor.execute(NOT(TAG1))).toEqual([e3, e4].sort());
    });
    it(`should correctly implement associativity`, () => {
        expect(executor.execute(OR(TAG1, OR(TAG2, TAG3))).sort()).toEqual(
               executor.execute(OR(OR(TAG1, TAG2), TAG3)).sort());
    });
    it(`should correctly implement commutativity`, () => {
        expect(executor.execute(OR(TAG2, TAG3)).sort()).toEqual(
               executor.execute(OR(TAG3, TAG2)).sort());
    });
    it(`should correctly implement absorption`, () => {
        expect(executor.execute(OR(TAG1, AND(TAG1, TAG2))).sort()).toEqual(
               executor.execute(AND(TAG1, OR(TAG1, TAG2))).sort());
    });
    it(`should correctly implement constant rules`, () => {
        expect(executor.execute(NOT(NONE)).sort()).toEqual(
               executor.execute(ALL).sort());
        expect(executor.execute(NOT(ALL)).sort()).toEqual(
               executor.execute(NONE).sort());
    });
    it(`should correctly implement identity rules`, () => {
        expect(executor.execute(OR(TAG1, ALL)).sort()).toEqual(
               executor.execute(ALL).sort());
        expect(executor.execute(OR(TAG1, NONE)).sort()).toEqual(
               executor.execute(TAG1).sort());
        expect(executor.execute(AND(TAG2, ALL)).sort()).toEqual(
               executor.execute(TAG2).sort());
        expect(executor.execute(AND(TAG2, NONE)).sort()).toEqual(
               executor.execute(NONE).sort());
    });
    it(`should correctly implement distributivity`, () => {
        expect(executor.execute(OR(TAG1, AND(TAG4, TAG5))).sort()).toEqual(
               executor.execute(AND(OR(TAG1, TAG5), OR(TAG1, TAG5))).sort());
        expect(executor.execute(AND(TAG1, OR(TAG4, TAG5))).sort()).toEqual(
               executor.execute(OR(AND(TAG1, TAG4), AND(TAG1, TAG5))).sort());
    });
    it(`should correctly implement complements rule`, () => {
        expect(executor.execute(OR(TAG1, NOT(TAG1))).sort()).toEqual(
               executor.execute(ALL).sort());
        expect(executor.execute(AND(TAG1, NOT(TAG1))).sort()).toEqual(
               executor.execute(NONE).sort());
    });
    it(`should correctly implement double negation law`, () => {
        expect(executor.execute(NOT(NOT(TAG1))).sort()).toEqual(
               executor.execute(TAG1).sort());
    });
    it(`should correctly implement De Morgan's laws`, () => {
        expect(executor.execute(NOT(AND(TAG1, TAG2))).sort()).toEqual(
               executor.execute(OR(NOT(TAG1), NOT(TAG2))).sort());
        expect(executor.execute(NOT(OR(TAG1, TAG2))).sort()).toEqual(
               executor.execute(AND(NOT(TAG1), NOT(TAG2))).sort());
    });
    it(`should correctly implement Blake-Porezky laws`, () => {
        expect(executor.execute(OR(TAG1, AND(NOT(TAG1), TAG2))).sort()).toEqual(
               executor.execute(OR(TAG1, TAG2)).sort());
        expect(executor.execute(AND(TAG1, OR(NOT(TAG1), TAG2))).sort()).toEqual(
               executor.execute(AND(TAG1, TAG2)).sort());
    });
});
