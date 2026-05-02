import fs from 'fs';

export function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

export function writeJsonFile<T>(filePath: string, value: T): void {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}
