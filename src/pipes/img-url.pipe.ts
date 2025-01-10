import { Pipe, PipeTransform } from '@angular/core';
import { BASE_API_URL } from '../constans/api';

@Pipe({
  name: 'imgUrl',
  standalone: true
})
export class ImgUrlPipe implements PipeTransform {

  transform(value: string | null): string | null {
    if (!value) return null;

    return `${BASE_API_URL}${value}`
  }

}
