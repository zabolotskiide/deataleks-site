-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "vin" TEXT,
    "car" TEXT,
    "partName" TEXT,
    "category" TEXT,
    "comment" TEXT,
    "source" TEXT,
    "fileName" TEXT,
    "filePath" TEXT,
    "fileMime" TEXT,
    "fileSize" INTEGER,
    "fileData" BYTEA,
    "status" TEXT NOT NULL DEFAULT 'new',
    "managerComment" TEXT,
    "finalPrice" DOUBLE PRECISION,
    "profit" DOUBLE PRECISION,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierQuote" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supplier" TEXT NOT NULL,
    "article" TEXT,
    "brand" TEXT,
    "name" TEXT,
    "purchasePrice" DOUBLE PRECISION,
    "markup" DOUBLE PRECISION,
    "clientPrice" DOUBLE PRECISION,
    "deliveryTerm" TEXT,
    "quantity" TEXT,
    "warehouse" TEXT,
    "raw" TEXT,

    CONSTRAINT "SupplierQuote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadCalculation" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "purchasePrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deliveryCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "buyerFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "otherExpenses" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "markupPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fixedMarkup" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "taxPercent" DOUBLE PRECISION NOT NULL DEFAULT 6,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "costPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "recommended" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "finalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "profit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "marginPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "markupActual" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "LeadCalculation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadNote" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,

    CONSTRAINT "LeadNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "workTime" TEXT NOT NULL,
    "vk" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,
    "max" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "paymentMethods" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "seoTitle" TEXT NOT NULL,
    "seoDescription" TEXT NOT NULL,
    "ipName" TEXT NOT NULL,
    "inn" TEXT NOT NULL,
    "ogrnip" TEXT NOT NULL,
    "legalDetails" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_login_key" ON "AdminUser"("login");

-- AddForeignKey
ALTER TABLE "SupplierQuote" ADD CONSTRAINT "SupplierQuote_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadCalculation" ADD CONSTRAINT "LeadCalculation_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadNote" ADD CONSTRAINT "LeadNote_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
