import { Class } from './tag.interfaces';
import { Entity } from './entity.class';
import { QueryExecutor } from './executor.class';
import { Query } from './query.class';



export class Manager {
    /**
     * Queries entites via boolean opertaors over the tags. Entities are taken
     * from the Manager local storage which is unique for every Manager instance.
     * @example queryEntities(OR(Tag1, Tag2, NOT(Tag3)));
     * @argument query - boolean query over the tags, created via createTag method.
     * @returns list of entities that satisfied provided query.
     */
    public query(query: Query | Class<any>): Entity[] {
        return this.executor.execute(query);
    }

    /**
     * Creates entity and cache it in the local entites storage making it available
     * for futher querying.
     * @returns recently created entity.
     */
    public create(): Entity {
        return this.entities[this.entities.push(new Entity()) - 1];
    }



    private entities: Entity[] = [];
    private executor = new QueryExecutor(this.entities);
}
