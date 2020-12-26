import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../core/services/canvas';
import { Course, Page } from '../core/schemas';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  course: Course;
  frontPage: Page;

  constructor(private courseService: CourseService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.course = await this.courseService.getCourse(params.id);
      this.frontPage = await this.courseService.getCourseFrontPage(params.id);
      console.log(this.course);
    });
  }

}