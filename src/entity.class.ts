import { uniqueId } from 'lodash';

import { id } from './tag.helpers';
import { TaggedClassInstance, Class } from './tag.interfaces';
import { Entity as EntityAPI } from './entity.interfaces';

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
    public mark(tags: TaggedClassInstance[] | TaggedClassInstance): this {
        return (this.setTags(tags instanceof Array ? tags : [tags]), this);
    }

    /**
     * Unmark entity from a specified tags.
     * @argument tags - list of Tag classes which instances of should be
     *           removed from entity's marks list. 
     * @returns self instance, allowing you to chain calls.
     */
    public unmark(tags: Class<any>[] | Class<any>): this {
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
    public markedWith(tags: Class<any>[] | Class<any>, mode: 'and' | 'or' = 'and'): boolean {
        return this.hasTags(tags instanceof Array ? tags : [tags], mode);
    }

    /**
     * Gets entity's mark value.
     * @argument tag - Tag class which instance's value will be returned.
     * @returns mark value or undefined if there is no such a mark.
     */
    public getMark<T extends TaggedClassInstance>(tag: Class<T>): T {
        return this.tryToGetTag(tag);
    }

    /**
     * Creates container that can be tagged and provide CRUD API for
     * tags managing.
     * @argument id - identifier for entity (suppose globally unique).
     *           If no identiifier provided, then it will be locally generated.
     */
    constructor(private identifier = uniqueId('ent')) {}



    private tags: { [i:string]: Object } = {};

    private tryToGetTag<T extends TaggedClassInstance>(tag: Class<T>): T {
        return this.tags[id(tag)] as T || undefined;
    }

    private hasTags(tags: Class<any>[], mode: 'and' | 'or'): boolean {
        let lFilter = (tag: Class<any>) => id(tag) in this.tags;
        return mode === 'and' ? tags.every( lFilter ) : tags.some( lFilter );
    }

    private removeTags(tags: Class<any>[]): void {
        tags.forEach( tag => delete this.tags[id(tag)] );
    }

    private setTags(tags: TaggedClassInstance[]): void {
        tags.forEach( tag => this.tags[id(tag)] = tag );
    }
}
