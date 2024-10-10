import { User } from './../../shared/models/interfaces/user';
import { UserService } from './../../shared/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})
export class UserProfilComponent {

  userProfile = {
    firstName: 'John',
    Name: 'Doe',
    email: 'email@mail.com'
  };

  get fullName(): string {
    return `${this.userProfile.firstName} ${this.userProfile.Name}`;
  }
  constructor(private UserService : UserService) {}

  ngOnInit(): void {
    // If fetching data from an API, make the call here and update `userProfile`.

    this.UserService.getUser().subscribe(
      {
        next : (user : User) => {
          this.userProfile.firstName = user.firstname;
          this.userProfile.Name = user.name;
          this.userProfile.email = user.email;
        }
      }
    )
  }
}
