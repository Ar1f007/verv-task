# 🚀 Live [Link](https://verv-task.vercel.app/)

## Features

- Product listing 
- Category filtering
- Client-side search with debounce
- Sorting by price and rating (low to high, high to low, default)
- Responsive pagination with item count and items per page selector
- Add to cart functionality with global state and cart items quantity increment/decrement support
- Product creation form (add product) with validation
- Accessible (A11y-friendly) UI
- Skeleton loaders for optimized UX during fetch
- Fully responsive layout for mobile and desktop
- Clean, modular, and fully type-safe component architecture

## Tech Stack
- Next js 
- Tanstack Query
- Tailwind css
- Typescript
- Zustand
- React Hook Form
- Zod

## Setup Instructions
- Clone repo
    ```bash
    git clone git@github.com:Ar1f007/verv-task.git
    cd verb-task
    ```
- Install Dependencies
    ```bash
    pnpm install
    ```
- Run dev server
    ```bash
    pnpm dev
    ```

## Design Decisions
- Modular components: Feature-specific components are organized within their respective module directories for clarity and scalability.
- Client-side filtering: Since the API lacks native search/filtering support, debounce-based client-side filtering was implemented for optimized performance.
- Global State with Zustand: A lightweight and efficient choice for managing cart state globally.
- Skeleton Loading: Used to enhance perceived performance and eliminate layout shifts during data fetch.
- Toast Notifications: Feedback is provided on cart actions for better UX.
- Adaptive Categories UI:
    - Mobile: Horizontally scrollable sticky category bar.
    - Desktop: Vertically sticky category sidebar.
- Pagination: Custom pagination with support for selecting items per page, displaying current range info (e.g., “Showing 1–8 of 20”), and page navigation.

- Form Handling:
    - Used react-hook-form for performant and scalable form handling.
    - Used zod for schema validation. 
    - Created reusable TextField and SelectField components to standardize form inputs across the app.

## What could be improved
- URL-based Filtering: Current filtering is done client-side only. Lifting search, sort, and pagination states into the URL (via query params) would improve UX and shareability.
- Testing: Add unit and integration tests using tools like Jest and React Testing Library to ensure robustness and maintainability.