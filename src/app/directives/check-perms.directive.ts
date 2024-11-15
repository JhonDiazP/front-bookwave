import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import { UserService } from '../business-controller/user.service';

@Directive({
  selector: '[ngxCheckPerms]',
})
export class CheckPermsDirective implements OnInit {
  @Input() ngxCheckPerms!: string;

  constructor(
    private el: ElementRef,
    private userBs: UserService,
  ) {
  }

  ngOnInit(): void {
    if (!this.userBs.CheckPermission(this.ngxCheckPerms)) {
      this.el.nativeElement.remove();
    }
  }

}
