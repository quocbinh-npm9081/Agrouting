import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CanComponentDeactivate } from './can-deactive-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent
  implements OnInit, OnDestroy, CanComponentDeactivate
{
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  paramsSubscription: Subscription;
  fragmentSubscription: Subscription;
  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // console.log('queryParams: ', this.route.snapshot.queryParams);
    // console.log('fragment: ', this.route.snapshot.fragment);
    // console.log('route: ', this.route);
    // console.log('route: ', this.route.snapshot.params.id);
    // console.log('queryParams: ', this.route.queryParams);

    this.fragmentSubscription = this.route.fragment.subscribe((params: any) => {
      // console.log('fragment: ', params);
    });

    this.paramsSubscription = this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      }
    );
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changesSaved = true;
    // console.log(' this.route: ', this.route);
    // console.log(' this.router: ', this.router);

    this.router.navigate(['../', { relativeTo: this.route }]);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }

    if (
      (this.serverName != this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changesSaved
    ) {
      return confirm('Do you want to discard the change ?');
    } else {
      return true;
    }
  }

  ngOnDestroy(): void {
    this.fragmentSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
  }
}
