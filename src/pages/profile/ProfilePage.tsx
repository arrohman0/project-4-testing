import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../utils/api';
import { User } from '../../types/User';
import { 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Globe,
  Linkedin,
  Twitter,
  Github,
  Youtube,
  Instagram,
  Calendar,
  CheckCircle,
  Edit3
} from 'lucide-react';

const ProfilePage = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setUser(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {error || 'Profile not found'}
        </h2>
        <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="h-32 bg-primary-600"></div>
        <div className="px-6 py-4 sm:px-8 sm:py-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                {user.avatar ? (
                  <img
                    className="mx-auto h-20 w-20 rounded-full border-4 border-white dark:border-gray-800 -mt-10 sm:-mt-12"
                    src={user.avatar}
                    alt={user.name}
                  />
                ) : (
                  <div className="mx-auto h-20 w-20 rounded-full border-4 border-white dark:border-gray-800 -mt-10 sm:-mt-12 bg-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                    {user.name}
                  </h1>
                  {user.verified && (
                    <CheckCircle className="ml-2 h-5 w-5 text-primary-600 dark:text-primary-400" />
                  )}
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{user.title}</p>
                {user.location && (
                  <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="mr-1.5 h-4 w-4" />
                    {user.location}
                  </div>
                )}
              </div>
            </div>
            {currentUser?._id === user._id && (
              <div className="mt-5 sm:mt-0">
                <Link
                  to="/profile/edit"
                  className="btn-outline py-2 px-4 flex items-center"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </div>
            )}
          </div>

          {user.bio && (
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Bio</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{user.bio}</p>
            </div>
          )}

          {/* Verification Status */}
          {user.verificationStatus && (
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Verification Status
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg ${
                  user.verificationStatus.identity 
                    ? 'bg-success-50 dark:bg-success-900/20' 
                    : 'bg-gray-50 dark:bg-gray-700/50'
                }`}>
                  <div className="flex items-center">
                    <CheckCircle className={`h-5 w-5 mr-2 ${
                      user.verificationStatus.identity
                        ? 'text-success-600 dark:text-success-400'
                        : 'text-gray-400 dark:text-gray-500'
                    }`} />
                    <span className="text-sm font-medium">Identity Verified</span>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${
                  user.verificationStatus.education
                    ? 'bg-success-50 dark:bg-success-900/20'
                    : 'bg-gray-50 dark:bg-gray-700/50'
                }`}>
                  <div className="flex items-center">
                    <CheckCircle className={`h-5 w-5 mr-2 ${
                      user.verificationStatus.education
                        ? 'text-success-600 dark:text-success-400'
                        : 'text-gray-400 dark:text-gray-500'
                    }`} />
                    <span className="text-sm font-medium">Education Verified</span>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${
                  user.verificationStatus.professional
                    ? 'bg-success-50 dark:bg-success-900/20'
                    : 'bg-gray-50 dark:bg-gray-700/50'
                }`}>
                  <div className="flex items-center">
                    <CheckCircle className={`h-5 w-5 mr-2 ${
                      user.verificationStatus.professional
                        ? 'text-success-600 dark:text-success-400'
                        : 'text-gray-400 dark:text-gray-500'
                    }`} />
                    <span className="text-sm font-medium">Professional Verified</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Skills */}
      {user.skills && user.skills.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {user.experience && user.experience.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Experience</h2>
          <div className="space-y-6">
            {user.experience.map((exp, index) => (
              <div key={index} className="flex">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    {exp.position}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{exp.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(exp.startDate).toLocaleDateString()} - 
                    {exp.current ? ' Present' : new Date(exp.endDate!).toLocaleDateString()}
                  </p>
                  {exp.description && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {user.education && user.education.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Education</h2>
          <div className="space-y-6">
            {user.education.map((edu, index) => (
              <div key={index} className="flex">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-lg bg-secondary-50 dark:bg-secondary-900/20 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{edu.institution}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(edu.startDate).toLocaleDateString()} - 
                    {edu.current ? ' Present' : new Date(edu.endDate!).toLocaleDateString()}
                  </p>
                  {edu.description && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {user.achievements && user.achievements.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Achievements</h2>
          <div className="space-y-6">
            {user.achievements.map((achievement, index) => (
              <div key={index} className="flex">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-lg bg-accent-50 dark:bg-accent-900/20 flex items-center justify-center">
                    <Award className="h-6 w-6 text-accent-600 dark:text-accent-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    {new Date(achievement.date).toLocaleDateString()}
                  </p>
                  {achievement.description && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {achievement.description}
                    </p>
                  )}
                  {achievement.url && (
                    <a
                      href={achievement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-sm text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center"
                    >
                      <Globe className="h-4 w-4 mr-1" />
                      View Certificate
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {user.socialLinks && Object.values(user.socialLinks).some(link => link) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Connect</h2>
          <div className="flex space-x-4">
            {user.socialLinks.website && (
              <a
                href={user.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Globe className="h-6 w-6" />
              </a>
            )}
            {user.socialLinks.linkedin && (
              <a
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            )}
            {user.socialLinks.twitter && (
              <a
                href={user.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Twitter className="h-6 w-6" />
              </a>
            )}
            {user.socialLinks.github && (
              <a
                href={user.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Github className="h-6 w-6" />
              </a>
            )}
            {user.socialLinks.youtube && (
              <a
                href={user.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Youtube className="h-6 w-6" />
              </a>
            )}
            {user.socialLinks.instagram && (
              <a
                href={user.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Instagram className="h-6 w-6" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;