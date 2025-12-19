import { Component, inject, signal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Department {
  idDepartment: number;
  name: string;
  location: string;
  phone: string;
  head: string;
}

interface Student {
  idStudent: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string | null;
  address: string;
  department?: Department | null;
}

interface Enrollment {
  idEnrollment: number;
  enrollmentDate: string | null;
  grade: number | null;
  status: string;
  student?: Student | null;
  course?: { idCourse: number; name: string; code: string; credit: number } | null;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, FormsModule, NgIf, NgFor],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private http = inject(HttpClient);

  protected readonly title = signal('student-frontend');

  // Lists
  students: Student[] = [];
  departments: Department[] = [];
  enrollments: Enrollment[] = [];

  // Single selections
  selectedStudent?: Student;
  selectedDepartment?: Department;
  selectedEnrollment?: Enrollment;

  // ID inputs
  studentId?: number;
  departmentId?: number;
  enrollmentId?: number;

  // Simple forms for create/update
  newStudent: Partial<Student> = {};
  newDepartment: Partial<Department> = {};
  newEnrollment: Partial<Enrollment> = {};

  // Loading flags
  loadingStudents = false;
  loadingDepartments = false;
  loadingEnrollments = false;

  loadingStudentById = false;
  loadingDepartmentById = false;
  loadingEnrollmentById = false;

  error = '';

  private readonly backendBaseUrl = 'http://localhost:8089/student';

  // ===== Students =====
  loadStudents(): void {
    this.loadingStudents = true;
    this.error = '';

    this.http
      .get<Student[]>(`${this.backendBaseUrl}/students/getAllStudents`)
      .subscribe({
        next: (data) => {
          this.students = data;
          this.loadingStudents = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load students';
          this.loadingStudents = false;
        },
      });
  }

  loadStudentById(): void {
    if (this.studentId == null) {
      return;
    }
    this.loadingStudentById = true;
    this.error = '';

    this.http
      .get<Student>(`${this.backendBaseUrl}/students/getStudent/${this.studentId}`)
      .subscribe({
        next: (data) => {
          this.selectedStudent = data;
          this.loadingStudentById = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load student by id';
          this.loadingStudentById = false;
        },
      });
  }

  createStudent(): void {
    this.http
      .post<Student>(`${this.backendBaseUrl}/students/createStudent`, this.newStudent)
      .subscribe({
        next: () => {
          this.newStudent = {};
          this.loadStudents();
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to create student';
        },
      });
  }

  deleteStudent(id: number): void {
    this.http
      .delete(`${this.backendBaseUrl}/students/deleteStudent/${id}`)
      .subscribe({
        next: () => this.loadStudents(),
        error: (err) => {
          console.error(err);
          this.error = 'Failed to delete student';
        },
      });
  }

  // ===== Departments =====
  loadDepartments(): void {
    this.loadingDepartments = true;
    this.error = '';

    this.http
      .get<Department[]>(`${this.backendBaseUrl}/Depatment/getAllDepartments`)
      .subscribe({
        next: (data) => {
          this.departments = data;
          this.loadingDepartments = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load departments';
          this.loadingDepartments = false;
        },
      });
  }

  loadDepartmentById(): void {
    if (this.departmentId == null) {
      return;
    }
    this.loadingDepartmentById = true;
    this.error = '';

    this.http
      .get<Department>(`${this.backendBaseUrl}/Depatment/getDepartment/${this.departmentId}`)
      .subscribe({
        next: (data) => {
          this.selectedDepartment = data;
          this.loadingDepartmentById = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load department by id';
          this.loadingDepartmentById = false;
        },
      });
  }

  createDepartment(): void {
    this.http
      .post<Department>(`${this.backendBaseUrl}/Depatment/createDepartment`, this.newDepartment)
      .subscribe({
        next: () => {
          this.newDepartment = {};
          this.loadDepartments();
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to create department';
        },
      });
  }

  deleteDepartment(id: number): void {
    this.http
      .delete(`${this.backendBaseUrl}/Depatment/deleteDepartment/${id}`)
      .subscribe({
        next: () => this.loadDepartments(),
        error: (err) => {
          console.error(err);
          this.error = 'Failed to delete department';
        },
      });
  }

  // ===== Enrollments =====
  loadEnrollments(): void {
    this.loadingEnrollments = true;
    this.error = '';

    this.http
      .get<Enrollment[]>(`${this.backendBaseUrl}/Enrollment/getAllEnrollment`)
      .subscribe({
        next: (data) => {
          this.enrollments = data;
          this.loadingEnrollments = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load enrollments';
          this.loadingEnrollments = false;
        },
      });
  }

  loadEnrollmentById(): void {
    if (this.enrollmentId == null) {
      return;
    }
    this.loadingEnrollmentById = true;
    this.error = '';

    this.http
      .get<Enrollment>(`${this.backendBaseUrl}/Enrollment/getEnrollment/${this.enrollmentId}`)
      .subscribe({
        next: (data) => {
          this.selectedEnrollment = data;
          this.loadingEnrollmentById = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load enrollment by id';
          this.loadingEnrollmentById = false;
        },
      });
  }

  createEnrollment(): void {
    this.http
      .post<Enrollment>(`${this.backendBaseUrl}/Enrollment/createEnrollment`, this.newEnrollment)
      .subscribe({
        next: () => {
          this.newEnrollment = {};
          this.loadEnrollments();
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to create enrollment';
        },
      });
  }

  deleteEnrollment(id: number): void {
    this.http
      .delete(`${this.backendBaseUrl}/Enrollment/deleteEnrollment/${id}`)
      .subscribe({
        next: () => this.loadEnrollments(),
        error: (err) => {
          console.error(err);
          this.error = 'Failed to delete enrollment';
        },
      });
  }
}
