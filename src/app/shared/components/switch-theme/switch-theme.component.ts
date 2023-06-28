import { Component, OnInit } from '@angular/core';
import { SwitchThemeService } from '../../services/switch-theme.service';

@Component({
  selector: 'pure-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.scss']
})
export class SwitchThemeComponent implements OnInit {

  constructor(private theme: SwitchThemeService) { }

  ngOnInit(): void {
    this.switch_theme();
  }

  public switch_theme(): void {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme','light')
    }
    else {
        document.documentElement.setAttribute('data-bs-theme','dark')
    }
  }

}
