import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signUpForm: FormGroup;
  forbiddenUsers = ["nicolas", "joe"];

  ngOnInit() {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl("Default man", [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          "Default men",
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });
    this.signUpForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
    // this.signUpForm.statusChanges.subscribe((value) => {
    //   console.log(value);
    // });  important
    this.signUpForm.setValue({
      userData: {
        username: "paco",
        email: "loco",
      },
      gender: "female",
      hobbies: [],
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get("hobbies")).push(control);
  }

  get controls() {
    return (this.signUpForm.get("hobbies") as FormArray).controls;
  }

  //own validator
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsers.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbbiden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
