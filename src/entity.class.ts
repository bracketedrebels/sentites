import { Tag } from './tag.class';
import { TagClass } from './manager.interfaces';
import { listify } from './entity.helpers';
import * as _  from 'underscore';

export class Entity {
    /**
     * Get string representation of entity.
     * @returns unique entity identifier.
     */
    public toString(): string { return this.identifier; }

    /**
     * Mark entity with a specific tag.
     * @
     */
    public mark(tags: Tag<any>[] | Tag<any>): Entity {
        return (this.setTags(listify(tags)), this);
    }

    public unmark(tags: TagClass<any>[] | TagClass<any>): Entity {
        return (this.removeTags(listify(tags)), this);
    }

    public markedWith(tags: TagClass<any>[] | TagClass<any>, mode: 'and' | 'or' = 'and'): boolean {
        return this.hasTags(listify(tags), mode);
    }

    public getMark<T>(tag: TagClass<T>): T | void {
        return this.tryToGetTag(tag);
    }



    private tags: { [i:string]: Tag<any> } = {};
    private identifier: string = _.uniqueId('ent_');

    private tryToGetTag<T>(tag: TagClass<T>): T | void {
        let lTag = this.tags[tag.toString()];
        return lTag ? lTag.value : undefined;
    }

    private hasTags(tags: TagClass<any>[], mode: 'and' | 'or'): boolean {
        let lFilter = tag => tag.toString() in this.tags;
        return mode === 'and' ? tags.every( lFilter ) : tags.some( lFilter );
    }

    private removeTags(tags: TagClass<any>[]): void {
        tags.forEach( tag => delete this.tags[tag.toString()] );
    }

    private setTags(tags: Tag<any>[]): void {
        tags.forEach( tag => this.tags[tag.toString()] = tag );
    }
}
