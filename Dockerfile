# Vite
FROM node:20-alpine AS build-assets
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM php:8.2-apache
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Config apache pour Laravel
COPY apache.conf /etc/apache2/sites-available/000-default.conf

COPY . /var/www/html
WORKDIR /var/www/html
COPY --from=build-assets /app/public/build ./public/build
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 database storage bootstrap/cache

# Enable .htaccess
RUN a2enmod rewrite

RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install zip \
    && composer install --no-dev --optimize-autoloader \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

EXPOSE 80

ENTRYPOINT [ "./docker-setup.sh" ]