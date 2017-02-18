import { TagClass } from './manager.interfaces';
import { Tag } from './tag.class';
import { Entity } from './entity.class';
import { QueryExecutor } from './executor.class';
import { Query } from './query.class';
import * as _ from 'underscore';



export class Manager {
    public queryEntities(query: Query): Entity[] {
        return this.executor.execute(query);
    }

    public createEntity(): Entity {
        return this.entities[this.entities.push(new Entity(_.uniqueId('ent'))) - 1];
    }

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
