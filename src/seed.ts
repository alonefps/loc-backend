import dataSource from './infrastructure/database/data-source';
import { LocationModel } from './infrastructure/database/models/location.model';
import { randomUUID } from 'crypto';

const locations = [
  {
    id: randomUUID(),
    name: 'Cristo Redentor',
    description: 'Monumento icônico do Rio de Janeiro, uma das Sete Maravilhas do Mundo Moderno',
    latitude: -22.9519,
    longitude: -43.2105,
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
  },
  {
    id: randomUUID(),
    name: 'Pão de Açúcar',
    description: 'Complexo de morros famoso com bondinho e vistas panorâmicas da cidade',
    latitude: -22.9489,
    longitude: -43.1566,
    imageUrl: 'https://images.unsplash.com/photo-1548963670-aaaa8f73a5e3',
  },
  {
    id: randomUUID(),
    name: 'Copacabana',
    description: 'Praia mundialmente famosa com calçadão em ondas portuguesas',
    latitude: -22.9711,
    longitude: -43.1822,
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
  },
  {
    id: randomUUID(),
    name: 'Maracanã',
    description: 'Um dos maiores estádios de futebol do mundo',
    latitude: -22.9122,
    longitude: -43.2302,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018',
  },
  {
    id: randomUUID(),
    name: 'Jardim Botânico',
    description: 'Jardim histórico com mais de 6.500 espécies de plantas',
    latitude: -22.9661,
    longitude: -43.2258,
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae',
  },
];

async function seed() {
  try {
    console.log('🌱 Starting database seed...');

    await dataSource.initialize();
    console.log('✅ Database connected');

    const locationRepository = dataSource.getRepository(LocationModel);

    const count = await locationRepository.count();
    if (count > 0) {
      console.log('⚠️  Database already has data. Skipping seed.');
      await dataSource.destroy();
      return;
    }

    for (const location of locations) {
      const newLocation = locationRepository.create({
        ...location,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await locationRepository.save(newLocation);
      console.log(`✅ Created: ${location.name}`);
    }

    console.log('🎉 Seed completed successfully!');
    await dataSource.destroy();
  } catch (error) {
    console.error('❌ Error during seed:', error);
    process.exit(1);
  }
}

seed();


