'use client'

import { useState } from 'react'
import { api } from '@/lib/api'

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

export function useInstructorRegistration() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const register = async (data: InstructorData) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await api.createInstructor(data)
      setSuccess(true)
      return response
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Erro ao enviar cadastro'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setLoading(false)
    setError(null)
    setSuccess(false)
  }

  return {
    register,
    loading,
    error,
    success,
    reset,
  }
}

export function useInstructors() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [instructors, setInstructors] = useState<InstructorResponse[]>([])

  const fetchInstructors = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.getInstructors()
      setInstructors(response.data?.instructors || [])
      return response
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Erro ao buscar instrutores'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    instructors,
    fetchInstructors,
    loading,
    error,
  }
}

export function useHealthCheck() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<any>(null)

  const check = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.healthCheck()
      setStatus(response)
      return response
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao verificar status da API'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    status,
    check,
    loading,
    error,
  }
}
