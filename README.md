# GetNow E-commerce Project

GetNow is a modern e-commerce platform designed to provide a seamless and dynamic shopping experience. This project was built to understand how Sanity CMS works and leverages a robust tech stack to deliver a feature-rich frontend with powerful backend integration.

## 🚀 Live Demo
[Live Demo](https://getnow-shopping.vercel.app/)

## 📂 Repository
[GitHub Repository] (https://github.com/Festus891/getnow.git)

## 🛠 Tech Stack
- Next.js – Frontend framework
- React.js – UI library for building dynamic interfaces
- TypeScript – Type safety and improved developer experience
- Redux Toolkit – State management
- Sanity CMS – Headless CMS for content management
- Sanity API – Rendering products on the frontend
- NextAuth – Google and LinkedIn authentication
- Stripe – Payment integration
- Tailwind CSS – Responsive styling
- Framer Motion – Dynamic animations
- React Icons – Iconography
- React Slick – Carousel component
- React Hot Toast – Toast notifications

## ✨  Key Features
- Modern, responsive UI with smooth animations
- Secure authentication using Google and LinkedIn
- Dynamic product rendering via Sanity API
- Full admin dashboard powered by Sanity CMS
- Stripe integration for seamless payments
- Real-time state management using Redux Toolkit

## ⚙️ Installation

1. Clone the Repository

```bash
git clone [Your GitHub Repo Link]
cd getnow
```
2. Install Dependencies
Ensure you have Yarn installed. Then run:
```bash
yarn install
```

3. Setup Environment Variables
Create a .env.local file at the root of the project with the following:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXTAUTH_URL=your_nextauth_url
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
```
Replace each placeholder with your actual keys and IDs.

4. Run Sanity CMS
Navigate to the sanity folder and run:
```bash
cd sanity
sanity start
```
To deploy, run:
```bash
sanity deploy
```

5. Start the Development Server
```bash
yarn dev or yarn run dev
```
Your application should now be running on http://localhost:3000.

## 🔥 Deployment
This project can be deployed on Vercel easily.
- Push your code to GitHub.
- Link the repository with Vercel.
- Add all environment variables in Vercel's dashboard.
- Deploy!

## 🤝 Contribution
Contributions, issues, and feature requests are welcome!

- Fork the project
- Create your feature branch (git checkout -b feature/AmazingFeature)
- Commit your changes (git commit -m 'Add some AmazingFeature')
- Push to the branch (git push origin feature/AmazingFeature)
- Open a pull request.

## 📧 Contact
For any questions or feedback, feel free to reach out:

- [LinkedIn: Your LinkedIn Profile](https://www.linkedin.com/in/aderibigbe-festus/)
- [Email: Your Email](festus4537@gmail.com)


## 🙏 Acknowledgements
Special thanks to the YouTube tutorial that inspired this project.

Feel free to adjust the placeholders like Your GitHub Repo Link, Your LinkedIn Profile, and other environment variables with your actual details. If you need any changes or additional sections, let me know! 🚀
