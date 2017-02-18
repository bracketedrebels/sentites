import { Tag } from './tag.class';
import { TagClass } from './manager.interfaces';
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
        return (this.setTags(tags instanceof Array ? tags : [tags]), this);
    }

    public unmark(tags: TagClass<any>[] | TagClass<any>): Entity {
        return (this.removeTags(tags instanceof Array ? tags : [tags]), this);
    }

    public markedWith(tags: TagClass<any>[] | TagClass<any>, mode: 'and' | 'or' = 'and'): boolean {
        return this.hasTags(tags instanceof Array ? tags : [tags], mode);
    }

    public getMark<T>(tag: TagClass<T>): T | void {
        return this.tryToGetTag(tag);
    }

    constructor(id?: string) {
        this.identifier = id || _.uniqueId('ent');
    }



    private tags: { [i:string]: Tag<any> } = {};
    private identifier: string;

    private tryToGetTag<T>(tag: TagClass<T>): T | void {
        let lTag = this.tags[tag.toString()];
        return lTag ? lTag.value : undefined;
    }

    private hasTags(tags: TagClass<any>[], mode: 'and' | 'or'): boolean {
        let lFilter = (tag: TagClass<any>) => tag.toString() in this.tags;
        return mode === 'and' ? tags.every( lFilter ) : tags.some( lFilter );
    }

    private removeTags(tags: TagClass<any>[]): void {
        tags.forEach( tag => delete this.tags[tag.toString()] );
    }

    private setTags(tags: Tag<any>[]): void {
        tags.forEach( tag => this.tags[tag.toString()] = tag );
    }
}
