import { TagClass } from '../manager.interfaces';
import { QueryTypes } from './query.enums';



export class Query {
    public toString(): string { return JSON.stringify(this); }

    constructor(
        public type: QueryTypes,
        public args: Array<Query | TagClass<any>>
    ) {
        this.validateQueryConsistency();
    }



    private validateQueryConsistency(): void {
        let orValid = this.type === QueryTypes.or && this.args.length >= 2;
        let andValid = this.type === QueryTypes.and && this.args.length >= 2;
        let notValid = this.type === QueryTypes.not && this.args.length === 1;
        if (!orValid || !andValid || !notValid) {
            throw new Error('Inconsistent query! Please, ensure arguments count is valid.');
        }
    }
}
