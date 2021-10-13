import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  // activatedEmitted = new EventEmitter<boolean>();
  activatedEmitted = new Subject<boolean>();
}
