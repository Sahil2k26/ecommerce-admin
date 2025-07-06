/*
  Warnings:

  - You are about to drop the column `address` on the `Order` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('IN_STORE', 'ONLINE');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED', 'DELIVERED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "address",
ADD COLUMN     "customerName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "deliveyAddress" TEXT,
ADD COLUMN     "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "orderType" "OrderType" NOT NULL DEFAULT 'ONLINE';
