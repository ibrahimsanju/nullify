/*
  Warnings:

  - A unique constraint covering the columns `[useremail]` on the table `Counter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Counter_useremail_key" ON "Counter"("useremail");
