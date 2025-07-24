
import React, { useState } from 'react';
import { AnalysisResult, Recommendation, AnalysisCategory } from '../types';
import RecommendationCard from './RecommendationCard';

interface AnalysisResultsProps {
  results: AnalysisResult;
  analyzedUrl: string;
}

const CategorySection: React.FC<{ title: string; recommendations: Recommendation[]; icon: React.ReactNode }> = ({ title, recommendations, icon }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="mb-6 bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-700">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex items-center">
                {icon}
                <h3 className="text-xl font-semibold text-sky-400 ml-3">{title}</h3>
            </div>
            <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDownIcon />
            </span>
        </div>
        {isOpen && <p className="text-slate-400 mt-3">No specific recommendations provided for this category or the category may not be applicable.</p>}
      </div>
    );
  }

  return (
    <div className="mb-8 bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700 transition-all hover:border-sky-700">
      <div className="flex items-center justify-between cursor-pointer mb-4" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center">
            {icon}
            <h3 className="text-2xl font-semibold text-sky-400 ml-3">{title}</h3>
        </div>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <ChevronDownIcon />
        </span>
      </div>
      {isOpen && (
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <RecommendationCard key={index} recommendation={rec} />
          ))}
        </div>
      )}
    </div>
  );
};


const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results, analyzedUrl }) => {
  const categoryMap: { category: AnalysisCategory; data: Recommendation[]; icon: React.ReactNode }[] = [
    { category: AnalysisCategory.UX, data: results.ux_recommendations, icon: <UserExperienceIcon /> },
    { category: AnalysisCategory.DESIGN, data: results.design_recommendations, icon: <WebDesignIcon /> },
    { category: AnalysisCategory.SEO, data: results.seo_recommendations, icon: <SeoIcon /> },
    { category: AnalysisCategory.PRODUCT, data: results.product_attractiveness_recommendations, icon: <ProductIcon /> },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-2 text-sky-300">Analysis Results for:</h2>
      <p className="text-center text-sky-500 font-mono break-all mb-8 text-lg">{analyzedUrl}</p>
      {categoryMap.map(item => (
        <CategorySection
          key={item.category}
          title={item.category}
          recommendations={item.data}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

// SVG Icons (can be moved to a separate file if they grow)
const UserExperienceIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const WebDesignIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const SeoIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7L7 10M10 7L13 10M10 7v6" />
  </svg>
);

const ProductIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const ChevronDownIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);


export default AnalysisResults;
