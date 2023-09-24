import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  public servers: { id: number; name: string; status: string }[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }
  onReloadComponent() {
    // console.log('Current route I am on:', this.router.url);

    // this.router.navigate(['/servers'], { relativeTo: this.route });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/servers']).then(() => {
        console.log(`After navigation I am on:${this.router.url}`);
      });
    });
  }

  onReloadPage() {
    window.location.reload();
  }
}
