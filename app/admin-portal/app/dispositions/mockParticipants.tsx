// this combines application + participant data

export interface Participant {
  id: string
  name: string
  email: string
  phone: string

  submittedDate: string
  lastUpdated: string
  status: 'pending' | 'admitted' | 'rejected' | 'waitlisted'
  school: string
  levelOfStudy: string
  countryOfResidence: string
  linkedinUrl: string

  // prefs
  dietaryVegetarian: boolean
  dietaryVegan: boolean
  dietaryCeliacDisease: boolean
  dietaryKosher: boolean
  dietaryHalal: boolean
  tshirtSize: string
  
  // insights
  majorFieldOfStudy?: string
  gender?: string
  pronouns?: string
  raceEthnicity?: string
  sexualOrientation?: string

  isAdmin: boolean
  joinedDate: string
  teamName: string
  checkedIn: boolean

  // application: Application
}

export const mockParticipants: Participant[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.d@example.com',
    phone: '(555) 123-4567',

    submittedDate: '2025-07-18T14:30:00',
    lastUpdated: '2025-07-20T09:15:00',
    status: 'admitted',
    school: 'College of San Mateo',
    levelOfStudy: 'Undergraduate - Junior',
    countryOfResidence: 'United States',
    linkedinUrl: 'https://linkedin.com/in/michaelchen',
    dietaryVegetarian: false,
    dietaryVegan: false,
    dietaryCeliacDisease: false,
    dietaryKosher: false,
    dietaryHalal: false,
    tshirtSize: 'M',
    majorFieldOfStudy: 'Computer Science',
    gender: 'Male',
    pronouns: 'he/him',
    raceEthnicity: 'Asian',
    sexualOrientation: 'Prefer not to say',

    // meta
    isAdmin: false,
    joinedDate: '2026-01-15',
    teamName: 'Tech Innovators',
    checkedIn: true
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '(555) 123-4567',

    submittedDate: '2025-07-15T09:15:00',
    lastUpdated: '2025-07-15T09:15:00',
    status: 'pending',
    school: 'Stanford University',
    levelOfStudy: 'Graduate - Masters',
    countryOfResidence: 'United States',
    linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
    dietaryVegetarian: true,
    dietaryVegan: false,
    dietaryCeliacDisease: false,
    dietaryKosher: false,
    dietaryHalal: false,
    tshirtSize: 'S',
    majorFieldOfStudy: 'Artificial Intelligence',
    gender: 'Female',
    pronouns: 'she/her',
    raceEthnicity: 'White',
    sexualOrientation: 'Heterosexual',

    isAdmin: false,
    joinedDate: '2026-01-15',
    teamName: '',
    checkedIn: true
  },
  {
    id: '3',
    name: 'Jone Doe',
    email: 'jone.d@example.com',
    phone: '(555) 123-4567',
    school: 'San Franscisco State University',

    submittedDate: '2025-07-28T16:45:00',
    lastUpdated: '2025-07-30T10:20:00',
    status: 'admitted',
    levelOfStudy: 'Undergraduate - Senior',
    countryOfResidence: 'United States',
    linkedinUrl: 'https://linkedin.com/in/jamalwilliams',
    dietaryVegetarian: false,
    dietaryVegan: true,
    dietaryCeliacDisease: false,
    dietaryKosher: false,
    dietaryHalal: false,
    tshirtSize: 'L',
    majorFieldOfStudy: 'Environmental Engineering',
    gender: 'Male',
    pronouns: 'he/him',
    raceEthnicity: 'Black or African American',
    sexualOrientation: 'Prefer not to say',

    isAdmin: false,
    joinedDate: '2026-01-15',
    teamName: 'Tech Innovators',
    checkedIn: false
  },
  {
    id: '4',
    name: 'June Doe',
    email: 'june.doe@example.com',
    phone: '(555) 123-4567',
    school: 'Skyline College',

    submittedDate: '2025-08-01T11:20:00',
    lastUpdated: '2025-08-01T11:20:00',
    status: 'pending',
    levelOfStudy: 'Undergraduate - Sophomore',
    countryOfResidence: 'United States',
    linkedinUrl: 'https://linkedin.com/in/priyapatel',
    dietaryVegetarian: true,
    dietaryVegan: false,
    dietaryCeliacDisease: false,
    dietaryKosher: false,
    dietaryHalal: true,
    tshirtSize: 'XS',
    majorFieldOfStudy: 'Computer Engineering',
    gender: 'Female',
    pronouns: 'she/her',
    raceEthnicity: 'Asian',
    sexualOrientation: 'Prefer not to say',

    isAdmin: true,
    joinedDate: '2026-01-15',
    teamName: 'The Wat',
    checkedIn: false
  },
  {
    id: '5',
    name: 'Ryan Thompson',
    email: 'ryan.t@example.com',
    phone: '(555) 334-9088',

    submittedDate: '2025-07-17T13:20:00',
    lastUpdated: '2025-07-18T09:40:00',
    status: 'waitlisted',
    school: 'San Jose State University',
    levelOfStudy: 'Undergraduate - Sophomore',
    countryOfResidence: 'United States',
    linkedinUrl: 'https://linkedin.com/in/ryanthompson',
    dietaryVegetarian: false,
    dietaryVegan: false,
    dietaryCeliacDisease: false,
    dietaryKosher: true,
    dietaryHalal: false,
    tshirtSize: 'XL',
    majorFieldOfStudy: 'Robotics',
    gender: 'Male',
    pronouns: 'he/him',
    raceEthnicity: 'Black',
    sexualOrientation: 'Heterosexual',

    isAdmin: false,
    joinedDate: '2026-01-16',
    teamName: 'Robo Squad',
    checkedIn: false
  },
  {
    id: '6',
    name: 'Sofia Martinez',
    email: 'sofia.m@example.com',
    phone: '(555) 442-6155',

    submittedDate: '2025-07-09T10:30:00',
    lastUpdated: '2025-07-11T09:05:00',
    status: 'pending',
    school: 'San Francisco State University',
    levelOfStudy: 'Undergraduate - Freshman',
    countryOfResidence: 'United States',
    linkedinUrl: 'https://linkedin.com/in/sofiamartinez',
    dietaryVegetarian: true,
    dietaryVegan: false,
    dietaryCeliacDisease: false,
    dietaryKosher: false,
    dietaryHalal: true,
    tshirtSize: 'S',
    majorFieldOfStudy: 'Electrical Engineering',
    gender: 'Female',
    pronouns: 'she/her',
    raceEthnicity: 'Hispanic/Latina',
    sexualOrientation: 'Bisexual',

    isAdmin: false,
    joinedDate: '2026-01-17',
    teamName: 'Circuit Breakers',
    checkedIn: true
  },
  {
    id: '7',
    name: 'David Nguyen',
    email: 'david.nguyen@example.com',
    phone: '(555) 765-4321',

    submittedDate: '2025-07-19T18:55:00',
    lastUpdated: '2025-07-20T12:00:00',
    status: 'admitted',
    school: 'Stanford University',
    levelOfStudy: 'Graduate - Masters',
    countryOfResidence: 'United States',
    linkedinUrl: 'https://linkedin.com/in/davidnguyen',
    dietaryVegetarian: false,
    dietaryVegan: false,
    dietaryCeliacDisease: false,
    dietaryKosher: false,
    dietaryHalal: false,
    tshirtSize: 'M',
    majorFieldOfStudy: 'Cybersecurity',
    gender: 'Male',
    pronouns: 'he/him',
    raceEthnicity: 'Asian',
    sexualOrientation: 'Prefer not to say',

    isAdmin: false,
    joinedDate: '2026-01-18',
    teamName: 'SecureNet',
    checkedIn: true
  },
  {
    id: '8',
    name: 'Lily Roberts',
    email: 'lily.roberts@example.com',
    phone: '(555) 611-3030',

    submittedDate: '2025-07-08T08:20:00',
    lastUpdated: '2025-07-08T08:20:00',
    status: 'pending',
    school: 'University of Washington',
    levelOfStudy: 'Undergraduate - Junior',
    countryOfResidence: 'United States',
    linkedinUrl: 'https://linkedin.com/in/lilyroberts',
    dietaryVegetarian: false,
    dietaryVegan: false,
    dietaryCeliacDisease: true,
    dietaryKosher: false,
    dietaryHalal: false,
    tshirtSize: 'L',
    majorFieldOfStudy: 'Human-Computer Interaction',
    gender: 'Female',
    pronouns: 'she/her',
    raceEthnicity: 'White',
    sexualOrientation: 'Heterosexual',

    isAdmin: false,
    joinedDate: '2026-01-19',
    teamName: '',
    checkedIn: false
  },
  {
    id: '9',
    name: 'Marcus Lee',
    email: 'marcus.lee@example.com',
    phone: '(555) 552-7782',

    submittedDate: '2025-07-11T14:55:00',
    lastUpdated: '2025-07-13T09:50:00',
    status: 'waitlisted',
    school: 'University of San Francisco',
    levelOfStudy: 'Undergraduate - Senior',
    countryOfResidence: 'United States',
    linkedinUrl: 'https://linkedin.com/in/marcuslee',
    dietaryVegetarian: false,
    dietaryVegan: false,
    dietaryCeliacDisease: false,
    dietaryKosher: false,
    dietaryHalal: true,
    tshirtSize: 'M',
    majorFieldOfStudy: 'Mechanical Engineering',
    gender: 'Male',
    pronouns: 'he/him',
    raceEthnicity: 'Asian',
    sexualOrientation: 'Heterosexual',

    isAdmin: false,
    joinedDate: '2026-01-20',
    teamName: 'Circuit Breakers',
    checkedIn: true
  },
  {
    id: '10',
    name: 'Aisha Patel',
    email: 'aisha.patel@example.com',
    phone: '(555) 903-1122',

    submittedDate: '2025-07-16T12:40:00',
    lastUpdated: '2025-07-16T12:40:00',
    status: 'admitted',
    school: 'UC Berkeley',
    levelOfStudy: 'Graduate - Masters',
    countryOfResidence: 'United States',
    linkedinUrl: 'https://linkedin.com/in/aishapatel',
    dietaryVegetarian: true,
    dietaryVegan: true,
    dietaryCeliacDisease: false,
    dietaryKosher: false,
    dietaryHalal: true,
    tshirtSize: 'S',
    majorFieldOfStudy: 'Bioinformatics',
    gender: 'Female',
    pronouns: 'she/her',
    raceEthnicity: 'Asian',
    sexualOrientation: 'Prefer not to say',

    isAdmin: false,
    joinedDate: '2026-01-21',
    teamName: 'Circuit Breakers',
    checkedIn: false
  }
]
