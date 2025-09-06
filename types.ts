
export enum ApplicantStatus {
  New = 'New',
  Shortlisted = 'Shortlisted',
  Interviewing = 'Interviewing',
  Hired = 'Hired',
  Rejected = 'Rejected',
}

export interface Applicant {
  id: string;
  jobId: string;
  name: string;
  email: string;
  cv: File | null;
  coverLetter: File | null;
  supportingDocs: File | null;
  status: ApplicantStatus;
  appliedDate: Date;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  deadline: string;
  experience: string;
  ageRequirement: string;
  postedDate: string;
}

export type View = 'home' | 'jobs' | 'post-job' | 'dashboard' | { type: 'job-details'; id: string } | { type: 'manage-applicants'; id: string };

export interface AppContextType {
  view: View;
  setView: (view: View) => void;
  jobs: Job[];
  addJob: (job: Job) => void;
  applicants: Applicant[];
  addApplicant: (applicant: Applicant) => void;
  updateApplicantStatus: (applicantId: string, status: ApplicantStatus) => void;
  getApplicantsForJob: (jobId: string) => Applicant[];
}
