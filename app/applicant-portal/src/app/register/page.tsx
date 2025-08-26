"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const registrationSchema = z.object({
  // Eligibility
  eligibilityConfirmed: z.boolean().refine((val) => val === true, {
    message: "You must meet all eligibility requirements",
  }),
  participantType: z.enum(["hacker", "judge", "mentor", "spectator", "volunteer"]).refine((val) => val, {
    message: "Please select your participation type",
  }),
  
  // Personal Information
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.number().min(18, "Must be 18 or older").max(120, "Invalid age"),
  preferredEmail: z.string().email("Invalid email address"),
  schoolEmail: z.string().refine(
    (email) => email.endsWith(".edu") || email === "guest@sfhacks2026.edu",
    "Must end with .edu or use guest@sfhacks2026.edu"
  ),
  phoneNumber: z.string().min(10, "Phone number is required"),
  school: z.string().min(1, "School is required"),
  country: z.string().min(1, "Country is required"),
  levelOfStudy: z.string().min(1, "Level of study is required"),
  
  // Goals and Links
  goals: z.string().min(10, "Please provide at least 10 characters"),
  githubLink: z.string().optional(),
  devpostLink: z.string().optional(),
  
  // Preferences
  dietaryRestrictions: z.string().optional(),
  tshirtSize: z.enum(["XS", "S", "M", "L", "XL", "XXL"]).refine((val) => val, {
    message: "Please select a t-shirt size",
  }),
  
  // Demographics
  genderIdentity: z.string().optional(),
  pronouns: z.string().min(1, "Pronouns are required"),
  raceEthnicity: z.string().optional(),
  isVeteran: z.boolean().optional(),
  isInternationalStudent: z.boolean().optional(),
  isFirstGenStudent: z.boolean().optional(),
  isLGBTQ: z.boolean().optional(),
  major: z.string().optional(),
  
  // Team Preferences
  teamPreference: z.enum(["create", "join", "none"]).refine((val) => val, {
    message: "Please select a team preference",
  }),
  
  // MLH Requirements
  mlhCodeOfConduct: z.boolean().refine((val) => val === true, {
    message: "You must agree to the MLH Code of Conduct",
  }),
  mlhPrivacyPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the MLH Privacy Policy",
  }),
  mlhEmailConsent: z.boolean().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const steps = [
  "Eligibility",
  "Personal Information", 
  "Goals & Portfolio",
  "Preferences & Demographics",
  "Team & MLH"
];

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: RegistrationFormData) => {
    console.log("Form submitted:", data);
    console.log("Resume file:", resumeFile);
    // Handle form submission here
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-10">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-800 mb-8">Eligibility Requirements</h3>
              <div className="bg-gradient-to-r from-purple-100 to-yellow-100 border-2 border-purple-200 rounded-2xl p-8 mb-10">
                <ul className="list-disc list-inside space-y-4 text-lg text-gray-800 font-medium">
                  <li>Be above 18 years old</li>
                  <li>Have residency in the United States or U.S territory</li>
                  <li>Must be human ~ no AI teammates yet :((</li>
                </ul>
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="eligibilityConfirmed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-4 space-y-0 bg-purple-50 rounded-xl p-8 border-2 border-purple-200">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1 h-6 w-6"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-lg font-semibold text-gray-800">
                      I meet all the requirements listed above *
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="participantType"
              render={({ field }) => (
                <FormItem className="space-y-6">
                  <FormLabel className="text-2xl font-bold text-gray-800">I plan to participate as a... *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-16 text-lg border-2 border-purple-300 focus:border-yellow-500 rounded-xl bg-white">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hacker" className="text-lg py-4">🚀 Hacker</SelectItem>
                      <SelectItem value="judge" className="text-lg py-4">⚖️ Judge</SelectItem>
                      <SelectItem value="mentor" className="text-lg py-4">🧠 Mentor</SelectItem>
                      <SelectItem value="spectator" className="text-lg py-4">👀 Spectator</SelectItem>
                      <SelectItem value="volunteer" className="text-lg py-4">🙋 Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-10">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Personal Information</h3>
              <p className="text-lg text-gray-700 bg-gradient-to-r from-purple-100 to-yellow-100 border-2 border-purple-200 rounded-xl p-6">
                This section of information will be used to verify your identity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-gray-800">First Name *</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-14 text-lg border-2 border-purple-300 focus:border-yellow-500 rounded-xl bg-white text-gray-800" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-gray-800">Last Name *</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-14 text-lg border-2 border-purple-300 focus:border-yellow-500 rounded-xl bg-white text-gray-800" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold text-gray-800">Age *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      className="h-14 text-lg border-2 border-purple-300 focus:border-yellow-500 rounded-xl max-w-40 bg-white text-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="preferredEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-gray-800">Preferred Email *</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} className="h-14 text-lg border-2 border-purple-300 focus:border-yellow-500 rounded-xl bg-white text-gray-800" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-gray-800">Phone Number *</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-14 text-lg border-2 border-purple-300 focus:border-yellow-500 rounded-xl bg-white text-gray-800" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="schoolEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold text-gray-800">School Email *</FormLabel>
                  <FormDescription className="text-base text-gray-700 bg-yellow-100 border-2 border-yellow-300 rounded-xl p-4">
                    Must end with .edu or use guest@sfhacks2026.edu for industry guests
                  </FormDescription>
                  <FormControl>
                    <Input type="email" {...field} className="h-14 text-lg border-2 border-purple-300 focus:border-yellow-500 rounded-xl bg-white text-gray-800" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold text-gray-800">School *</FormLabel>
                  <FormDescription className="text-base text-gray-700 bg-purple-100 border-2 border-purple-200 rounded-xl p-4">
                    If you are a student and your educational institution is not listed, please select other. 
                    If you are a graduate and/or an industry volunteer applicant, please also select other.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} className="h-14 text-lg border-2 border-purple-300 focus:border-yellow-500 rounded-xl bg-white text-gray-800" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-gray-800">Country of Residence *</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-14 text-lg border-2 border-purple-300 focus:border-yellow-500 rounded-xl bg-white text-gray-800" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="levelOfStudy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-gray-800">Level of Study *</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-14 text-lg border-2 border-purple-300 focus:border-yellow-500 rounded-xl bg-white text-gray-800" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Goals &amp; Portfolio</h3>
            </div>
            
            <FormField
              control={form.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold text-gray-800">Why do you want to attend? What&apos;s your goal for SF Hacks? *</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={6} 
                      className="text-base border-2 border-gray-200 focus:border-blue-500 rounded-lg resize-none"
                      placeholder="Tell us about your motivation, what you hope to learn, build, or achieve at SFHacks 2026..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-base font-medium text-blue-800 text-center">
                🤝 This information will be shared with our partners
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="githubLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-gray-700">GitHub Link</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="https://github.com/yourusername"
                        className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="devpostLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-gray-700">Devpost Link</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="https://devpost.com/yourusername"
                        className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <FormLabel className="text-lg font-semibold text-gray-800 block mb-4">
                Resume Upload *
              </FormLabel>
              <p className="text-base text-gray-600 mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                📄 Please upload here as our industry partners are interested in you!
              </p>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size <= 10 * 1024 * 1024) { // 10MB limit
                      setResumeFile(file);
                    } else {
                      alert("File size must be less than 10MB");
                    }
                  }}
                  className="block w-full text-base text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-base file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg p-4 transition-colors"
                />
                {resumeFile && (
                  <p className="mt-2 text-sm text-green-600 font-medium">
                    ✅ {resumeFile.name} selected
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">Size limit: 10 MB • Supported formats: PDF, DOC, DOCX</p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Preferences & Demographics</h3>
              <p className="text-base text-gray-700 bg-blue-50 border border-blue-200 rounded-lg p-4">
                Let us know how best to provide you merchandise and food!
              </p>
            </div>

            <FormField
              control={form.control}
              name="dietaryRestrictions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-700">Do you have any dietary restrictions?</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-white text-gray-800" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tshirtSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-700">T-shirt Size *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-14 text-base border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-white">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="XS" className="text-base py-3">XS</SelectItem>
                      <SelectItem value="S" className="text-base py-3">S</SelectItem>
                      <SelectItem value="M" className="text-base py-3">M</SelectItem>
                      <SelectItem value="L" className="text-base py-3">L</SelectItem>
                      <SelectItem value="XL" className="text-base py-3">XL</SelectItem>
                      <SelectItem value="XXL" className="text-base py-3">XXL</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <p className="text-base font-semibold text-gray-800 mb-6">
                Understanding our audience demographics is crucial for achieving our diversity and inclusion goals. 
                Please fill in the demographic questions below. This information may be shared to potential sponsors 
                but will not be attached to your name.
              </p>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="genderIdentity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-gray-700">Gender Identity</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-white text-gray-800" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pronouns"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-gray-700">Preferred Pronouns *</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-white text-gray-800" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="raceEthnicity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-gray-700">Race/Ethnicity</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-white text-gray-800" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <p className="text-base font-semibold text-gray-800">I identify as...</p>
                  
                  <FormField
                    control={form.control}
                    name="isVeteran"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-4 space-y-0 bg-white rounded-lg p-4 border border-gray-200">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1 h-5 w-5"
                          />
                        </FormControl>
                        <FormLabel className="text-base text-gray-700">I am a veteran</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isInternationalStudent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-4 space-y-0 bg-white rounded-lg p-4 border border-gray-200">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1 h-5 w-5"
                          />
                        </FormControl>
                        <FormLabel className="text-base text-gray-700">International/foreign exchange student</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isFirstGenStudent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-4 space-y-0 bg-white rounded-lg p-4 border border-gray-200">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1 h-5 w-5"
                          />
                        </FormControl>
                        <FormLabel className="text-base text-gray-700">First generation student</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isLGBTQ"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-4 space-y-0 bg-white rounded-lg p-4 border border-gray-200">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1 h-5 w-5"
                          />
                        </FormControl>
                        <FormLabel className="text-base text-gray-700">A member of the LGBTQ+ community</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-gray-700">Major/Field of Study</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-white text-gray-800" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Team Preferences & MLH</h3>
            </div>
            
            <FormField
              control={form.control}
              name="teamPreference"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-xl font-semibold text-gray-800">Team Preferences *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-14 text-base border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-white">
                        <SelectValue placeholder="Select team preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="create" className="text-base py-3">I want to create a team</SelectItem>
                      <SelectItem value="join" className="text-base py-3">I want to join a team</SelectItem>
                      <SelectItem value="none" className="text-base py-3">I don&apos;t want to be in a team (right now at least)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-base text-gray-700 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    If you chose &quot;create a team&quot;, you will be emailed a Team ID Key. 
                    Make sure to include the &quot;-&quot; character at the beginning of your team code. 
                    Please ensure you check the spam folder in your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-base font-semibold text-blue-800 mb-6">
                We are currently an MLH 2026 partner event (https://mlh.io/seasons/2025/events). 
                The following 3 checkboxes are for this partnership and responses may be shared with MLH. 
                The first two are required if you wish to participate in SFHacks 2026.
              </p>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="mlhCodeOfConduct"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-4 space-y-0 bg-white rounded-lg p-6 border border-gray-200">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 h-5 w-5"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-relaxed">
                        <FormLabel className="text-base text-gray-700 font-medium">
                          I have read and agree to the MLH Code of Conduct. *
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mlhPrivacyPolicy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-4 space-y-0 bg-white rounded-lg p-6 border border-gray-200">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 h-5 w-5"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-relaxed">
                        <FormLabel className="text-base text-gray-700 font-medium">
                          I authorize you to share my application/registration information with Major League Hacking 
                          for event administration, ranking, and MLH administration in-line with the MLH Privacy Policy. 
                          I further agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy. *
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mlhEmailConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-4 space-y-0 bg-white rounded-lg p-6 border border-gray-200">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 h-5 w-5"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-relaxed">
                        <FormLabel className="text-base text-gray-700 font-medium">
                          I authorize MLH to send me occasional emails about relevant events, 
                          career opportunities, and community announcements.
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-yellow-50 py-8">
      <div className="max-w-full mx-auto px-8">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm max-w-6xl mx-auto">
          <CardHeader className="pb-8 pt-10">
            <CardTitle className="text-5xl font-bold text-center bg-gradient-to-r from-purple-600 to-yellow-600 bg-clip-text text-transparent">
              SFHacks 2026 Registration
            </CardTitle>
            <CardDescription className="text-center text-xl mt-4 text-gray-700 font-medium">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
            </CardDescription>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 mt-8 shadow-inner">
              <div 
                className="bg-gradient-to-r from-purple-500 to-yellow-500 h-4 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            
            {/* Step indicators */}
            <div className="flex justify-between mt-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 ${
                    index <= currentStep ? 'text-purple-600' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      index < currentStep
                        ? 'bg-yellow-500 text-white shadow-lg'
                        : index === currentStep
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index < currentStep ? '✓' : index + 1}
                  </div>
                  <span className="text-sm font-semibold hidden md:block max-w-24 text-center">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </CardHeader>

          <CardContent className="p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                <div className="min-h-[700px]">
                  {renderStep()}
                </div>

                <div className="flex justify-between pt-10 border-t-2 border-purple-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-10 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed border-2 border-purple-300 text-purple-700 hover:bg-purple-50 transition-colors"
                  >
                    ← Previous
                  </Button>

                  {currentStep === steps.length - 1 ? (
                    <Button 
                      type="submit"
                      className="px-10 py-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
                    >
                      Submit Registration ✨
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="px-10 py-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
                    >
                      Next →
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
