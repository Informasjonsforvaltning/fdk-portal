import { MetadataQualityRatingCategory } from '../../types/enums';

export const mapScoreToRatingCategory = (score: number) => {
  if (score >= 351) {
    return MetadataQualityRatingCategory.EXCELLENT;
  }
  if (score >= 221) {
    return MetadataQualityRatingCategory.GOOD;
  }
  if (score >= 121) {
    return MetadataQualityRatingCategory.SUFFICIENT;
  }

  return MetadataQualityRatingCategory.POOR;
};
