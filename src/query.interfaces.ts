import { QueryTypes } from './query.enums';

export interface QuerySerializable {
    type: QueryTypes;
    args: Array<string | QuerySerializable>;
}
