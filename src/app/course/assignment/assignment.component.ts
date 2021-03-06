import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Assignment, Course, Submission } from '../../core/schemas';
import { AssignmentService, CourseService } from '../../core/services/canvas';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  assignment: Assignment;
  assignmentBody: SafeHtml;
  course: Course;

  // True if possibility that assignment can be graded.
  isAssignmentGraded = true;

  latestSubmission: Submission;
  unlimitedAttempts: boolean;
  isFocusSubmission = true;

  constructor(private assignmentService: AssignmentService,
              private courseService: CourseService,
              private sanitizer: DomSanitizer,
              private titleService: Title,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const cId = parseInt(this.route.parent.snapshot.paramMap.get("id"));
    this.route.params.subscribe(p => {
      // Get assignment from API/Cache
      this.assignmentService.getAssignment(cId, p.aId, a => this.setAssignment(cId, a));
    });
  }

  private setAssignment(cId: number, assignment: Assignment): void {
    // Set assignment information.
    this.assignment = assignment;
    this.assignmentBody = this.sanitizer.bypassSecurityTrustHtml(assignment.description);
    this.isAssignmentGraded = assignment.submission_types.join() !== 'not_graded';
    this.titleService.setTitle(`${assignment.name} | Caravan`);

    // Get related course
    this.courseService.getCourse(cId, course => this.course = course);

    // Only get submissions if the assignment is graded.
    if (this.isAssignmentGraded) {
      // TODO: Refactor to Submissions API
      this.assignmentService.getLatestSubmission(cId, assignment.id, s => {
        this.latestSubmission = s;
        
        // If no submission, remove viewing option
        if (!s.submitted_at) this.isFocusSubmission = false;
      });
  
      // -1 attempts denotes unlimited submissions possible.
      this.unlimitedAttempts = assignment.allowed_attempts === -1;
    }
  }

  focusSubmission(t: boolean): void {
    this.isFocusSubmission = t;
  }

}
