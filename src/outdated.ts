import * as childProcess from "child_process";

export class GetOutdatedDependenciesOptions {
  global: boolean;
  depth: number;
}

// TODO confirm these types
export class GetOutdatedDependency {
  current: string;
  wanted: string;
  latest: string;
  dependent: string;
  location: string;
  type: string;
  homepage?: string;
  name: string;
}

export type OutdatedDependencies = Record<string, GetOutdatedDependency>;

/**
 * Handle capturing outdated.
 *
 * Copied 2024-10-25 from https://github.com/jens-duttke/check-outdated/blob/main/helper/dependencies.js
 */
export class Outdated {
  /**
   * Calls `npm outdated` to retrieve information about the outdated dependencies.
   *
   * @public
   * @param {NpmOptions} options - Options which shall be appended to the `npm outdated` command-line call.
   * @returns {Promise<OutdatedDependencies>} The original object returned by `npm outdated --json`.
   */
  async getOutdatedDependencies(
    options: Partial<GetOutdatedDependenciesOptions> = {}
  ): Promise<OutdatedDependencies> {
    return new Promise((resolve, reject) => {
      childProcess.exec(
        [
          "npm outdated",
          "--json",
          "--long",
          "--save false",
          options.global ? "--global" : "",
          options.depth ? `--depth ${options.depth}` : "",
        ]
          .filter((item) => item)
          .join(" "),
        (error, stdout) => {
          if (error && stdout.length === 0) {
            reject(error);

            return;
          }

          const response = this.parseResponse(stdout);

          if ("error" in response) {
            reject(response.error);

            return;
          }

          if (typeof response !== "object" || response === null) {
            reject(new TypeError("npm did not respond with an object."));

            return;
          }

          resolve(this.prepareResponseObject(response));
        }
      );
    });
  }

  /**
   * Adds missing properties to the dependencies object.
   *
   * @private
   * @param {{ readonly [dependencyName: string]: Partial<OutdatedDependency>; }} dependencies - The partial filled outdated dependency object.
   * @returns {{ [dependencyName: string]: OutdatedDependency; }} The enriched outdated dependency object.
   */
  protected prepareResponseObject(dependencies: Record<string, any>) {
    /** @type {{ [dependencyName: string]: OutdatedDependency; }} */
    const outdatedDependencies = {};

    for (const [name, dependency] of Object.entries(dependencies)) {
      // Adding the name, makes it easier to work with the dependency object.
      const outdatedDependency = {
        ...dependency,
        name,
      };

      outdatedDependency.current = outdatedDependency.current || "";
      outdatedDependency.wanted = outdatedDependency.wanted || "";
      outdatedDependency.latest = outdatedDependency.latest || "";

      /**
       * Sometimes, npm returns an empty `location` string. So we add it.
       *
       * @todo We should try to resolve the path on the same way as npm is doing it.
       *
       * @see path.relative(process.cwd(), require.resolve(name));
       * @see module.path
       */
      if (!outdatedDependency.location) {
        outdatedDependency.location = `node_modules/${name}`;
      }

      outdatedDependencies[name] =
        /** @type {OutdatedDependency} */ outdatedDependency;
    }

    return outdatedDependencies;
  }

  /**
   * Parse the stdout of `npm outdated --json` and convert it into an `object`.
   *
   * @private
   * @param {string} stdout - Response of `npm outdated --json`.
   * @returns {any} The parsed response, or an `object` containing an `error` property.
   */
  protected parseResponse(stdout) {
    try {
      const response = JSON.parse(stdout || "{}");

      if (typeof response !== "object" || response === null) {
        throw new Error("Unexpected JSON response");
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: {
            message: error.message,
            stack: error.stack,
            source: stdout,
          },
        };
      }

      return {
        message: typeof error === "string" ? error : "Unknown error",
        source: stdout,
      };
    }
  }
}
