import { Tag } from './tag.class';
import { TagClass } from './manager.interfaces';

export class Entity {
    addTags(tags: Tag<any>[] | Tag<any>): Entity { return; }
    removeTags(tags: Tag<any>[] | Tag<any>): Entity { return; }
    hasTags(tags: Tag<any>[] | Tag<any>): boolean { return; }
    tag<T>(tag: TagClass<T>): T | void {  }



    private tags: { [i:string]: Tag<any> } = {};
}
