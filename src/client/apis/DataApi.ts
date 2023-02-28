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


import * as runtime from '../runtime';
import type {
  CatalogEntry,
  GraphObject,
  Link,
  LinkRequest,
  Metadata,
  MetadataRequest,
  Node,
  NodeRequest,
  PatchedMetadataRequest,
} from '../models';
import {
    CatalogEntryFromJSON,
    CatalogEntryToJSON,
    GraphObjectFromJSON,
    GraphObjectToJSON,
    LinkFromJSON,
    LinkToJSON,
    LinkRequestFromJSON,
    LinkRequestToJSON,
    MetadataFromJSON,
    MetadataToJSON,
    MetadataRequestFromJSON,
    MetadataRequestToJSON,
    NodeFromJSON,
    NodeToJSON,
    NodeRequestFromJSON,
    NodeRequestToJSON,
    PatchedMetadataRequestFromJSON,
    PatchedMetadataRequestToJSON,
} from '../models';

export interface DataGraphObjectListRequest {
    regex: string;
    keys?: Array<string>;
}

export interface DataLinkCreateRequest {
    linkRequest: LinkRequest;
}

export interface DataLinkDestroyRequest {
    id: number;
}

export interface DataLinkListRequest {
    params?: { [key: string]: any; };
}

export interface DataLinkRetrieveRequest {
    id: number;
}

export interface DataMetadataCreateRequest {
    metadataRequest: MetadataRequest;
}

export interface DataMetadataDestroyRequest {
    id: number;
}

export interface DataMetadataPartialUpdateRequest {
    id: number;
    patchedMetadataRequest?: PatchedMetadataRequest;
}

export interface DataMetadataRetrieveRequest {
    id: number;
}

export interface DataMetadataUpdateRequest {
    id: number;
    metadataRequest: MetadataRequest;
}

export interface DataNodeChildrenListRequest {
    nodeId: number;
    params?: { [key: string]: any; };
}

export interface DataNodeCreateRequest {
    nodeRequest?: NodeRequest;
}

export interface DataNodeDestroyRequest {
    id: number;
}

export interface DataNodeListRequest {
    params?: { [key: string]: any; };
}

export interface DataNodeMergeUpdateRequest {
    id: number;
    nodeId: number;
    nodeRequest?: NodeRequest;
}

export interface DataNodeParentsListRequest {
    nodeId: number;
    params?: { [key: string]: any; };
}

export interface DataNodeRetrieveRequest {
    id: number;
}

/**
 * 
 */
export class DataApi extends runtime.BaseAPI {

    /**
     * Access the metadata catalog
     */
    async dataCatalogListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<CatalogEntry>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/data/catalog/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CatalogEntryFromJSON));
    }

    /**
     * Access the metadata catalog
     */
    async dataCatalogList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<CatalogEntry>> {
        const response = await this.dataCatalogListRaw(initOverrides);
        return await response.value();
    }

    /**
     * Endpoint to query all the graph objects (nodes or links) based on their metadata
     */
    async dataGraphObjectListRaw(requestParameters: DataGraphObjectListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<GraphObject>>> {
        if (requestParameters.regex === null || requestParameters.regex === undefined) {
            throw new runtime.RequiredError('regex','Required parameter requestParameters.regex was null or undefined when calling dataGraphObjectList.');
        }

        const queryParameters: any = {};

        if (requestParameters.keys) {
            queryParameters['keys'] = requestParameters.keys.join(runtime.COLLECTION_FORMATS["pipes"]);
        }

        if (requestParameters.regex !== undefined) {
            queryParameters['regex'] = requestParameters.regex;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/graph_object/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(GraphObjectFromJSON));
    }

    /**
     * Endpoint to query all the graph objects (nodes or links) based on their metadata
     */
    async dataGraphObjectList(requestParameters: DataGraphObjectListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<GraphObject>> {
        const response = await this.dataGraphObjectListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Endpoint to create link
     */
    async dataLinkCreateRaw(requestParameters: DataLinkCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Link>> {
        if (requestParameters.linkRequest === null || requestParameters.linkRequest === undefined) {
            throw new runtime.RequiredError('linkRequest','Required parameter requestParameters.linkRequest was null or undefined when calling dataLinkCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/link/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LinkRequestToJSON(requestParameters.linkRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LinkFromJSON(jsonValue));
    }

    /**
     * Endpoint to create link
     */
    async dataLinkCreate(requestParameters: DataLinkCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Link> {
        const response = await this.dataLinkCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Endpoint to query links based on their metadata
     */
    async dataLinkDestroyRaw(requestParameters: DataLinkDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling dataLinkDestroy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/link/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Endpoint to query links based on their metadata
     */
    async dataLinkDestroy(requestParameters: DataLinkDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.dataLinkDestroyRaw(requestParameters, initOverrides);
    }

    /**
     * Endpoint to query links based on their metadata
     */
    async dataLinkListRaw(requestParameters: DataLinkListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Link>>> {
        const queryParameters: any = {};

        if (requestParameters.params !== undefined) {
            queryParameters['params'] = requestParameters.params;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/link/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(LinkFromJSON));
    }

    /**
     * Endpoint to query links based on their metadata
     */
    async dataLinkList(requestParameters: DataLinkListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Link>> {
        const response = await this.dataLinkListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Endpoint to query links based on their metadata
     */
    async dataLinkRetrieveRaw(requestParameters: DataLinkRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Link>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling dataLinkRetrieve.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/link/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LinkFromJSON(jsonValue));
    }

    /**
     * Endpoint to query links based on their metadata
     */
    async dataLinkRetrieve(requestParameters: DataLinkRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Link> {
        const response = await this.dataLinkRetrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * API endpoint to manage metadata
     */
    async dataMetadataCreateRaw(requestParameters: DataMetadataCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Metadata>> {
        if (requestParameters.metadataRequest === null || requestParameters.metadataRequest === undefined) {
            throw new runtime.RequiredError('metadataRequest','Required parameter requestParameters.metadataRequest was null or undefined when calling dataMetadataCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/metadata/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MetadataRequestToJSON(requestParameters.metadataRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MetadataFromJSON(jsonValue));
    }

    /**
     * API endpoint to manage metadata
     */
    async dataMetadataCreate(requestParameters: DataMetadataCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Metadata> {
        const response = await this.dataMetadataCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * API endpoint to manage metadata
     */
    async dataMetadataDestroyRaw(requestParameters: DataMetadataDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling dataMetadataDestroy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/metadata/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * API endpoint to manage metadata
     */
    async dataMetadataDestroy(requestParameters: DataMetadataDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.dataMetadataDestroyRaw(requestParameters, initOverrides);
    }

    /**
     * API endpoint to manage metadata
     */
    async dataMetadataListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Metadata>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/metadata/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MetadataFromJSON));
    }

    /**
     * API endpoint to manage metadata
     */
    async dataMetadataList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Metadata>> {
        const response = await this.dataMetadataListRaw(initOverrides);
        return await response.value();
    }

    /**
     * API endpoint to manage metadata
     */
    async dataMetadataPartialUpdateRaw(requestParameters: DataMetadataPartialUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Metadata>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling dataMetadataPartialUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/metadata/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: PatchedMetadataRequestToJSON(requestParameters.patchedMetadataRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MetadataFromJSON(jsonValue));
    }

    /**
     * API endpoint to manage metadata
     */
    async dataMetadataPartialUpdate(requestParameters: DataMetadataPartialUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Metadata> {
        const response = await this.dataMetadataPartialUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * API endpoint to manage metadata
     */
    async dataMetadataRetrieveRaw(requestParameters: DataMetadataRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Metadata>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling dataMetadataRetrieve.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/metadata/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MetadataFromJSON(jsonValue));
    }

    /**
     * API endpoint to manage metadata
     */
    async dataMetadataRetrieve(requestParameters: DataMetadataRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Metadata> {
        const response = await this.dataMetadataRetrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * API endpoint to manage metadata
     */
    async dataMetadataUpdateRaw(requestParameters: DataMetadataUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Metadata>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling dataMetadataUpdate.');
        }

        if (requestParameters.metadataRequest === null || requestParameters.metadataRequest === undefined) {
            throw new runtime.RequiredError('metadataRequest','Required parameter requestParameters.metadataRequest was null or undefined when calling dataMetadataUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/metadata/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: MetadataRequestToJSON(requestParameters.metadataRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MetadataFromJSON(jsonValue));
    }

    /**
     * API endpoint to manage metadata
     */
    async dataMetadataUpdate(requestParameters: DataMetadataUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Metadata> {
        const response = await this.dataMetadataUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Gives the parents of a given node
     */
    async dataNodeChildrenListRaw(requestParameters: DataNodeChildrenListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Node>>> {
        if (requestParameters.nodeId === null || requestParameters.nodeId === undefined) {
            throw new runtime.RequiredError('nodeId','Required parameter requestParameters.nodeId was null or undefined when calling dataNodeChildrenList.');
        }

        const queryParameters: any = {};

        if (requestParameters.params !== undefined) {
            queryParameters['params'] = requestParameters.params;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/node/{node_id}/children/`.replace(`{${"node_id"}}`, encodeURIComponent(String(requestParameters.nodeId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(NodeFromJSON));
    }

    /**
     * Gives the parents of a given node
     */
    async dataNodeChildrenList(requestParameters: DataNodeChildrenListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Node>> {
        const response = await this.dataNodeChildrenListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Endpoint to create node
     */
    async dataNodeCreateRaw(requestParameters: DataNodeCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Node>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/node/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NodeRequestToJSON(requestParameters.nodeRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => NodeFromJSON(jsonValue));
    }

    /**
     * Endpoint to create node
     */
    async dataNodeCreate(requestParameters: DataNodeCreateRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Node> {
        const response = await this.dataNodeCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Endpoint to query nodes based on their metadata
     */
    async dataNodeDestroyRaw(requestParameters: DataNodeDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling dataNodeDestroy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/node/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Endpoint to query nodes based on their metadata
     */
    async dataNodeDestroy(requestParameters: DataNodeDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.dataNodeDestroyRaw(requestParameters, initOverrides);
    }

    /**
     * Endpoint to query nodes based on their metadata
     */
    async dataNodeListRaw(requestParameters: DataNodeListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Node>>> {
        const queryParameters: any = {};

        if (requestParameters.params !== undefined) {
            queryParameters['params'] = requestParameters.params;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/node/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(NodeFromJSON));
    }

    /**
     * Endpoint to query nodes based on their metadata
     */
    async dataNodeList(requestParameters: DataNodeListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Node>> {
        const response = await this.dataNodeListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Merge a node into the base node
     */
    async dataNodeMergeUpdateRaw(requestParameters: DataNodeMergeUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Node>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling dataNodeMergeUpdate.');
        }

        if (requestParameters.nodeId === null || requestParameters.nodeId === undefined) {
            throw new runtime.RequiredError('nodeId','Required parameter requestParameters.nodeId was null or undefined when calling dataNodeMergeUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/node/{node_id}/merge/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"node_id"}}`, encodeURIComponent(String(requestParameters.nodeId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: NodeRequestToJSON(requestParameters.nodeRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => NodeFromJSON(jsonValue));
    }

    /**
     * Merge a node into the base node
     */
    async dataNodeMergeUpdate(requestParameters: DataNodeMergeUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Node> {
        const response = await this.dataNodeMergeUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Gives the parents of a given node
     */
    async dataNodeParentsListRaw(requestParameters: DataNodeParentsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Node>>> {
        if (requestParameters.nodeId === null || requestParameters.nodeId === undefined) {
            throw new runtime.RequiredError('nodeId','Required parameter requestParameters.nodeId was null or undefined when calling dataNodeParentsList.');
        }

        const queryParameters: any = {};

        if (requestParameters.params !== undefined) {
            queryParameters['params'] = requestParameters.params;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/node/{node_id}/parents/`.replace(`{${"node_id"}}`, encodeURIComponent(String(requestParameters.nodeId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(NodeFromJSON));
    }

    /**
     * Gives the parents of a given node
     */
    async dataNodeParentsList(requestParameters: DataNodeParentsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Node>> {
        const response = await this.dataNodeParentsListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Endpoint to query nodes based on their metadata
     */
    async dataNodeRetrieveRaw(requestParameters: DataNodeRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Node>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling dataNodeRetrieve.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // orgAPIKeyAuth authentication
        }

        const response = await this.request({
            path: `/data/node/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => NodeFromJSON(jsonValue));
    }

    /**
     * Endpoint to query nodes based on their metadata
     */
    async dataNodeRetrieve(requestParameters: DataNodeRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Node> {
        const response = await this.dataNodeRetrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
