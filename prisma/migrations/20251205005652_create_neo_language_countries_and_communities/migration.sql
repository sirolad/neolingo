-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "neo_communities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "neo_communities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_neo_communities" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "neoCommunityId" INTEGER NOT NULL,

    CONSTRAINT "user_neo_communities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_neo_communities_userId_neoCommunityId_key" ON "user_neo_communities"("userId", "neoCommunityId");

-- AddForeignKey
ALTER TABLE "neo_communities" ADD CONSTRAINT "neo_communities_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_neo_communities" ADD CONSTRAINT "user_neo_communities_neoCommunityId_fkey" FOREIGN KEY ("neoCommunityId") REFERENCES "neo_communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
