import * as JsonSchemaRefParser from 'json-schema-ref-parser';
/* tslint:disable-next-line:no-implicit-dependencies */
import { convertObj } from 'swagger2openapi';
import { OpenAPIParser } from '../services/OpenAPIParser';
import {
  AsyncBindingsObject,
  AsyncChannelObject,
  AsyncMessageObject,
  AsyncOperationObject,
  OpenAPIMediaType,
  OpenAPIOperation,
  OpenAPIParameter,
  OpenAPIParameterLocation,
  OpenAPIPath,
  OpenAPIRef,
  OpenAPIRequestBody,
  OpenAPISchema,
  OpenAPISecurityRequirement,
  OpenAPIServer,
  OpenAPISpec,
  Referenced,
} from '../types';

export async function loadAndBundleSpec(specUrlOrObject: object | string): Promise<OpenAPISpec> {
  const parser = new JsonSchemaRefParser();
  const spec = (await parser.bundle(specUrlOrObject, {
    resolve: { http: { withCredentials: false } },
  } as object)) as any;

  if (spec.asyncapi !== undefined) {
    return convertAsyncAPI2OpenAPI(new OpenAPIParser(spec as OpenAPISpec), spec);
  }

  if (spec.swagger !== undefined) {
    return convertSwagger2OpenAPI(spec);
  }

  return spec;
}

function convertSwagger2OpenAPI(spec: any): Promise<OpenAPISpec> {
  console.warn('[ReDoc Compatibility mode]: Converting OpenAPI 2.0 to OpenAPI 3.0');
  return new Promise<OpenAPISpec>((resolve, reject) =>
    convertObj(spec, { patch: true, warnOnly: true, text: '{}', anchors: true }, (err, res) => {
      // TODO: log any warnings
      if (err) {
        return reject(err);
      }
      resolve(res && (res.openapi as any));
    }),
  );
}

function convertAsyncAPI2OpenAPI(parser: OpenAPIParser, spec: OpenAPISpec): Promise<OpenAPISpec> {
  return new Promise<OpenAPISpec>((resolve, reject) => {
    try {
      const asyncApiServers = spec.servers as Record<string, OpenAPIServer>;
      let openApiServers: OpenAPIServer[] = [];
      if (asyncApiServers) {
        openApiServers = Object.keys(asyncApiServers).map((key) => {
          const server = asyncApiServers[key] as OpenAPIServer;
          server.name = key;
          return server;
        });
        spec.servers = openApiServers;
      }

      const channels = spec.channels;
      if (channels === undefined) {
        throw new Error('Document must be valid AsyncAPI 2.0.0 definition. It has no channels');
      }

      const securityRecords = convertAsyncAPISecurity2OpenAPISecurity(
        spec.servers as OpenAPIServer[],
      );
      const channelsKeys: string[] = Object.keys(channels);
      channelsKeys.forEach((key) => {
        const channel: AsyncChannelObject = channels[key];
        const path: OpenAPIPath = convertAsyncAPIChannel2OpenAPIPath(
          parser,
          channel,
          spec.defaultContentType,
          securityRecords,
        );
        if (!spec.paths) {
          spec.paths = {};
        }

        spec.paths[key] = path;
      });
    } catch (err) {
      return reject(err);
    }

    resolve(spec);
  });
}

function convertAsyncAPISecurity2OpenAPISecurity(
  servers: OpenAPIServer[],
): OpenAPISecurityRequirement[] {
  if (!servers) {
    return [];
  }

  const securityRecords: Record<string, string[]> = {};
  servers.forEach((server) => {
    const serverSecurity: OpenAPISecurityRequirement[] = server.security || [];
    if (serverSecurity) {
      serverSecurity.forEach((security) => {
        Object.keys(security).forEach((securityReqKey) => {
          if (!Object.keys(securityRecords).includes(securityReqKey)) {
            securityRecords[securityReqKey] = serverSecurity[securityReqKey];
          }
        });
      });
    }
  });

  return [securityRecords];
}

function convertAsyncAPIChannel2OpenAPIPath(
  parser: OpenAPIParser,
  channel: AsyncChannelObject,
  defaultContentType?: string,
  security?: OpenAPISecurityRequirement[],
): OpenAPIPath {
  const channelParameters = channel.parameters || {};
  const path: OpenAPIPath = {
    description: channel.description,
    parameters: Object.keys(channelParameters).map(k => {
      const param = channelParameters[k];
      return {
        name: k,
        in: OpenAPIParameterLocation.channel,
        description: param.description,
        schema: param.schema,
        required: true
      } as OpenAPIParameter
    }),
    bindings: derefBindings(parser, channel.bindings)
  };

  if (channel.publish) {
    const publish = convertAsyncAPIOperation2OpenAPIOperation(
      parser,
      channel.publish,
      defaultContentType,
      security,
    );
    path.pub = publish;
  }

  if (channel.subscribe) {
    const subscribe = convertAsyncAPIOperation2OpenAPIOperation(
      parser,
      channel.subscribe,
      defaultContentType,
      security,
    );
    path.sub = subscribe;
  }

  return path;
}

function convertAsyncAPIOperation2OpenAPIOperation(
  parser: OpenAPIParser,
  asyncOp: AsyncOperationObject,
  defaultContentType?: string,
  security?: OpenAPISecurityRequirement[],
): OpenAPIOperation {
  let requestBody: Referenced<OpenAPIRequestBody>;
  let asyncOpMessage = asyncOp.message as AsyncMessageObject;
  const asyncOpMessageRef = asyncOp.message as Referenced<OpenAPIRequestBody>;
  if (asyncOpMessageRef) {
    asyncOpMessage = parser.deref(asyncOpMessageRef);
  }

  const payloadRef = asyncOpMessage.payload?.$ref;
  const payloadBody = asyncOpMessage.payload as OpenAPISchema;
  console.log('asyncOp', asyncOp);
  let schema: Referenced<OpenAPISchema> = payloadBody;
  if (payloadRef) {
    schema = { $ref: payloadRef };
  }

  const contentTypeName = asyncOpMessage.schemaFormat || defaultContentType || 'application/json';
  const contentType: OpenAPIMediaType = {
    schema: schema,
    examples: asyncOpMessage.examples || payloadBody.examples,
    example: payloadBody.example,
  };
  requestBody = {
    content: {
      [contentTypeName]: contentType,
    },
  };

  const operationBindings: Record<string, any> = derefBindings(parser, asyncOp.bindings) || {};
  const messageBindings: Record<string, any> = derefBindings(parser, asyncOpMessage.bindings) || {};
  Object.keys(messageBindings).forEach((b) => {
    const operationBinding = operationBindings[b];
    if (operationBinding) {
      operationBindings[b] = Object.assign(operationBindings[b], messageBindings[b]);
    }
  });
  const openAPIOp: OpenAPIOperation = {
    operationId: asyncOp.operationId,
    summary: asyncOp.summary,
    description: asyncOp.description,
    tags: asyncOp.tags?.map((t) => t.name),
    externalDocs: asyncOp.externalDocs,
    security: security,
    bindings: operationBindings,
    //TODO: Pending to map traits.
    requestBody: requestBody,
  };
  console.log('openAPIOp', openAPIOp);

  return openAPIOp;
}

function derefBindings(
  parser: OpenAPIParser,
  bindings: any
): any {
  const channelBindingsRef = bindings as Referenced<AsyncBindingsObject>;
  if (channelBindingsRef as OpenAPIRef) {
    return parser.deref(channelBindingsRef);
  }

  return bindings;
}