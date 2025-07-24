
import React from 'react';
import { Recommendation } from '../types';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  return (
    <div className="bg-slate-700/50 p-4 rounded-lg shadow-md border border-slate-600/50 transition-all hover:shadow-lg hover:border-sky-500/50">
      <h4 className="text-md font-semibold text-sky-300 mb-1">{recommendation.title}</h4>
      <p className="text-sm text-slate-300 leading-relaxed">{recommendation.description}</p>
    </div>
  );
};

export default RecommendationCard;
