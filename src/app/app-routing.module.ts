import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { UserComponent } from './users/user/user.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth-guard.service';
import { CanDeactiveGuard } from './servers/edit-server/can-deactive-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolve.service';
// Sự khác biệt giữa Params và Fragments

//PARAMS
//https://example.com/search?query=angular&page=1
//-> Param xuất hiện sau dấu "?" trong URL và thường có cấu trúc như ?key1=value1&key2=value2.
//-> Chúng thường được sử dụng trong các ứng dụng web để truyền dữ liệu hoặc tham số cho trang web hoặc ứng dụng web khác.

// FRAGMENTS
//https://example.com/page#loading
// Fragment xuất hiện sau dấu "#" trong URL và thường có cấu trúc như #section.
// Chúng thường được sử dụng để điều hướng người dùng đến một phần cụ thể của một trang web hoặc để đánh dấu các phần tài liệu dài.

const appRouters: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: [{ path: ':id/:name', component: UserComponent }],
  },

  // { path: 'servers/:id/edit', component: EditServerComponent },
  // { path: 'servers/:id', component: ServerComponent },
  {
    path: 'servers',
    // canActivate:[AuthGuard], // validation authentian cho router cha
    canActivateChild: [AuthGuard], // validation authentition cho router con
    component: ServersComponent,
    children: [
      {
        path: ':id/edit',
        canDeactivate: [CanDeactiveGuard],
        component: EditServerComponent,
      },
      {
        path: ':id',
        component: ServerComponent,
        resolve: { server: ServerResolver }, // Tải dữ liệu từ server trước khi tải ServerComponent
      },
    ],
  },
  //404 page
  //{ path: 'not-found', component: PageNotFoundComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page Not Found!' },
  },
  { path: '**', redirectTo: '/not-found' },
];
@NgModule({
  imports: [RouterModule.forRoot(appRouters, { useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
