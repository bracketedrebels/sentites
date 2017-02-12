import { TagClass } from '../manager.interfaces';
import { QueryTypes } from './query.enums';
import { Query } from './query.class';

export function OR(query: Query | TagClass<any>, ...args: Array<Query | TagClass<any>>): Query {
    return new Query(QueryTypes.or, [query, ...args]);
}

export function AND(query: Query | TagClass<any>, ...args: Array<Query | TagClass<any>>): Query {
    return new Query(QueryTypes.and, [query, ...args]);
}

export function NOT( query: Query | TagClass<any> ) {
    return new Query(QueryTypes.not, [query]);
}
