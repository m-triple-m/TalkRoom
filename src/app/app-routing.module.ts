import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { RoomDashboardComponent } from './room-dashboard/room-dashboard.component';




const routes: Routes = [
  { path : 'register', component : RegisterComponent},
  { path : 'userdash', component : UserDashboardComponent},
  { path : 'room', component : RoomDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
