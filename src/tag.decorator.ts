import { uniqueId } from 'lodash';
import { Class, TaggedClass, TaggedClassInstance } from './tag.interfaces';



export function Tag(): ClassDecorator {
    return <T extends TaggedClassInstance>(target: Class<T>): TaggedClass<T> => {
        Object.defineProperty(target.prototype, '#', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: uniqueId('tag')            
        });
        return target;
    }
}
