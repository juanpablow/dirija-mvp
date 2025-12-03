/*
  Warnings:

  - You are about to drop the column `userId` on the `instructors` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- DropForeignKey
ALTER TABLE "instructors" DROP CONSTRAINT "instructors_userId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_userId_fkey";

-- DropIndex
DROP INDEX "instructors_userId_key";

-- DropIndex
DROP INDEX "students_userId_key";

-- AlterTable
ALTER TABLE "instructors" DROP COLUMN "userId",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "status" "StudentStatus" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "dateOfBirth" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL;

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "UserRole";

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");
