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
  }

  public current_theme(): string {
    return this.theme.current;
  }

  public select_theme(value: string): void {
    this.theme.current = value;
  }

  public switch_theme(): void {
    if (this.theme.current === 'default') {
      this.select_theme('dark');
    } else {
      this.select_theme('default');
    }
  }

}
