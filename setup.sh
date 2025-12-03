#!/bin/bash

echo "🚀 Starting Locations API Setup..."

echo "📦 Installing dependencies..."
npm install

echo "📝 Creating .env file..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ .env file created"
else
  echo "⚠️  .env file already exists"
fi

echo "✅ Setup completed!"
echo ""
echo "📖 Next steps:"
echo "   1. Review your .env file"
echo "   2. Run 'npm run start:dev' to start the development server"
echo "   3. Access http://localhost:3001/api/docs for API documentation"
echo ""


