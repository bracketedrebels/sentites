import { TagClass } from './manager.interfaces';
import { Tag } from './tag.class';
import { Entity } from './entity.class';
import { QueryExecutor } from './executor.class';
import { Query } from './query.class';
import * as _ from 'underscore';



export class Manager {
    /**
     * Queries entites via boolean opertaors over the tags. Entities are taken
     * from the Manager local storage which is unique for every Manager instance.
     * @example queryEntities(OR(Tag1, Tag2, NOT(Tag3)));
     * @argument query - boolean query over the tags, created via createTag method.
     * @returns list of entities that satisfied provided query.
     */
    public queryEntities(query: Query): Entity[] {
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

    /**
     * Creates tag for tagging entites and querying them. Tag - is a class, taking
     * tag value as an argument when instancing.
     * @argument defaultValue is a value that will be used when no tag value provided
     *           while instancing. If no default value and no value provided, undefined
     *           will be set as tag value.
     * @returns Tag class that can be instanced for entity tagging.
     */
    public createTag<T>(defaultValue?: T): TagClass<T> {
        let lIdentifier = _.uniqueId('tag');
        // @TODO: register tag class within the tree
        return this.generateTagClass(lIdentifier, defaultValue);
    }



    private entities: Entity[] = [];
    private executor: QueryExecutor = new QueryExecutor(this.entities);

    private generateTagClass<T>(identifier: string, defaultValue?: T): TagClass<T> {
        // tslint:disable:max-classes-per-file
        return class extends Tag<T> {
            public static toString(): string { return identifier; }
            constructor( value?: T ) { super( identifier,
                Tag.normalizeValue( defaultValue, arguments.length === 0 ? defaultValue : value )
            ); }
        };
        // tslint:enable:max-classes-per-file
    }
}
