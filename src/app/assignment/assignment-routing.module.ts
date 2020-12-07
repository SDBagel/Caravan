import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentComponent } from './assignment.component';

const routes: Routes = [
  {
    path: 'course/:courseId/assignment/:assignmentId',
    component: AssignmentComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule {}
