/* tslint:disable */
/* eslint-disable */
/**
 * Situation API
 * Information System Knowledges
 *
 * The version of the OpenAPI document: 0.15.2 (0.15.2)
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { GroupEnum } from './GroupEnum';
import {
    GroupEnumFromJSON,
    GroupEnumFromJSONTyped,
    GroupEnumToJSON,
} from './GroupEnum';
import type { Position } from './Position';
import {
    PositionFromJSON,
    PositionFromJSONTyped,
    PositionToJSON,
} from './Position';

/**
 * 
 * @export
 * @interface Cytoscape
 */
export interface Cytoscape {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof Cytoscape
     */
    data: { [key: string]: any; };
    /**
     * 
     * @type {GroupEnum}
     * @memberof Cytoscape
     */
    group: GroupEnum;
    /**
     * 
     * @type {Position}
     * @memberof Cytoscape
     */
    position?: Position;
}

/**
 * Check if a given object implements the Cytoscape interface.
 */
export function instanceOfCytoscape(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "group" in value;

    return isInstance;
}

export function CytoscapeFromJSON(json: any): Cytoscape {
    return CytoscapeFromJSONTyped(json, false);
}

export function CytoscapeFromJSONTyped(json: any, ignoreDiscriminator: boolean): Cytoscape {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': json['data'],
        'group': GroupEnumFromJSON(json['group']),
        'position': !exists(json, 'position') ? undefined : PositionFromJSON(json['position']),
    };
}

export function CytoscapeToJSON(value?: Cytoscape | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': value.data,
        'group': GroupEnumToJSON(value.group),
        'position': PositionToJSON(value.position),
    };
}
