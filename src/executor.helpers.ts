import { union, intersection } from 'lodash';

import { Entity } from './entity.class';
import { TagClass } from './manager.interfaces';




export function andExecutor( tags: TagClass<any>[], ents: Entity[] ): Entity[] {
    return ents.filter( e => e.markedWith(tags, 'and'));
}

export function orExecutor( tags: TagClass<any>[], ents: Entity[] ): Entity[] {
    return ents.filter( e => e.markedWith(tags, 'or'));
}

export function setInvertor( ents: Entity[], whole: Entity[] ): Entity[] {
    return whole.filter( e => ents.indexOf(e) < 0 );
}

export function setsUnioner<T>( sets: T[][] ): T[] {
    return union.apply(null, sets);
}

export function setsIntersector<T>( sets: T[][] ): T[] {
    return intersection.apply(null, sets);
}
