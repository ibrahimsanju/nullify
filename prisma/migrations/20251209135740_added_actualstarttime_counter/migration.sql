-- AlterTable
ALTER TABLE "Counter" ADD COLUMN     "actualStartTime" TIMESTAMP(3),
ALTER COLUMN "startTime" DROP NOT NULL;
