-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT DEFAULT 'I like cats with hats';

-- CreateTable
CREATE TABLE "badges" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "badges" ADD CONSTRAINT "badges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
