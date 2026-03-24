// ─── Seed data ────────────────────────────────────────────────────────────────
import { User, UserRole } from '@/types/auth';

const FIRST_NAMES = [
  'Alice',
  'Bob',
  'Carol',
  'David',
  'Eva',
  'Frank',
  'Grace',
  'Henry',
  'Iris',
  'Jack',
  'Karen',
  'Leo',
  'Mia',
  'Noah',
  'Olivia',
  'Paul',
  'Quinn',
  'Rachel',
  'Sam',
  'Tina',
  'Uma',
  'Victor',
  'Wendy',
  'Xavier',
  'Yvonne',
  'Zach',
  'Amy',
  'Brian',
  'Clara',
  'Dan',
];

const LAST_NAMES = [
  'Johnson',
  'Martinez',
  'White',
  'Lee',
  'Brown',
  'Wilson',
  'Chen',
  'Davis',
  'Taylor',
  'Anderson',
  'Thomas',
  'Garcia',
  'Rodriguez',
  'Miller',
  'Moore',
  'Jackson',
  'Harris',
  'Thompson',
  'Martin',
  'Lewis',
  'Walker',
  'Scott',
  'Hall',
  'Allen',
  'Young',
  'King',
  'Wright',
  'Lopez',
  'Hill',
  'Green',
];

const ROLES: UserRole[] = ['super_admin', 'admin', 'manager', 'viewer'];

// Weighted distribution: more viewers/managers than admins
const ROLE_WEIGHTS: UserRole[] = [
  'viewer',
  'viewer',
  'viewer',
  'viewer',
  'manager',
  'manager',
  'manager',
  'admin',
  'admin',
  'super_admin',
];

const AVATAR_STYLES = [
  'adventurer',
  'avataaars',
  'bottts',
  'fun-emoji',
  'micah',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Seeded pseudo-random number (0–1) — deterministic per index */
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10_000;
  return x - Math.floor(x);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.floor(seededRandom(seed) * arr.length)]!;
}

function randomDateBetween(start: Date, end: Date, seed: number): Date {
  const diff = end.getTime() - start.getTime();
  return new Date(start.getTime() + Math.floor(seededRandom(seed) * diff));
}

function toISOString(date: Date): string {
  return date.toISOString();
}

function generateAvatar(name: string, index: number): string {
  const style = AVATAR_STYLES[index % AVATAR_STYLES.length]!;
  const seed = encodeURIComponent(name.toLowerCase().replace(' ', '-'));
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
}

// ─── Main generator ───────────────────────────────────────────────────────────

/**
 * Generates `count` deterministic mock users.
 *
 * @param count - Number of users to generate (default: 100)
 * @returns User[]
 *
 * @example
 * const users = generateMockUsers()        // 100 users
 * const subset = generateMockUsers(25)     // 25 users
 */
export function generateMockUsers(count = 100): User[] {
  const RANGE_START = new Date('2022-01-01');
  const NOW = new Date();

  return Array.from({ length: count }, (_, i) => {
    const seed = i * 7; // spread seeds to avoid clustering

    const firstName = pick(FIRST_NAMES, seed);
    const lastName = pick(LAST_NAMES, seed + 1);
    const name = `${firstName} ${lastName}`;
    const role = pick(ROLE_WEIGHTS, seed + 2);

    const emailSlug = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    // Ensure uniqueness when the same name appears more than once
    const emailSuffix =
      i < FIRST_NAMES.length * LAST_NAMES.length ? '' : `${i}`;
    const email = `${emailSlug}${emailSuffix}@company.com`;

    const createdAt = randomDateBetween(RANGE_START, NOW, seed + 3);
    const updatedAt = randomDateBetween(createdAt, NOW, seed + 4);

    // ~15 % of users have no avatar (nullable field)
    const hasAvatar = seededRandom(seed + 5) > 0.15;

    return {
      id: `user-${String(i + 1).padStart(3, '0')}`,
      name,
      email,
      role,
      avatar: hasAvatar ? generateAvatar(name, i) : undefined,
      createdAt: toISOString(createdAt),
      updatedAt: toISOString(updatedAt),
    } satisfies User;
  });
}

// ─── Pre-built export (convenience) ──────────────────────────────────────────

/** Ready-to-use array of 100 mock users — import directly when you don't need dynamic count. */
export const MOCK_USERS: User[] = generateMockUsers(100);
