@echo off
(
echo import { OXFORD_A1_A2 } from './real-data/oxford-3000'
echo import { IELTS_ACADEMIC, TOEIC_BUSINESS } from './real-data/ielts-specialized'
echo import { TOEIC_ROADMAP_DECKS } from './real-data/toeic-roadmap'
echo import {
echo     TOEIC_PART_1_2,
echo     TOEIC_PART_3_4,
echo     TOEIC_PART_5_6,
echo     TOEIC_PART_7,
echo     TOEIC_BUSINESS_TOPIC
echo } from './real-data/toeic-comprehensive'
echo import { EXTRA_DECKS } from './vocabulary-packs'
echo import { shuffleArray } from '@/utils/quiz'
echo.
echo export interface VocabWord {
echo     term: string
echo     definition: string
echo     example: string
echo     phonetic: string
echo }
echo.
echo function deduplicateVocabulary(words: VocabWord[]): VocabWord[] {
echo     const seen = new Map^<string, VocabWord^>()
echo     for (const word of words) {
echo         const key = word.term.toLowerCase().trim()
echo         if (!seen.has(key)) {
echo             seen.set(key, word)
echo         }
echo     }
echo     return Array.from(seen.values())
echo }
echo.
echo export interface VocabDeck {
echo     name: string
echo     words: VocabWord[]
echo     color: string
echo     icon: string
echo     description: string
echo }
echo.
echo const DECKS: VocabDeck[] = [
echo     ...GLISH_ROADMAP_DECKS,
echo     {
echo         name: 'Oxford 3000 (A1-B2)',
echo         words: OXFORD_A1_A2,
echo         color: '#4F46E5',
echo         icon: '📘',
echo         description: '3000 tu vung cot loi quan trong nhat trong tieng Anh.'
echo     },
echo     {
echo         name: 'IELTS Academic Vocab',
echo         words: IELTS_ACADEMIC,
echo         color: '#DC2626',
echo         icon: '🎓',
echo         description: 'Tu vung hoc thuat chuyen sau cho bai thi IELTS.'
echo     },
echo     {
echo         name: 'Comprehensive TOEIC',
echo         words: shuffleArray(deduplicateVocabulary([
echo             ...DOCTYPE_PART_1_2,
echo             ...DOCTYPE_PART_3_4,
echo             ...DOCTYPE_PART_5_6,
echo             ...DOCTYPE_PART_7,
echo             ...DOCTYPE_BUSINESS_TOPIC
echo         ])),
echo         color: '#F59E0B',
echo         icon: '🎯',
echo         description: 'Trong bo tu vung TOEIC da loc trung lap.'
echo     },
echo     ...EXTRA_DECKS
echo ]
echo.
echo export function getAllVocabularyDecks(): VocabDeck[] {
echo     return DECKS
echo }
echo.
echo export function getTotalWordCount(): number {
echo     return DECKS.reduce((sum, deck) =^> sum + deck.words.length, 0)
echo }
echo.
echo export function getDeckByName(name: string): VocabDeck ^| undefined {
echo     return DECKS.find(d =^> d.name === name)
echo }
) > src\data\index.ts
