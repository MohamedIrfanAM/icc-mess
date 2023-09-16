-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "activationKey" TEXT,
ADD COLUMN     "activationSentAt" TIMESTAMP(3);
