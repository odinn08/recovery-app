import { defineConfig } from "prisma/config";

export default defineConfig({

  schema: "prisma/schema.prisma",

  migrations: {

    path: "prisma/migrations",

  },

  datasourcs: {

    db: {

      url: "postgresql://postgres:neqmo7-nykxys-negqyH@db.vyrwfjdmqadfrpddjslj.supabase.co:5432/postgres",

    },

  },

});
