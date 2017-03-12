import { Tag } from './tag.class';
import { TagClass } from './manager.interfaces';
import { Entity as EntityAPI } from './entity.interfaces';
import * as _  from 'underscore';

export class Entity implements EntityAPI {
    /**
     * Get string representation of entity.
     * @returns unique entity identifier (globally unique).
     */
    public toString(): string { return this.identifier; }

    /**
     * Mark entity with a specified tags. Note, that if you tagging
     * entity with an instance of Tag class that was already used,
     * then used tag instance will be replaced with the new one.
     * @argument tags - list of Tag instances or single Tag instance.
     * @returns self instance, allowing you to chain calls.
     */
    public mark(tags: Tag<any>[] | Tag<any>): this {
        return (this.setTags(tags instanceof Array ? tags : [tags]), this);
    }

    /**
     * Unmark entity from a specified tags.
     * @argument tags - list of Tag classes which instances of should be
     *           removed from entity's marks list. 
     * @returns self instance, allowing you to chain calls.
     */
    public unmark(tags: TagClass<any>[] | TagClass<any>): this {
        return (this.removeTags(tags instanceof Array ? tags : [tags]), this);
    }

    /**
     * Detects whether entity marked with instance of specified Tag class or not.
     * @argument tags - list of Tag classes for searching instances of.
     * @argument mode - multiple Tag detection logic. If specified 'or', then
     *           if entity tagged with at least one tag, it is enough for 'true'
     *           result. If 'and' specifed, then entity must be marked with all of
     *           specified tags for 'true' result.
     * @returns wether entity tagged with specified tags or not.
     */
    public markedWith(tags: TagClass<any>[] | TagClass<any>, mode: 'and' | 'or' = 'and'): boolean {
        return this.hasTags(tags instanceof Array ? tags : [tags], mode);
    }

    /**
     * Gets entity's mark value.
     * @argument tag - Tag class which instance's value will be returned.
     * @returns mark value or undefined if there is no such a mark.
     */
    public getMark<T>(tag: TagClass<T>): T | void {
        return this.tryToGetTag(tag);
    }

    /**
     * Creates container that can be tagged and provide CRUD API for
     * tags managing.
     * @argument id - identifier for entity (suppose globally unique).
     *           If no identiifier provided, then it will be locally generated.
     */
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
