/*
  Warnings:

  - A unique constraint covering the columns `[reference]` on the table `work_orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reference` to the `work_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "work_orders" ADD COLUMN     "reference" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "work_orders_reference_key" ON "work_orders"("reference");
