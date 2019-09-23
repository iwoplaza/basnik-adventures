import { Resource } from './resource';

export function loadAll(resources: Resource[]): Promise<void[]> {
    return Promise.all(resources.map(res => res.load()));
}