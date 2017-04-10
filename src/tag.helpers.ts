import { Class, TaggedClassInstance } from './tag.interfaces';

export function id<T extends TaggedClassInstance>(tag: T | Class<T>): string {
    return tag instanceof Function ? tag.prototype['#'] : tag['#'];
}
