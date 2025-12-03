import axios, { AxiosInstance } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })

    // Request interceptor to add token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  // Health Check
  async healthCheck() {
    const response = await this.client.get('/health')
    return response.data
  }

  // Instructors (Lead Capture)
  async createInstructor(data: { name: string; email: string; phone: string }) {
    const response = await this.client.post('/api/instructors', data)
    return response.data
  }

  async getInstructors() {
    const response = await this.client.get('/api/instructors')
    return response.data
  }

  async getInstructorById(id: string) {
    const response = await this.client.get(`/api/instructors/${id}`)
    return response.data
  }

  // Auth
  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password })
    return response.data
  }

  async register(data: any) {
    const response = await this.client.post('/auth/register', data)
    return response.data
  }

  async getProfile() {
    const response = await this.client.get('/auth/profile')
    return response.data
  }

  // Drivers
  async getDrivers(filters?: any) {
    const response = await this.client.get('/drivers', { params: filters })
    return response.data
  }

  async getDriver(id: string) {
    const response = await this.client.get(`/drivers/${id}`)
    return response.data
  }

  async updateDriver(id: string, data: any) {
    const response = await this.client.put(`/drivers/${id}`, data)
    return response.data
  }

  async setAvailability(id: string, availabilities: any[]) {
    const response = await this.client.post(`/drivers/${id}/availability`, { availabilities })
    return response.data
  }

  async getDriverStats(id: string) {
    const response = await this.client.get(`/drivers/${id}/stats`)
    return response.data
  }

  // Lessons
  async createLesson(data: any) {
    const response = await this.client.post('/lessons', data)
    return response.data
  }

  async getMyLessons() {
    const response = await this.client.get('/lessons/my-lessons')
    return response.data
  }

  async getLesson(id: string) {
    const response = await this.client.get(`/lessons/${id}`)
    return response.data
  }

  async updateLessonStatus(id: string, status: string) {
    const response = await this.client.patch(`/lessons/${id}/status`, { status })
    return response.data
  }

  async rateLesson(id: string, rating: number, review?: string) {
    const response = await this.client.post(`/lessons/${id}/rate`, { rating, review })
    return response.data
  }
}

export const api = new ApiClient()
