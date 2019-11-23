import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReferentielService {

  constructor() {
  }

  getChilds() {
    return [
      {
        'id': 'yaelle',
        'name': 'Yaelle'
      },
      {
        'id': 'eline',
        'name': 'Eline'
      },
      {
        'id': 'melanie',
        'name': 'Mélanie'
      },
      {
        'id': 'adrien',
        'name': 'Adrien'
      }
    ];

  }
}
