import Ajv, { ValidateFunction } from "ajv/dist/jtd";
import { Schema } from "ajv/dist/jtd";
import { GitGraph } from "../models/git-graph";

/*
export interface Repository {
    name: string | null,
    branches: Branch[],
}

export interface Commit {
    name: string | null,
    hash: string,
    parents: string[],
}

export interface Branch {
    name: string | null,
    commits: Commit[],
}

export interface GitGraph {
    repositories?: Repository[],
    valid: boolean,
}
*/

export class GraphValidationService {

  private static readonly schema: Schema = {
    properties: {
      repositories: {
        elements: {
          properties: {
            branches: {
              elements: {
                properties: {
                  commits: {
                    elements: {
                      properties: {
                        hash: { type: "string" },
                      },
                      optionalProperties: {
                        name: { type: "string" },
                        parents: {
                          elements: { type: "string" }
                        }
                      }
                    },
                  },
                },
                optionalProperties: {
                  name: { type: "string" }
                }
              },
            },
          },
          optionalProperties: {
            name: { type: "string" }
          }
        },
      },
    },
  };
  private static validate: ValidateFunction | null = null;

  static validateGraph(graphStr: string): GitGraph {
    if (GraphValidationService.validate === null) {
      const ajv = new Ajv();
      GraphValidationService.validate = ajv.compile(GraphValidationService.schema);
    }

    try {
      const graphJson = JSON.parse(graphStr);
      const valid = GraphValidationService.validate(graphJson);
      if (valid) {
        let graph: GitGraph = graphJson as GitGraph;
        graph.valid = true;
        return graph;
      }
      else {
        return {
          valid: false,
          errors: GraphValidationService.validate.errors?.map((e) => e.message ?? '') ?? []
        };
      }
    }
    catch (e) {
      return {
        valid: false,
        errors: ['Invalid syntax. Could not parse JSON.']
      };
    }
  }

}