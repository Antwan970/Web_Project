import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { jobApi } from '../api';
import '../styles/Jobs.css';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await jobApi.getAll();

      if (!result.success) {
        throw new Error(result.error);
      }

      setJobs(result.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="jobs-container">
        <div className="loading">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobs-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="jobs-container">
      <h1>Available Jobs</h1>

      {jobs.length === 0 ? (
        <div className="no-jobs">
          <p>No jobs available at the moment. Please check back later.</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3 className="job-title">{job.title}</h3>
              <p className="job-description">{job.description}</p>
              <div className="job-meta">
                <span className="job-niche">📌 {job.niche}</span>
                <span className="job-budget">💰 ${job.budget}</span>
              </div>
              <span className={`job-status ${job.status}`}>
                {job.status}
              </span>
              <button className="btn btn-primary btn-small">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
