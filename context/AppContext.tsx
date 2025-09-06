
import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { View, Job, Applicant, AppContextType } from '../types';
import { ApplicantStatus } from '../types';
import { generateSampleJobs } from '../services/geminiService';

export const AppContext = createContext<AppContextType | null>(null);

const initialJobs: Job[] = [
    {
        id: 'job-1',
        title: 'Senior Frontend Developer',
        company: 'Tech Innovators Inc.',
        location: 'Dhaka, Bangladesh',
        description: 'We are looking for a skilled React developer to join our team. You will be responsible for developing and implementing user interface components using React.js concepts and workflows.',
        deadline: '2024-08-30',
        experience: '3-5 years',
        ageRequirement: '25-35 years',
        postedDate: '2024-07-15',
    },
    {
        id: 'job-2',
        title: 'Product Manager',
        company: 'Creative Solutions Ltd.',
        location: 'Chittagong, Bangladesh',
        description: 'Seeking an experienced Product Manager to guide the success of a product and lead the cross-functional team that is responsible for improving it. This is an important organizational role that sets the strategy, roadmap, and feature definition for a product or product line.',
        deadline: '2024-08-25',
        experience: '5+ years',
        ageRequirement: '30-40 years',
        postedDate: '2024-07-10',
    }
];

const initialApplicants: Applicant[] = [
    {
        id: 'app-1',
        jobId: 'job-1',
        name: 'John Doe',
        email: 'john.doe@email.com',
        cv: null,
        coverLetter: null,
        supportingDocs: null,
        status: ApplicantStatus.New,
        appliedDate: new Date(),
    },
    {
        id: 'app-2',
        jobId: 'job-1',
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        cv: null,
        coverLetter: null,
        supportingDocs: null,
        status: ApplicantStatus.Shortlisted,
        appliedDate: new Date(),
    }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [view, setView] = useState<View>('home');
    const [jobs, setJobs] = useState<Job[]>(initialJobs);
    const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoading(true);
            const generatedJobs = await generateSampleJobs();
            if (generatedJobs.length > 0) {
                setJobs(prevJobs => [...generatedJobs, ...prevJobs]);
            }
            setIsLoading(false);
        };
        loadInitialData();
    }, []);

    const addJob = useCallback((job: Job) => {
        setJobs(prev => [job, ...prev]);
    }, []);

    const addApplicant = useCallback((applicant: Applicant) => {
        setApplicants(prev => [applicant, ...prev]);
    }, []);
    
    const updateApplicantStatus = useCallback((applicantId: string, status: ApplicantStatus) => {
        setApplicants(prev => prev.map(app => app.id === applicantId ? { ...app, status } : app));
    }, []);

    const getApplicantsForJob = useCallback((jobId: string) => {
        return applicants.filter(app => app.jobId === jobId);
    }, [applicants]);
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-base-100">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                    <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading WorkBD...</h2>
                </div>
            </div>
        );
    }


    return (
        <AppContext.Provider value={{ view, setView, jobs, addJob, applicants, addApplicant, updateApplicantStatus, getApplicantsForJob }}>
            {children}
        </AppContext.Provider>
    );
};
