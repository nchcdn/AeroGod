/*
  Warnings:

  - You are about to drop the column `gold` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `wood` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Player" DROP COLUMN "gold",
DROP COLUMN "wood",
ADD COLUMN     "cash" INTEGER NOT NULL DEFAULT 1000000,
ADD COLUMN     "equity" INTEGER NOT NULL DEFAULT 200000000;
