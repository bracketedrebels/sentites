import { Entity } from './entity.class';
import { Class } from './tag.interfaces';

import { Query } from './query.class';
import { QueryTypes } from './query.enums';
import { andExecutor, orExecutor, setsIntersector, setsUnioner, setInvertor } from './executor.helpers';



export class QueryExecutor {
    constructor( private entities: Entity[] ) {}

    public execute( query: Query | Class<any> ): Entity[] {
        return this.executeRecursive(query instanceof Query
            ? query
            : new Query(QueryTypes.or, [query, query]), this.entities);
    }

    private executeRecursive(query: Query, ents: Entity[]): Entity[] {
        let lTags: Class<any>[] = [];
        let lSubqueries: Query[] = [];
        let lType = query.type;
        query.args.forEach( arg => arg instanceof Query
            ? lSubqueries.push(arg)
            : lTags.push(arg)
        );
        let lEntitesSets: Entity[][] = [];
        if (lTags.length) {
            lEntitesSets.push(this.proceedTags(lType, lTags, ents));
        }
        if (lSubqueries.length) {
            lEntitesSets = lEntitesSets.concat(this.proceedSubqueries(lSubqueries, ents));
        }
        return this.combineEntitiesSets(lType, lEntitesSets);
    }

    private proceedTags(type: QueryTypes, tags: Class<any>[], ents: Entity[]): Entity[] {
        switch(type) {
            // no need to distinguish 'not' from 'or' at this step,
            // due to following set invertion, which will correctly
            // proceed 'not' query
            case QueryTypes.not:
            case QueryTypes.or:
                return orExecutor(tags, ents);
            case QueryTypes.and:
                return andExecutor(tags, ents);
        }
    }

    private proceedSubqueries(queries: Query[], ents: Entity[]): Entity[][] {
        return queries.reduce( (acc, v) => {
            acc.push( this.executeRecursive(v, ents) );
            return acc;
        }, [] );
    }

    private combineEntitiesSets(type: QueryTypes, entSets: Entity[][]): Entity[] {
        switch(type) {
            case QueryTypes.or:
                return setsUnioner(entSets);
            case QueryTypes.and:
                return setsIntersector(entSets);
            case QueryTypes.all:
                return this.entities.slice();
            case QueryTypes.none:
                return [];
            case QueryTypes.not:
                // assuming that query is valid and consume only one argument
                return setInvertor(entSets[0], this.entities);
        }
    }
}
