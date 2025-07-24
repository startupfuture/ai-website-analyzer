
export interface Recommendation {
  title: string;
  description: string;
}

export interface AnalysisResult {
  ux_recommendations: Recommendation[];
  design_recommendations: Recommendation[];
  seo_recommendations: Recommendation[];
  product_attractiveness_recommendations: Recommendation[];
}

export enum AnalysisCategory {
  UX = "User Experience",
  DESIGN = "Web Design",
  SEO = "SEO Optimization",
  PRODUCT = "Product Attractiveness"
}

export type AnalysisData = {
  [key in AnalysisCategory]?: Recommendation[];
};
