import { TagClass } from './manager.interfaces';
import { QueryTypes } from './query.enums';
import { Query } from './query.class';

export function OR(q1: Query | TagClass<any>, q2: Query | TagClass<any>, ...args: Array<Query | TagClass<any>>): Query {
    return new Query(QueryTypes.or, [q1, q2, ...args]);
}

export function AND(q1: Query | TagClass<any>, q2: Query | TagClass<any>, ...args: Array<Query | TagClass<any>>): Query {
    return new Query(QueryTypes.and, [q1, q2, ...args]);
}

export function NOT( q: Query | TagClass<any> ): Query {
    return new Query(QueryTypes.not, [q]);
}

export const ALL = new Query(QueryTypes.all, []);
export const NONE = new Query(QueryTypes.none, []);
