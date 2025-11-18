// TODO: double check interface matches schema with latest/supabase

export interface Application {
    // basic
    id: string
    applicantName: string
    email: string
    submittedDate: string
    lastUpdated: string
    status: 'pending' | 'admitted' | 'rejected' | 'waitlisted'
    // add whatever else missing here

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
}