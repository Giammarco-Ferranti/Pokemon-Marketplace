# Pokemon Marketplace

This is my project for Start2Impact full stack section. The current project is a fake pokemon card marketplace.

## The steps

The idea was to build something that I've never did and with multiple types of endpoint and pages. So a marketplace was the correct one. To use correctly the product you have to follow the next steps.

## Experience

The main problem I had with this project was how to handle images without the usage of a bucket like S3. The solution was Multer, with that you can install this product and upload and get images just with an image folder. I've implemented it as a middelware.

## Tech Stack

**Client:** React, TailwindCSS, React Query, ShadcnUi, React Router, Axios, Vite

**Server:** Node, Express, Postgres, Multer, JWT

## Features

The project has the following features:

- Login
- Signup
- Buy a product
- Review an order
- Delete an order
- Sell a product
- Review a product
- Update a product
- Delete a product
- Search a product
- Get the most selling users
- Get the most expensive products

## Run Locally

All you need to do to use this project is to install it locally with the following steps. After the installation you will just need to change the .env file in client and api folders. The project is using postgres as a db but the tables will be created automatically when you signup, upload and buy a product.

Clone the project

```bash
  git clone https://github.com/Giammarco-Ferranti/Pokemon-Marketplace.git
```

Install dependencies in root

```bash
  npm install
```

Do the same in client

```bash
  cd client
  npm install
```

And in api folder

```bash
  cd api
  npm install
```

Start your postgres db

```bash
your postgres db
```

Go back to the root

```bash
npm run dev
```

You are ready to go

## Next Steps

After you start the project signup(will create a users table), I'm usign JWT as registration ,then click on avatar in navbar > profile > listings > add a new listing(will create a products table). Add as much as you want. The last thing is to create a new user and buy a product(will create orders table). You will se that you can't buy a product that's yours. After you start buying products the best user table is gonna start populating.

The steps again:

- Signup
- Upload a product in profile > listings > plus icon
- Create anothe user
- Buy a product

For the images you will find a zip in the root folder with high quality cards images.
