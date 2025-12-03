-- Script para resetar e criar schema no banco de produção
-- Execute este script manualmente no console do Neon se necessário

-- Drop todas as tabelas existentes (cuidado em produção!)
DROP TABLE IF EXISTS "lessons" CASCADE;
DROP TABLE IF EXISTS "availabilities" CASCADE;
DROP TABLE IF EXISTS "drivers" CASCADE;
DROP TABLE IF EXISTS "students" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "instructors" CASCADE;
DROP TABLE IF EXISTS "_prisma_migrations" CASCADE;

-- Drop enums antigos
DROP TYPE IF EXISTS "UserRole" CASCADE;
DROP TYPE IF EXISTS "LessonStatus" CASCADE;
DROP TYPE IF EXISTS "DayOfWeek" CASCADE;
DROP TYPE IF EXISTS "InstructorStatus" CASCADE;
DROP TYPE IF EXISTS "StudentStatus" CASCADE;

-- Criar enums
CREATE TYPE "LessonStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');
CREATE TYPE "InstructorStatus" AS ENUM ('LEAD', 'PENDING', 'APPROVED', 'REJECTED', 'INACTIVE');
CREATE TYPE "StudentStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- Criar tabela de instrutores
CREATE TABLE "instructors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT,
    "licenseNumber" TEXT,
    "licenseCategory" TEXT,
    "yearsExperience" INTEGER,
    "vehicleModel" TEXT,
    "vehiclePlate" TEXT,
    "vehicleYear" INTEGER,
    "hasOwnVehicle" BOOLEAN NOT NULL DEFAULT true,
    "bio" TEXT,
    "profileImage" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "hourlyRate" DOUBLE PRECISION,
    "status" "InstructorStatus" NOT NULL DEFAULT 'LEAD',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalLessons" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instructors_pkey" PRIMARY KEY ("id")
);

-- Criar tabela de alunos
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "hasPermit" BOOLEAN NOT NULL DEFAULT false,
    "status" "StudentStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- Criar tabela de disponibilidade
CREATE TABLE "availabilities" (
    "id" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "availabilities_pkey" PRIMARY KEY ("id")
);

-- Criar tabela de aulas
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "status" "LessonStatus" NOT NULL DEFAULT 'PENDING',
    "price" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "rating" INTEGER,
    "review" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- Criar índices únicos
CREATE UNIQUE INDEX "instructors_email_key" ON "instructors"("email");
CREATE UNIQUE INDEX "instructors_licenseNumber_key" ON "instructors"("licenseNumber");
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- Adicionar chaves estrangeiras
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
