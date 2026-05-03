const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name company');
    res.json(jobs);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name company').populate('applications.userId', 'name email');
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create job (employer only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ msg: 'Only employers can post jobs' });
    }

    const { title, description, company, location, salary, jobType, experienceLevel, skills } = req.body;

    const job = new Job({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      experienceLevel,
      skills,
      postedBy: req.user.id,
    });

    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Apply to job
router.post('/:id/apply', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check if already applied
    const alreadyApplied = job.applications.find(app => app.userId.toString() === req.user.id);
    if (alreadyApplied) {
      return res.status(400).json({ msg: 'Already applied to this job' });
    }

    job.applications.push({ userId: req.user.id });
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update job (employer only)
router.put('/:id', auth, async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to update this job' });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete job (employer only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Job deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;