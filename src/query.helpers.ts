import { TagClass } from './manager.interfaces';
import { QueryTypes } from './query.enums';
import { Query } from './query.class';

/**
 * Entities query implementing OR boolean logic. This OR operator has
 * no upper limit on arguments count. Any argument can be either Tag
 * or another query.
 * @returns query instance that can be cached and passed to 
 *          Manager.queryEntities as argument for query execution over
 *          the Manager local storage.
 */
export function OR(q1: Query | TagClass<any>, q2: Query | TagClass<any>, ...args: Array<Query | TagClass<any>>): Query {
    return new Query(QueryTypes.or, [q1, q2, ...args]);
}

/**
 * Entities query implementing AND boolean logic. This AND operator has
 * no upper limit on arguments count. Any argument can be either Tag
 * or another query.
 * @returns query instance that can be cached and passed to 
 *          Manager.queryEntities as argument for query execution over
 *          the Manager local storage.
 */
export function AND(q1: Query | TagClass<any>, q2: Query | TagClass<any>, ...args: Array<Query | TagClass<any>>): Query {
    return new Query(QueryTypes.and, [q1, q2, ...args]);
}

/**
 * Entities query implementing NOT boolean logic. Accepts exactly none
 * argument, either Tag or query.
 * @returns query instance that can be cached and passed to 
 *          Manager.queryEntities as argument for query execution over
 *          the Manager local storage.
 */
export function NOT( q: Query | TagClass<any> ): Query {
    return new Query(QueryTypes.not, [q]);
}

/**
 * Special query that simulates boolean 1. It means that querying
 * entities via that query gives you all entites of manager storage.
 * @returns query instance that can be cached and passed to 
 *          Manager.queryEntities as argument for query execution over
 *          the Manager local storage.
 */
export const ALL = new Query(QueryTypes.all, []);
/**
 * Special query that simulates boolean 0. It means that querying
 * entities via that query gives you an empty entites list.
 * @returns query instance that can be cached and passed to 
 *          Manager.queryEntities as argument for query execution over
 *          the Manager local storage.
 */
export const NONE = new Query(QueryTypes.none, []);
