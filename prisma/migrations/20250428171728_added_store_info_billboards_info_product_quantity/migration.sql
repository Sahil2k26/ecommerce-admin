/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Billboard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Billboard" DROP COLUMN "imageUrl",
ADD COLUMN     "toShowLabel" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "billboardId" TEXT,
ALTER COLUMN "productId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "address" TEXT,
ADD COLUMN     "contactNo" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "facebookUrl" TEXT,
ADD COLUMN     "instaUrl" TEXT;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_billboardId_fkey" FOREIGN KEY ("billboardId") REFERENCES "Billboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
