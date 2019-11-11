import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FourohfourComponent } from './components/fourohfour/fourohfour.component';
import { UploadComponent } from './components/upload/upload.component';
import { PostsComponent } from './components/posts/posts.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'signin', component: LoginComponent },
	{ path: 'signup', component: RegisterComponent },
	{ path: 'logout', component: LogoutComponent },
	{ path: 'posts/search', component: PostsComponent },
	{ path: 'posts/:id', component: VehicleComponent },
	{ path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
	{ path: '**', component: FourohfourComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 