import { TagClass } from './manager.interfaces';
import { Tag } from './tag.class';
import { Entity } from './entity.class';
import { QueryExecutor } from './executor.class';
import { Query } from './query.class';
import * as _ from 'underscore';

export class Manager {
    public queryEntities(query: Query): Entity[] {
        return this.exeutor.execute(query);
    }

    public createEntity(): Entity {
        let lEntity = new Entity(_.uniqueId('ent'));
        this.entities.push(lEntity);
        return lEntity;
    }

    public createTag<T>(defaultValue?: T): TagClass<T> {
        let lIdentifier = _.uniqueId('tag');
        // @TODO: register tag class within the tree
        return this.generateTagClass(lIdentifier, defaultValue);
    }



    private entities: Entity[] = [];
    private exeutor: QueryExecutor = new QueryExecutor(this.entities);

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
