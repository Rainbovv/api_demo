import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const getYaml = () => {
  return yaml.load(
    readFileSync(join(__dirname, 'config.yaml'), 'utf8'),
  ) as Record<string, any>;
};

export const CONFIGURATION = getYaml();
