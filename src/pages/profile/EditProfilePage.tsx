import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../utils/api';
import { User, Education, Experience, Achievement, SocialLinks } from '../../types/User';
import { 
  Plus,
  Trash2,
  AlertCircle,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Youtube,
  Instagram
} from 'lucide-react';

const EditProfilePage = () => {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    title: '',
    bio: '',
    location: '',
    skills: [],
    education: [],
    experience: [],
    achievements: [],
    socialLinks: {
      website: '',
      linkedin: '',
      twitter: '',
      github: '',
      youtube: '',
      instagram: '',
    },
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        title: currentUser.title || '',
        bio: currentUser.bio || '',
        location: currentUser.location || '',
        skills: currentUser.skills || [],
        education: currentUser.education || [],
        experience: currentUser.experience || [],
        achievements: currentUser.achievements || [],
        socialLinks: currentUser.socialLinks || {
          website: '',
          linkedin: '',
          twitter: '',
          github: '',
          youtube: '',
          instagram: '',
        },
      });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prev => ({
      ...prev,
      skills,
    }));
  };

  const handleSocialLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education?.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ) || [],
    }));
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience?.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ) || [],
    }));
  };

  const handleAchievementChange = (index: number, field: keyof Achievement, value: string) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements?.map((ach, i) =>
        i === index ? { ...ach, [field]: value } : ach
      ) || [],
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education?.filter((_, i) => i !== index) || [],
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        {
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience?.filter((_, i) => i !== index) || [],
    }));
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [
        ...(prev.achievements || []),
        {
          title: '',
          date: '',
          description: '',
          url: '',
        },
      ],
    }));
  };

  const removeAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.put('/users/profile', formData);
      setSuccess(true);
      setTimeout(() => {
        navigate(`/profile/${currentUser?._id}`);
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Edit Profile
        </h1>

        {error && (
          <div className="mb-4 p-4 rounded-md bg-error-50 dark:bg-error-900/20 text-error-800 dark:text-error-200">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-error-400 dark:text-error-500 mr-2" />
              {error}
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 rounded-md bg-success-50 dark:bg-success-900/20 text-success-800 dark:text-success-200">
            Profile updated successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Basic Information
            </h2>

            <div>
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="title" className="form-label">Professional Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            <div>
              <label htmlFor="bio" className="form-label">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="form-input"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., San Francisco, CA"
              />
            </div>

            <div>
              <label htmlFor="skills" className="form-label">Skills</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills?.join(', ')}
                onChange={handleSkillsChange}
                className="form-input"
                placeholder="e.g., JavaScript, React, Node.js"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Separate skills with commas
              </p>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Education
              </h2>
              <button
                type="button"
                onClick={addEducation}
                className="btn-outline py-1 px-3 text-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Education
              </button>
            </div>

            {formData.education?.map((edu, index) => (
              <div key={index} className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex justify-between">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    Education #{index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-error-600 dark:text-error-400 hover:text-error-800 dark:hover:text-error-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Field of Study</label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                      className="form-input"
                      disabled={edu.current}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={edu.current}
                      onChange={(e) => handleEducationChange(index, 'current', e.target.checked.toString())}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Currently studying here
                    </label>
                  </div>
                </div>

                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                    className="form-input"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Experience
              </h2>
              <button
                type="button"
                onClick={addExperience}
                className="btn-outline py-1 px-3 text-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Experience
              </button>
            </div>

            {formData.experience?.map((exp, index) => (
              <div key={index} className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex justify-between">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    Experience #{index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-error-600 dark:text-error-400 hover:text-error-800 dark:hover:text-error-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Position</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      className="form-input"
                      disabled={exp.current}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => handleExperienceChange(index, 'current', e.target.checked.toString())}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      I currently work here
                    </label>
                  </div>
                </div>

                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    className="form-input"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Achievements
              </h2>
              <button
                type="button"
                onClick={addAchievement}
                className="btn-outline py-1 px-3 text-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Achievement
              </button>
            </div>

            {formData.achievements?.map((achievement, index) => (
              <div key={index} className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex justify-between">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    Achievement #{index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    className="text-error-600 dark:text-error-400 hover:text-error-800 dark:hover:text-error-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      value={achievement.title}
                      onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      value={achievement.date}
                      onChange={(e) => handleAchievementChange(index, 'date', e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="form-label">Description</label>
                    <textarea
                      value={achievement.description}
                      onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                      className="form-input"
                      rows={3}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="form-label">URL</label>
                    <input
                      type="url"
                      value={achievement.url}
                      onChange={(e) => handleAchievementChange(index, 'url', e.target.value)}
                      className="form-input"
                      placeholder="e.g., link to certificate"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Social Links
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.socialLinks?.website}
                  onChange={handleSocialLinksChange}
                  className="form-input"
                  placeholder="https://your-website.com"
                />
              </div>

              <div>
                <label className="form-label flex items-center">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.socialLinks?.linkedin}
                  onChange={handleSocialLinksChange}
                  className="form-input"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="form-label flex items-center">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </label>
                <input
                  type="url"
                  name="twitter"
                  value={formData.socialLinks?.twitter}
                  onChange={handleSocialLinksChange}
                  className="form-input"
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div>
                <label className="form-label flex items-center">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.socialLinks?.github}
                  onChange={handleSocialLinksChange}
                  className="form-input"
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className="form-label flex items-center">
                  <Youtube className="h-4 w-4 mr-2" />
                  YouTube
                </label>
                <input
                  type="url"
                  name="youtube"
                  value={formData.socialLinks?.youtube}
                  onChange={handleSocialLinksChange}
                  className="form-input"
                  placeholder="https://youtube.com/@channel"
                />
              </div>

              <div>
                <label className="form-label flex items-center">
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </label>
                <input
                  type="url"
                  name="instagram"
                  value={formData.socialLinks?.instagram}
                  onChange={handleSocialLinksChange}
                  className="form-input"
                  placeholder="https://instagram.com/username"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-outline py-2 px-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary py-2 px-4"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;