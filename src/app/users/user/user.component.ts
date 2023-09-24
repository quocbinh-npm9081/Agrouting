import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  paramsSubscription: Subscription;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      // Lấy params lần đầu tiên
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };

    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      //theo dõi params
      this.user.id = params['id'];
      this.user.name = params['name'];
      // console.log('user: ', this.user);
    });
  }

  ngOnDestroy(): void {
    // console.log('unmount');
    this.paramsSubscription.unsubscribe();
  }
}
