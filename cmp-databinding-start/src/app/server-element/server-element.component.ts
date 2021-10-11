import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ContentChild,
  ElementRef,
  AfterContentInit,
} from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
  // encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent
  implements OnInit, OnChanges, AfterContentInit
{
  @Input("srvElement") element: { type: string; name: string; content: string };
  @Input() name: String;
  @ContentChild("paragraphContent", { static: true }) paragraph: ElementRef;

  constructor() {
    console.log("constructor called");
  }

  ngOnInit(): void {
    console.log("ngoninit called");
    console.log(
      "text content of paragraph: " + this.paragraph.nativeElement.textContent
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngAfterContentInit() {
    console.log("AfterContentInit called");
    console.log(
      "text content of paragraph: " + this.paragraph.nativeElement.textContent
    );
  }
}
