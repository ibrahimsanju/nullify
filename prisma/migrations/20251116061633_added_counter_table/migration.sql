-- CreateTable
CREATE TABLE "Counter" (
    "id" TEXT NOT NULL,
    "useremail" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "relapseRecord" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Counter" ADD CONSTRAINT "Counter_useremail_fkey" FOREIGN KEY ("useremail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
