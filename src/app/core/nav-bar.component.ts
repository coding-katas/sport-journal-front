import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ RouterLink ],
  template: `
    <nav id="nav" class="bg-gray-900">
      <h3 class="text-white font-bold">Sport Journal &#9752;</h3>
      <ul class="flex items-center justify-end text-white">
        <li class="px-4">
          <a href="#" class="hover:text-gray-400" routerLink="home">home</a>
        </li>
        <li class="px-4">
          <a href="#" class="hover:text-gray-400" routerLink="new-template">template-form</a>
        </li>
        <li class="px-4">
          <a href="#" class="hover:text-gray-400" routerLink="new-reactive">reactive-form</a>
        </li>
      </ul>
      <div id="icons" class="bg-gray-800 p-2 rounded-full"></div>
    </nav>
  `,
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

}
