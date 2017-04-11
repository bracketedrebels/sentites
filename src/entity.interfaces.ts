import { TaggedClassInstance, Class } from './tag.interfaces';

export interface Entity {
    toString(): string;
    mark(tags: TaggedClassInstance[] | TaggedClassInstance): this;
    unmark(tags: Class<any>[] | Class<any>): this;
    markedWith(tags: Class<any>[] | Class<any>, mode: 'and' | 'or'): boolean;
    getMark<T extends TaggedClassInstance>(tag: Class<T>): T | void;
}
