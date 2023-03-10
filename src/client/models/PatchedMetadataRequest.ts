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
/**
 * This serializer activates the tracking of
 * serialized objects.
 * It adds the `_represented` (not to use), the `represented`
 * and `reset` methods.
 * Important: it overrides the `to_representation` common method
 * of `Serializer` objects.
 * @export
 * @interface PatchedMetadataRequest
 */
export interface PatchedMetadataRequest {
    /**
     * 
     * @type {number}
     * @memberof PatchedMetadataRequest
     */
    graphObject?: number;
    /**
     * 
     * @type {string}
     * @memberof PatchedMetadataRequest
     */
    key?: string;
    /**
     * 
     * @type {any}
     * @memberof PatchedMetadataRequest
     */
    value?: any | null;
}

/**
 * Check if a given object implements the PatchedMetadataRequest interface.
 */
export function instanceOfPatchedMetadataRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PatchedMetadataRequestFromJSON(json: any): PatchedMetadataRequest {
    return PatchedMetadataRequestFromJSONTyped(json, false);
}

export function PatchedMetadataRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchedMetadataRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'graphObject': !exists(json, 'graph_object') ? undefined : json['graph_object'],
        'key': !exists(json, 'key') ? undefined : json['key'],
        'value': !exists(json, 'value') ? undefined : json['value'],
    };
}

export function PatchedMetadataRequestToJSON(value?: PatchedMetadataRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'graph_object': value.graphObject,
        'key': value.key,
        'value': value.value,
    };
}

