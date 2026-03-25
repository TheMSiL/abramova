import { PrismaClient } from '@/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
	pool: Pool | undefined;
};

// Создаем pool глобально для повторного использования
if (!globalForPrisma.pool) {
	globalForPrisma.pool = new Pool({
		connectionString: process.env.DATABASE_URL,
		max: 1, // Ограничиваем количество соединений для serverless
	});
}

const adapter = new PrismaPg(globalForPrisma.pool);

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		adapter,
	});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
