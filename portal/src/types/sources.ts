export type Sources =
  | "Downloads"
  | "Registrations"
  | "Webinars"
  | "Contacts"
  | "Courses"
  | "Trainings"
  | "Other";

export enum SourceType {
  Downloads = "Downloads",
  Registrations = "Registrations",
  Webinars = "Webinars",
  Contacts = "Contacts",
  Courses = "Courses",
  Trainings = "Trainings",
  Other = "Other",
}

export type ContactSourceType =
  | "Contact Page"
  | "Contact Popup"
  | "Course"
  | "Schedule";

export enum ContactSource {
  ContactPage = "Contact Page",
  ContactPopup = "Contact Popup",
  Course = "Course",
  Schedule = "Schedule",
}
