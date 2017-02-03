import { Tag } from './tag.class';

type TagDefaultValueTypes = Object | Array<any> | number | boolean | string;

export interface TagClass<T extends TagDefaultValueTypes> extends Function {
    new (initialValue: T): Tag<T>;
}
