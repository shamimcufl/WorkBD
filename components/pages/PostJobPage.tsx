
import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import type { AppContextType, Job } from '../../types';
import { generateJobDescription } from '../../services/geminiService';

const PostJobPage: React.FC = () => {
  const { addJob, setView } = useContext(AppContext) as AppContextType;
  const [step, setStep] = useState(1);
  const [jobDetails, setJobDetails] = useState({
    title: '',
    company: '',
    location: 'Dhaka, Bangladesh',
    description: '',
    experience: '',
    ageRequirement: '',
    deadline: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateDescription = async () => {
    if (!jobDetails.title) {
        alert("Please enter a job title first.");
        return;
    }
    setIsGenerating(true);
    const description = await generateJobDescription(jobDetails.title);
    setJobDetails(prev => ({ ...prev, description }));
    setIsGenerating(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Move to payment step
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
        const newJob: Job = {
            ...jobDetails,
            id: `job-${Date.now()}`,
            postedDate: new Date().toISOString().split('T')[0],
        };
        addJob(newJob);
        alert("Payment successful! Your job has been posted.");
        setView('dashboard');
    }, 2000);
  }

  return (
    <div className="max-w-4xl mx-auto bg-base-100 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Post a New Job</h1>
      
      {step === 1 && (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
                <input type="text" name="title" id="title" value={jobDetails.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
                <input type="text" name="company" id="company" value={jobDetails.company} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea name="description" id="description" rows={10} value={jobDetails.description} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"></textarea>
            <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="mt-2 text-sm text-primary hover:underline disabled:text-gray-400">
                {isGenerating ? 'Generating...' : 'Generate with AI ✨'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience Required</label>
                <input type="text" name="experience" id="experience" placeholder="e.g., 3-5 years" value={jobDetails.experience} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
                <label htmlFor="ageRequirement" className="block text-sm font-medium text-gray-700">Age Requirement</label>
                <input type="text" name="ageRequirement" id="ageRequirement" placeholder="e.g., 25-35 years" value={jobDetails.ageRequirement} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Application Deadline</label>
                <input type="date" name="deadline" id="deadline" value={jobDetails.deadline} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
          </div>
          
          <div className="pt-4 text-right">
            <button type="submit" className="bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition-all duration-300">
                Proceed to Payment
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Confirmation</h2>
            <p className="text-gray-600 mb-6">You are about to post the job: <strong>{jobDetails.title}</strong> at <strong>{jobDetails.company}</strong>. The fee for a 30-day listing is BDT 500.</p>
            <div className="bg-neutral p-6 rounded-lg max-w-sm mx-auto">
                <img src="https://seeklogo.com/images/B/bkash-logo-FBB258B90C-seeklogo.com.png" alt="bKash Logo" className="h-12 mx-auto mb-4"/>
                <p className="font-bold text-lg">Total Amount: BDT 500.00</p>
            </div>
            <div className="mt-8 space-x-4">
                 <button onClick={() => setStep(1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-8 rounded-full transition-all duration-300">
                    Back to Edit
                </button>
                <button onClick={handlePayment} className="bg-secondary hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition-all duration-300">
                    Confirm and Pay
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default PostJobPage;
