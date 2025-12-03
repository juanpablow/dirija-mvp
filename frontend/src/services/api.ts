const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface InstructorData {
  name: string
  email: string
  phone: string
}

export interface InstructorResponse {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
}

class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_URL
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Erro na requisição')
    }

    return data
  }

  // Health Check
  async healthCheck(): Promise<{ status: string; message: string; timestamp: string }> {
    const response = await fetch(`${this.baseUrl}/health`)
    return response.json()
  }

  // Instructor Endpoints
  async createInstructor(data: InstructorData): Promise<ApiResponse<InstructorResponse>> {
    const response = await fetch(`${this.baseUrl}/api/instructors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    return this.handleResponse<InstructorResponse>(response)
  }

  async getInstructors(): Promise<ApiResponse<{ instructors: InstructorResponse[]; total: number }>> {
    const response = await fetch(`${this.baseUrl}/api/instructors`, {
      credentials: 'include',
    })

    return this.handleResponse(response)
  }

  async getInstructorById(id: string): Promise<ApiResponse<InstructorResponse>> {
    const response = await fetch(`${this.baseUrl}/api/instructors/${id}`, {
      credentials: 'include',
    })

    return this.handleResponse<InstructorResponse>(response)
  }
}

export const apiService = new ApiService()
export default apiService
