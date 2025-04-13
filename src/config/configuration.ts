import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export interface Configuration {
  pg: Record<string, string>;
  jwt: Record<string, string>;
}

const getYaml = () => {
  return yaml.load(
    readFileSync(join(__dirname, 'config.yaml'), 'utf8'),
  ) as Configuration;
};

export const CONFIGURATION = getYaml();
