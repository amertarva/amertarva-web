import { writable } from 'svelte/store';
import type { SchoolSummary } from '../../domain/school';

// Store daftar sekolah
export const schoolsStore = writable<SchoolSummary[]>([]);
