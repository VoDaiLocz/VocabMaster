// ============================================
// Master Bilingual Story Library Dataset
// ============================================

import { BilingualStory } from '@/types/story'
import { XIANXIA_STORIES } from './xianxia'
import { TECH_STORIES } from './tech'
import { DETECTIVE_STORIES } from './detective'
import { FABLES_STORIES } from './fables'
import { LIFE_STORIES } from './life'

export const BILINGUAL_STORIES_DATA: BilingualStory[] = [
  ...XIANXIA_STORIES,
  ...TECH_STORIES,
  ...DETECTIVE_STORIES,
  ...FABLES_STORIES,
  ...LIFE_STORIES,
]

export { XIANXIA_STORIES, TECH_STORIES, DETECTIVE_STORIES, FABLES_STORIES, LIFE_STORIES }
