import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignInFormComponent } from "../../components/sign-in-form/sign-in-form.component";
import { SocialMediaComponent } from "../../components/social-media/social-media.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, SignInFormComponent, SocialMediaComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent { }
