-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SEC', 'USER', 'COOK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Month" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "feastDate" TIMESTAMP(3),
    "messFee" DOUBLE PRECISION NOT NULL DEFAULT 3000,
    "messCutCharge" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Month_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Purpose" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "feast" BOOLEAN,
    "monthId" INTEGER NOT NULL,
    "payedById" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "monthId" INTEGER NOT NULL,
    "transactionID" INTEGER NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refunds" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "monthId" INTEGER NOT NULL,

    CONSTRAINT "Refunds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messBreak" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "monthId" INTEGER NOT NULL,

    CONSTRAINT "messBreak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_messSecretary" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_userMonth" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_messSecretary_AB_unique" ON "_messSecretary"("A", "B");

-- CreateIndex
CREATE INDEX "_messSecretary_B_index" ON "_messSecretary"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_userMonth_AB_unique" ON "_userMonth"("A", "B");

-- CreateIndex
CREATE INDEX "_userMonth_B_index" ON "_userMonth"("B");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_payedById_fkey" FOREIGN KEY ("payedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refunds" ADD CONSTRAINT "Refunds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refunds" ADD CONSTRAINT "Refunds_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messBreak" ADD CONSTRAINT "messBreak_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_messSecretary" ADD CONSTRAINT "_messSecretary_A_fkey" FOREIGN KEY ("A") REFERENCES "Month"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_messSecretary" ADD CONSTRAINT "_messSecretary_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userMonth" ADD CONSTRAINT "_userMonth_A_fkey" FOREIGN KEY ("A") REFERENCES "Month"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userMonth" ADD CONSTRAINT "_userMonth_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
