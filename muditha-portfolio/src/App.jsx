import { useState, useEffect } from 'react';
import { staticData } from './components/staticData';
import MainLayout from './layouts/MainLayout';

import ExperienceSection from './components/ExperienceSection'; 
import AffiliationSection from './components/AffiliationSection';
import AwardsSection from './components/AwardsSection'; 
import CertificationsSection from './components/certificationsSection';
import EducationSection from './components/EducationSection';
import HobbySection from './components/HobbySection';
import LeadershipSection from './components/LeadershipSection';
import PublicationsSection from './components/PublicationsSection';
import SkillsSection from './components/SkillsSection';
import AboutSection from './components/AboutSection';
import Projects from './components/Projects';

import './index.css';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [urls, setUrls] = useState({});

  useEffect(() => {
    setProfile(staticData.profile.items[0]?.fields || null);

    const urlMap = {};
    (staticData.urls?.items || []).forEach(item => {
      const name = item.fields?.urlName;
      const data = item.fields?.urlData;
      if (name && data) urlMap[name] = data;
    });
    setUrls(urlMap);
  }, []);

  if (!profile) return null;

  return (
    <MainLayout profile={profile} URLS={urls}>
      <AboutSection profile={profile} />
      <ExperienceSection />
      <Projects />
      <PublicationsSection />
      <SkillsSection />
      <EducationSection />
      <AwardsSection />
      <LeadershipSection />
      <CertificationsSection />
      <AffiliationSection />
      <HobbySection />
    </MainLayout>
  );
}