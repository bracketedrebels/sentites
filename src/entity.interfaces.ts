import { Tag } from './tag.class';
import { TagClass } from './manager.interfaces';

export interface Entity {
    toString(): string;
    mark(tags: Tag<any>[] | Tag<any>): this;
    unmark(tags: TagClass<any>[] | TagClass<any>): this;
    markedWith(tags: TagClass<any>[] | TagClass<any>, mode: 'and' | 'or'): boolean;
    getMark<T>(tag: TagClass<T>): T | void;
}
