import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  gifts: ItemList[] = [
    {
      'label': 'playstation 4',
      'description' : 'Awsum game',
      'checked': true
    },
    {
      'label': 'xbox',
      'checked': false,
      'img': 'data:image/jpeg;base64,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'
    },    {
      'label': 'gameboy',
      'description' : 'Awsum game',
      'checked': false
    },
    {
      'label': 'xbox',
      'checked': false
    },    {
      'label': 'gameboy',
      'description' : 'Awsum game',
      'checked': false
    },
    {
      'label': 'xbox',
      'checked': false
    },    {
      'label': 'gameboy',
      'description' : 'Awsum game',
      'checked': false
    },
    {
      'label': 'xbox',
      'checked': false
    },    {
      'label': 'gameboy',
      'description' : 'Awsum game',
      'checked': false
    },
    {
      'label': 'xbox',
      'checked': false
    },    {
      'label': 'gameboy',
      'description' : 'Awsum game',
      'checked': false
    },
    {
      'label': 'xbox',
      'checked': false
    },    {
      'label': 'gameboy',
      'description' : 'Awsum game',
      'checked': false
    },
    {
      'label': 'xbox',
      'checked': false
    },    {
      'label': 'gameboy',
      'description' : 'Awsum game',
      'checked': false
    },
    {
      'label': 'xbox',
      'checked': false
    },    {
      'label': 'gameboy',
      'description' : 'Awsum game',
      'checked': false
    },
    {
      'label': 'xbox',
      'checked': false
    },    {
      'label': 'gameboy',
      'description' : 'Awsum game',
      'checked': false
    },
    {
      'label': 'xbox',
      'checked': false
    },    {
      'label': 'gameboy',
      'description' : 'Awsum game',
      'checked': false
    },
    {
      'label': 'xbox',
      'checked': false
    },    {
      'label': 'gameboy',
      'description' : 'Awsum game',
      'checked': false
    },
    {
      'label': 'xbox',
      'checked': false
    },    {
      'label': 'gameboy',
      'description' : 'Awsum game',
      'checked': false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
