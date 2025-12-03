/*
  Warnings:

  - The values [DRIVER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `driverId` on the `availabilities` table. All the data in the column will be lost.
  - You are about to drop the column `driverId` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the `drivers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `instructorId` to the `availabilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructorId` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InstructorStatus" AS ENUM ('LEAD', 'PENDING', 'APPROVED', 'REJECTED', 'INACTIVE');

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('INSTRUCTOR', 'STUDENT', 'ADMIN');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "availabilities" DROP CONSTRAINT "availabilities_driverId_fkey";

-- DropForeignKey
ALTER TABLE "drivers" DROP CONSTRAINT "drivers_userId_fkey";

-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_driverId_fkey";

-- AlterTable
ALTER TABLE "availabilities" DROP COLUMN "driverId",
ADD COLUMN     "instructorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "driverId",
ADD COLUMN     "instructorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "drivers";

-- CreateTable
CREATE TABLE "instructors" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "instructors_userId_key" ON "instructors"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "instructors_email_key" ON "instructors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "instructors_licenseNumber_key" ON "instructors"("licenseNumber");

-- AddForeignKey
ALTER TABLE "instructors" ADD CONSTRAINT "instructors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
