import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mapGet', standalone: true })
export class MapGetPipe implements PipeTransform {
  transform(map: Map<any, any> | null | undefined, key: any): any[] {
    return map?.get(key) ?? [];
  }
}
