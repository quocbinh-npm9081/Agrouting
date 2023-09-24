import { Component, OnDestroy, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat/Subscription';
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit, OnDestroy {
  server: { id: number; name: string; status: string };
  paramsSub: Subscription;
  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }

  ngOnInit() {
    //Có resolve rồi nên không cần láy serverById 1 cách thủ công này nữa

    // const id = Number(this.route.snapshot.params['id']);
    // this.server = this.serversService.getServer(id);
    // this.paramsSub = this.route.params.subscribe(({ id }) => {
    //   this.server = this.serversService.getServer(Number(id));
    // });

    this.route.data.subscribe((data: Data) => {
      this.server = data['server'];
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }
}
