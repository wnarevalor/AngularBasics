import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Observable, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    // this.firstSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 10) {
          observer.complete();
        }
        if (count > 15) {
          observer.error(new Error("Count is greater than 3"));
        }
        count++;
      }, 500);
    });

    // customIntervalObservable.pipe(
    //   map((data: number) => {
    //     return "Round: " + (data + 1);
    //   })
    // );

    this.firstSubscription = customIntervalObservable
      .pipe(
        filter((data: number) => {
          return data > 4;
        }),
        map((data: number) => {
          return "Round: " + (data + 1);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          alert(error.message);
        },
        () => {
          console.log("Completed!");
        }
      );
  }

  ngOnDestroy() {
    this.firstSubscription.unsubscribe();
  }
}
