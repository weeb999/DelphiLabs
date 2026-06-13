export type ProgramType = 'workshop' | 'training' | 'internship' | 'custom'
export type ProgramMode = 'online' | 'offline' | 'hybrid'
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded'
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
export type UserRole = 'admin' | 'institution_admin' | 'staff'
export type InstitutionPlan = 'starter' | 'growth' | 'enterprise'

export interface Institution {
  id: string
  name: string
  type: 'school' | 'college' | 'university'
  city: string
  state: string
  contact_name: string
  contact_email: string
  contact_phone: string
  logo_url?: string
  plan: InstitutionPlan
  is_verified: boolean
  created_at: string
}

export interface Program {
  id: string
  title: string
  type: ProgramType
  description: string
  duration: string
  mode: ProgramMode
  price: number
  max_seats: number
  tags: string[]
  is_active: boolean
  created_at: string
}

export interface Booking {
  id: string
  institution_id: string
  program_id: string
  status: BookingStatus
  scheduled_date: string
  seats_booked: number
  total_amount: number
  payment_id?: string
  payment_status: PaymentStatus
  notes?: string
  created_at: string
  program?: Program
  institution?: Institution
}

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  institution_name?: string
  city?: string
  message?: string
  source: string
  status: LeadStatus
  created_at: string
}

export interface Profile {
  id: string
  institution_id?: string
  full_name: string
  role: UserRole
  avatar_url?: string
  created_at: string
}
