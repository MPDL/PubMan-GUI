import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { AaService } from '../../services/aa.service';

@Component({
  selector: 'pure-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  search_form = this.form_builder.group({
    text: '',
  });

  constructor(
    private form_builder: UntypedFormBuilder,
    public aa: AaService
    ) { }

  ngOnInit(): void {
  }

  search(): void {
    alert(this.search_form.get('text')!.value);
    this.search_form.controls['text'].patchValue('');
  }

}
