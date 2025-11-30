-- CreateTable
CREATE TABLE "user_profile" (
    "userId" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_userId_roleId_key" ON "user_roles"("userId", "roleId");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
