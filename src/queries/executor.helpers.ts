import * as _ from 'underscore';

import { Entity } from '../entity.class';
import { TagClass } from '../manager.interfaces';




export function andExecutor( tags: TagClass<any>[], ents: Entity[] ): Entity[] {
    return ents.filter( e => e.markedWith(tags, 'and'));
}

export function orExecutor( tags: TagClass<any>[], ents: Entity[] ): Entity[] {
    return ents.filter( e => e.markedWith(tags, 'or'));
}

export function notExecutor( tag: TagClass<any>, ents: Entity[] ): Entity[] {
    return ents.filter( e => !e.markedWith(tag) );
}

export function setInvertor( ents: Entity[], whole: Entity[] ): Entity[] {
    return whole.filter( e => ents.indexOf(e) < 0 );
}

export function setsUnioner<T>( sets: T[][] ): T[] {
    return _.union.apply(_, sets);
}

export function setsIntersector<T>( sets: T[][] ): T[] {
    return _.intersection.apply(_, sets);
}
