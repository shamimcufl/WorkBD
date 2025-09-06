
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import type { Job, Applicant, AppContextType } from '../types';
import { ApplicantStatus } from '../types';

interface ApplicationFormProps {
    job: Job;
}

const FileInput: React.FC<{id: string, label: string, file: File | null, setFile: (file: File | null) => void}> = ({id, label, file, setFile}) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                        <label htmlFor={id} className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                            <span>Upload a file</span>
                            <input id={id} name={id} type="file" className="sr-only" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    {file && <p className="text-xs text-gray-500">{file.name}</p>}
                    {!file && <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>}
                </div>
            </div>
        </div>
    );
};


const ApplicationForm: React.FC<ApplicationFormProps> = ({ job }) => {
    const { addApplicant, setView } = useContext(AppContext) as AppContextType;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cv, setCv] = useState<File | null>(null);
    const [coverLetter, setCoverLetter] = useState<File | null>(null);
    const [supportingDocs, setSupportingDocs] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name || !email || !cv) {
            setError('Name, email, and CV are required.');
            return;
        }
        setError('');
        setIsSubmitting(true);

        const newApplicant: Applicant = {
            id: `app-${Date.now()}`,
            jobId: job.id,
            name,
            email,
            cv,
            coverLetter,
            supportingDocs,
            status: ApplicantStatus.New,
            appliedDate: new Date(),
        };

        setTimeout(() => {
            addApplicant(newApplicant);
            setIsSubmitting(false);
            alert('Application submitted successfully!');
            setView('jobs');
        }, 1500);
    };

    return (
        <div className="bg-base-100 p-6 rounded-lg shadow-lg sticky top-24">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Apply for this Job</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                </div>

                <FileInput id="cv" label="Upload CV (Required)" file={cv} setFile={setCv} />
                <FileInput id="cover-letter" label="Upload Cover Letter" file={coverLetter} setFile={setCoverLetter} />
                <FileInput id="supporting-docs" label="Upload Supporting Documents" file={supportingDocs} setFile={setSupportingDocs} />

                {error && <p className="text-red-500 text-sm">{error}</p>}
                
                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400">
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        </div>
    );
};

export default ApplicationForm;
