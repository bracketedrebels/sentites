import { TagClass } from './manager.interfaces';
import { Tag } from './tag.class';
import { Entity } from './entity.class';
import { QueryExecutor } from './executor.class';
import { Query } from './query.class';

import * as _ from 'underscore';



export class Manager {
    /**
     * Creates tag for tagging entites and querying them. Tag - is a class, taking
     * tag value as an argument when instancing.
     * @argument defaultValueMaker is a handler producing value that will be used
     *           when no tag value provided while instancing. If no default value
     *           and no handler provided, undefined will be set as a tag value.
     * @returns Tag class that can be instanced for entity tagging.
     */
    public static createTag<T>(defaultValueMaker?: () => T): TagClass<T> {
        return this.createTagClass(defaultValueMaker);
    }

    /**
     * Queries entites via boolean opertaors over the tags. Entities are taken
     * from the Manager local storage which is unique for every Manager instance.
     * @example queryEntities(OR(Tag1, Tag2, NOT(Tag3)));
     * @argument query - boolean query over the tags, created via createTag method.
     * @returns list of entities that satisfied provided query.
     */
    public queryEntities(query: Query | TagClass<any>): Entity[] {
        return this.executor.execute(query);
    }

    /**
     * Creates entity and cache it in the local entites storage making it available
     * for futher querying.
     * @returns recently created entity.
     */
    public createEntity(): Entity {
        return this.entities[this.entities.push(new Entity(_.uniqueId('ent'))) - 1];
    }




    private entities: Entity[] = [];
    private executor = new QueryExecutor(this.entities);

    private static createTagClass<T>(defaultValueMaker?: () => T): TagClass<T> {
        let lIdentifier = _.uniqueId('tag');
        return this.generateTagClass(lIdentifier, defaultValueMaker);
    }

    private static generateTagClass<T>(identifier: string, defaultValueMaker?: () => T): TagClass<T> {
        return class extends Tag<T> {
            public static toString(): string { return identifier; }
            constructor( value?: T ) { super( identifier,
                arguments.length === 0 
                    ? defaultValueMaker && defaultValueMaker() || undefined
                    : value
            ); }
        };
    }
}
