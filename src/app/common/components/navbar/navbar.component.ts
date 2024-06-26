import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  darkTheme: boolean = true;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.darkTheme = this.themeService.getTheme() === 'dark';
    console.log('Dark theme: ', this.darkTheme);
  }

  switchTheme() {
    this.darkTheme = !this.darkTheme;
    this.themeService.switchTheme();
  }

}
