-- AlterTable
ALTER TABLE "Counter" ADD COLUMN     "lastRelpase" TIMESTAMP(3),
ADD COLUMN     "streakReduction" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "shadowLost" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shadowWon" INTEGER NOT NULL DEFAULT 0;
