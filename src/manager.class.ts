import { TagClass } from './manager.interfaces';
import { Tag } from './tag.class';
import { Entity } from './entity.class';
import * as _ from 'underscore';

export class Manager {
    public createEntity(): Entity {
        let lEntity = new Entity();
        this.entities[lEntity.toString()] = lEntity;
        return lEntity;
    }

    public createTag<T>(defaultValue?: T, parentTag?: TagClass<any>): TagClass<T> {
        let lIdentifier = _.uniqueId('tag_');
        // @TODO: register tag class within the tree
        return this.generateTagClass(lIdentifier, defaultValue, parentTag);
    }



    private entities: { [k: string]: Entity } = {};

    private generateTagClass<T>(identifier: string, defaultValue?: T, parentTag?: TagClass<any>): TagClass<T> {
        // tslint:disable:max-classes-per-file
        return class extends Tag<T> {
            public static toString(): string { return identifier; }
            constructor( value?: T ) { super( identifier, arguments.length === 0
                ? Object.assign({}, defaultValue)
                : Tag.normalizeValue(defaultValue, value) );
            }
        };
        // tslint:enable:max-classes-per-file
    }
}
